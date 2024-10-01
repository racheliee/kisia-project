<template>
  <div>
    <!-- <h2>Total and AI Request Counts (Last 6 Months)</h2> -->
    <canvas id="requestChart"></canvas>
  </div>
</template>

<script>
import axios from "axios";
import Chart from "chart.js/auto";

export default {
  data() {
    return {
      totalRequests: [], // 총 검사 요청 데이터
      aiRequests: [], // AI 검사 요청 데이터
      months: [], // 최근 6개월의 월
      error: false, // 오류 발생 여부
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    // 데이터를 받아오는 함수
    async fetchData() {
      try {
        const response = await axios.get("/api/requests"); // 실제 API URL
        const data = response.data;

        this.totalRequests = data.totalRequests;
        this.aiRequests = data.aiRequests;

        // 최근 6개월 데이터를 추출
        const lastSixMonthsData = this.getLastSixMonths(data.months);
        this.months = lastSixMonthsData.months;
        this.totalRequests = lastSixMonthsData.totalRequests;
        this.aiRequests = lastSixMonthsData.aiRequests;

        // 차트를 렌더링
        this.renderChart();
      } catch (error) {
        console.error("Error fetching data, using temporary data", error);
        this.error = true;

        // 오류 시 임시 데이터를 사용
        const tempData = this.getTemporaryData();
        this.months = tempData.months;
        this.totalRequests = tempData.totalRequests;
        this.aiRequests = tempData.aiRequests;

        // 차트를 렌더링
        this.renderChart();
      }
    },
    // 최근 6개월 데이터를 추출하는 함수
    getLastSixMonths(allMonths) {
      const today = new Date();
      const currentMonth = today.getMonth(); // 현재 월 (0이 1월, 11이 12월)
      const lastSixMonths = [];
      const lastSixTotalRequests = [];
      const lastSixAIRequests = [];

      for (let i = 1; i <= 6; i++) {
        const monthIndex = (currentMonth - i + 12) % 12;
        lastSixMonths.unshift(allMonths[monthIndex]);
        lastSixTotalRequests.unshift(this.totalRequests[monthIndex]);
        lastSixAIRequests.unshift(this.aiRequests[monthIndex]);
      }

      return {
        months: lastSixMonths,
        totalRequests: lastSixTotalRequests,
        aiRequests: lastSixAIRequests,
      };
    },
    // 임시 데이터를 제공하는 함수 (DB 연결 실패 시 사용)
    getTemporaryData() {
      return {
        months: ["April", "May", "June", "July", "August", "September"],
        totalRequests: [50, 80, 60, 90, 100, 120],
        aiRequests: [30, 40, 35, 50, 70, 80],
      };
    },
    // 차트를 렌더링하는 함수
    renderChart() {
      const ctx = document.getElementById("requestChart").getContext("2d");

      new Chart(ctx, {
        type: "bar",
        data: {
          labels: this.months, // X축에 표시될 월
          datasets: [
            {
              label: "Total Requests",
              data: this.totalRequests,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
            {
              label: "AI Requests",
              data: this.aiRequests,
              backgroundColor: "rgba(255, 159, 64, 0.2)",
              borderColor: "rgba(255, 159, 64, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
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
  max-width: 900px;
  margin: 40px auto;
  height: 500px;
}
</style>
