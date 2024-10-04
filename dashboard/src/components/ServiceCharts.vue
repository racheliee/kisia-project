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
      months: ["April", "May", "June", "July", "August", "September"], // 최근 6개월의 월
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
        // 첫 번째 API 호출: 총 요청 수 가져오기
        const totalResponse = await axios.get("/admin/stats/total-requests?interval=month");
        this.totalRequests = this.extractLastSixMonthsData(totalResponse.data.totalRequests);

        // 두 번째 API 호출: AI 요청 수 가져오기
        const aiResponse = await axios.get("/admin/stats/ai-requests?interval=month");
        this.aiRequests = this.extractLastSixMonthsData(aiResponse.data.aiRequests);

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
    extractLastSixMonthsData(data) {
      // API에서 받은 데이터는 총 합계일 수 있으므로, 최근 6개월 데이터를 추출
      return data.slice(Math.max(data.length - 6, 0)); 
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
