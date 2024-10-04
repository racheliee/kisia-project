<template>
  <div>
    <h2>Database Overview</h2>

    <!-- 총 URL 갯수 표시 -->
    <div class="overview-container">
      <h3>Total URLs in Database: <span>{{ totalUrls }}</span></h3>
      <h3>Database Size: <span>{{ dbSize }}</span></h3>
    </div>

    <!-- DB 크기 월별 선 그래프 -->
    <h2>DB Size (Monthly)</h2>
    <canvas id="dbSizeChart"></canvas>

    <!-- URL 검사 갯수 선택 버튼 -->
    <h2>URL Verifications</h2>
    <div class="button-container">
      <button :disabled="isLoading" @click="showGraphWithLoading('day')">Daily</button>
      <button :disabled="isLoading" @click="showGraphWithLoading('week')">Weekly</button>
      <button :disabled="isLoading" @click="showGraphWithLoading('month')">Monthly</button>
    </div>

    <!-- 로딩 중이면 로딩 애니메이션 표시, 아니면 차트 표시 -->
    <div class="canvas-wrapper">
      <div v-if="isLoading" class="loader-container">
        <div class="loader"></div>
      </div>
      <canvas v-show="!isLoading" id="verificationChart"></canvas>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { nextTick } from 'vue';
import { Chart } from 'chart.js/auto';

