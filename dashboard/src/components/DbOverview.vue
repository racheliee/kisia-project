<template>
  <div>
    <h2>Database Overview</h2>

    <!-- 총 URL 갯수 표시 -->
    <div class="overview-container">
      <h3>Total URLs in Database: <span>{{ totalUrls }}</span></h3>
    </div>

    <!-- DB 크기 월별 선 그래프 -->
    <h2>DB Size (Monthly)</h2>
    <canvas id="dbSizeChart"></canvas>

    <!-- URL 검사 갯수 선택 버튼 -->
    <h2>URL Verifications</h2>
    <div class="button-container">
      <button :disabled="isLoading" @click="showGraphWithLoading('daily')">Daily</button>
      <button :disabled="isLoading" @click="showGraphWithLoading('weekly')">Weekly</button>
      <button :disabled="isLoading" @click="showGraphWithLoading('monthly')">Monthly</button>
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
import { Chart } from 'chart.js/auto';

export default {
  data() {
    return {
      totalUrls: 0, // 총 URL 갯수
      dbSizeData: [], // DB 크기 데이터
      dailyVerificationData: [], // 일간 검사 데이터
      weeklyVerificationData: [], // 주간 검사 데이터
      monthlyVerificationData: [], // 월간 검사 데이터
      currentVerificationChart: null, // 현재 표시 중인 URL 검사 차트
      dbSizeChartInstance: null, // DB 크기 차트 인스턴스
      isLoading: false, // 로딩 상태 관리 변수
      currentGraph: 'daily', // 현재 보여지는 그래프 타입
    };
  },
  mounted() {
    this.fetchDbData();
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
    async fetchDbData() {
      try {
        const response = await axios.get('/api/db-overview');
        const data = response.data;

        this.totalUrls = data.totalUrls;
        this.dbSizeData = data.dbSizeMonthly;
        this.dailyVerificationData = data.dailyVerifications;
        this.weeklyVerificationData = data.weeklyVerifications;
        this.monthlyVerificationData = data.monthlyVerifications;

        this.renderDbSizeChart();
        this.showGraph('daily'); // 초기 그래프를 daily로 설정
      } catch (error) {
        console.error('Error fetching data, using temporary data', error);
        this.useTemporaryData();
        this.renderDbSizeChart();
        this.showGraph('daily'); // 초기 그래프를 daily로 설정
      }
    },
    // 임시 데이터 사용
    useTemporaryData() {
      this.totalUrls = 1500; // 임시 총 URL 갯수

      this.dbSizeData = [100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650]; // 임시 DB 크기 데이터

      this.dailyVerificationData = [15, 30, 25, 40, 35, 20, 45]; // 임시 일간 검사 데이터
      this.weeklyVerificationData = [120, 200, 150, 300]; // 임시 주간 검사 데이터
      this.monthlyVerificationData = [400, 600, 550, 700, 800, 750, 900, 850, 1000, 950, 1100, 1200]; // 임시 월간 검사 데이터
    },
    // DB 크기 그래프 렌더링
    renderDbSizeChart() {
      const ctx = document.getElementById('dbSizeChart');

      if (!ctx) {
        console.error('Canvas element not found');
        return;
      }

      if (this.dbSizeChartInstance) {
        this.dbSizeChartInstance.destroy();
      }

      this.dbSizeChartInstance = new Chart(ctx.getContext('2d'), {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [
            {
              label: 'DB Size (MB)',
              data: this.dbSizeData,
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
    showGraphWithLoading(type) {
      this.isLoading = true; // 로딩 시작
      setTimeout(() => {
        this.showGraph(type);
        this.isLoading = false; // 로딩 끝
      }, 2000); // 2초 후 차트 렌더링
    },
    showGraph(type) {
      const ctx = document.getElementById('verificationChart');

      if (!ctx) {
        console.error('Canvas element not found');
        return;
      }

      if (this.currentVerificationChart) {
        this.currentVerificationChart.destroy();
      }

      let data;
      if (type === 'daily') {
        data = {
          labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          datasets: [
            {
              label: 'Daily Verifications',
              data: this.dailyVerificationData,
              backgroundColor: 'rgba(255, 99, 132, 0.6)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            },
          ],
        };
      } else if (type === 'weekly') {
        data = {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          datasets: [
            {
              label: 'Weekly Verifications',
              data: this.weeklyVerificationData,
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            },
          ],
        };
      } else if (type === 'monthly') {
        data = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [
            {
              label: 'Monthly Verifications',
              data: this.monthlyVerificationData,
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