export default {
  data() {
    return {
      totalUrls: 0, // 총 URL 갯수
      dbSize: '', // DB 크기
      isLoading: false, // 로딩 상태 관리 변수
      currentVerificationChart: null, // 현재 표시 중인 URL 검사 차트
      dbSizeChartInstance: null, // DB 크기 차트 인스턴스
    };
  },
  mounted() {
    this.fetchDbOverview();
  },
  beforeUnmount() {
    // 차트 인스턴스가 존재하면 제거
    if (this.currentVerificationChart) {
      this.currentVerificationChart.destroy();
    }
    if (this.dbSizeChartInstance) {
      this.dbSizeChartInstance.destroy();
    }
  },
  methods: {
    // DB 데이터 가져오기
    async fetchDbOverview() {
      try {
        const response = await axios.get('/admin/db-overview');
        const data = response.data;

        this.totalUrls = data.totalUrls;
        this.dbSize = data.dbSize;

        nextTick(() => {
          this.renderDbSizeChart(); // Render the DB size chart
        });

        this.showGraph('day'); // 초기 그래프를 daily로 설정
      } catch (error) {
        console.error('Error fetching data, using temporary data', error);
        this.useTemporaryData();
        nextTick(() => {
          this.renderDbSizeChart(); // Render the DB size chart
        });
        this.showGraph('day'); // 초기 그래프를 daily로 설정
      }
    },
    // 임시 데이터 사용
    useTemporaryData() {
      this.totalUrls = 1500; // 임시 총 URL 갯수
      this.dbSize = '500MB'; // 임시 DB 크기
    },
    // DB 크기 그래프 렌더링
    renderDbSizeChart() {
      const ctx = document.getElementById('dbSizeChart');

      if (!ctx) {
        console.error('Canvas element not found');
        return;
      }

      if (this.dbSizeChartInstance) {
        this.dbSizeChartInstance.destroy(); // Destroy the previous chart if it exists
      }

      // Placeholder data for DB size (you can replace this with actual API data)
      const dbSizeMonthlyData = [100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650]; // Temporary monthly data

      this.dbSizeChartInstance = new Chart(ctx.getContext('2d'), {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [
            {
              label: 'DB Size (MB)',
              data: dbSizeMonthlyData, // Replace with actual data if available
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: true,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    },
    // 로딩 상태를 추가한 URL 검사 그래프 렌더링
    showGraphWithLoading(interval) {
      this.isLoading = true; // 로딩 시작
      setTimeout(() => {
        nextTick(() => {
          this.showGraph(interval);
        });
        this.isLoading = false; // 로딩 끝
      }, 1000); // 1초 후 차트 렌더링
    },
    // 특정 날짜 범위에 대해 여러 요청을 보내는 함수
    async fetchVerificationData(interval) {
      let requests = [];

      if (interval === 'day') {
        // Assume we want to get data for the last 7 days
        const last7Days = this.getLastNDays(7);
        requests = last7Days.map((date) => axios.get(`/admin/stats/total-requests?interval=day&date=${date}`));
      } else if (interval === 'week') {
        // Assume we want to get data for the last 4 weeks
        const last4Weeks = this.getLastNWeeks(4);
        requests = last4Weeks.map((week) => axios.get(`/admin/stats/total-requests?interval=week&week=${week}`));
      } else if (interval === 'month') {
        // Assume we want to get data for the last 12 months
        const last12Months = this.getLastNMonths(12);
        requests = last12Months.map((month) => axios.get(`/admin/stats/total-requests?interval=month&month=${month}`));
      }

      try {
        // Send all requests and await their completion
        const responses = await Promise.all(requests);
        return responses.map((res) => res.data.totalRequests); // Return an array of totalRequests
      } catch (error) {
        console.error(`Error fetching ${interval} data, using temporary data`, error);
        return this.useTemporaryVerificationData(interval);
      }
    },
    // URL 검사 그래프 렌더링
    async showGraph(interval) {
      const ctx = document.getElementById('verificationChart');

      if (!ctx) {
        console.error('Canvas element not found');
        return;
      }

      if (this.currentVerificationChart) {
        this.currentVerificationChart.destroy();
      }

      let data;
      let totalRequests = await this.fetchVerificationData(interval); // Fetch actual data for each time period

      if (interval === 'day') {
        data = {
          labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          datasets: [
            {
              label: 'Daily Verifications',
              data: totalRequests, // Use actual data for each day
              backgroundColor: 'rgba(255, 99, 132, 0.6)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            },
          ],
        };
      } else if (interval === 'week') {
        data = {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          datasets: [
            {
              label: 'Weekly Verifications',
              data: totalRequests, // Use actual data for each week
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            },
          ],
        };
      } else if (interval === 'month') {
        data = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [
            {
              label: 'Monthly Verifications',
              data: totalRequests, // Use actual data for each month
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        };
      }

      this.currentVerificationChart = new Chart(ctx.getContext('2d'), {
        type: 'bar',
        data,
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    },
    // Helper function to get last N days
    getLastNDays(n) {
      const days = [];
      const today = new Date();
      for (let i = 0; i < n; i++) {
        const day = new Date(today);
        day.setDate(today.getDate() - i);
        days.push(day.toISOString().split('T')[0]); // Format as 'YYYY-MM-DD'
      }
      return days.reverse();
    },
    // Helper function to get last N weeks
    getLastNWeeks(n) {
      const weeks = [];
      const today = new Date();
      for (let i = 0; i < n; i++) {
        const week = new Date(today);
        week.setDate(today.getDate() - i * 7);
        weeks.push(`${week.getFullYear()}-W${this.getWeekNumber(week)}`); // Format as 'YYYY-WXX'
      }
      return weeks.reverse();
    },
    // Helper function to get last N months
    getLastNMonths(n) {
      const months = [];
      const today = new Date();
      for (let i = 0; i < n; i++) {
        const month = new Date(today);
        month.setMonth(today.getMonth() - i);
        months.push(month.toISOString().slice(0, 7)); // Format as 'YYYY-MM'
      }
      return months.reverse();
    },
    // Helper function to get the ISO week number
    getWeekNumber(date) {
      const tempDate = new Date(date.getTime());
      tempDate.setHours(0, 0, 0, 0);
      tempDate.setDate(tempDate.getDate() + 3 - ((tempDate.getDay() + 6) % 7));
      const week1 = new Date(tempDate.getFullYear(), 0, 4);
      return Math.ceil((((tempDate - week1) / 86400000) + 1) / 7);
    },
    // 임시 데이터 사용 (total requests 임시 데이터)
    useTemporaryVerificationData(interval) {
      if (interval === 'day') {
        return [100, 120, 90, 110, 150, 200, 130]; // 임시 일간 데이터
      } else if (interval === 'week') {
        return [500, 700, 600, 800]; // 임시 주간 데이터
      } else if (interval === 'month') {
        return [2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000, 7500]; // 임시 월간 데이터
      }
    },
  },
};
</script>

<style scoped>
canvas {
  max-width: 700px;
  margin: 40px auto;
  height: 300px;
}

.button-container {
  margin-bottom: 20px;
}

.button-container button {
  padding: 10px 15px;
  margin: 5px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.button-container button:hover {
  background-color: #0056b3;
}

/* 로딩 애니메이션 */
.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px; /* 캔버스 높이와 일치 */
}

.loader {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #007bff;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* 캔버스와 로딩 바가 같은 높이를 유지 */
.canvas-wrapper {
  position: relative;
  height: 300px;
}
</style>
