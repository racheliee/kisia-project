<template>
  <div class="bar-chart-container">
    <div class="chart-header">
      <h3>{{ title }}</h3>
      <button @click="refreshData" class="refresh-button">Refresh</button>
    </div>
    <div class="chart-content">
      <Bar v-if="chartData" :data="chartData" :options="chartOptions" />
      <p v-else>Loading data...</p>
    </div>
  </div>
</template>

<script>
import { Bar } from "vue-chartjs";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip } from "chart.js";
import axios from "axios";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip);

export default {
  name: "BarChart",
  components: {
    Bar,
  },
  props: {
    title: {
      type: String,
      default: "검사 요청 통계",
    },
  },
  data() {
    return {
      chartData: null,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "top",
            labels: {
              font: {
                size: 14,
                weight: "bold",
              },
              color: "#4A4A4A",
            },
          },
          tooltip: {
            backgroundColor: "#ffffff",
            borderColor: "#4A4A4A",
            borderWidth: 1,
            titleColor: "#333",
            bodyColor: "#333",
            callbacks: {
              label: function (tooltipItem) {
                return `${tooltipItem.dataset.label}: ${tooltipItem.raw}건`;
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              color: "rgba(200, 200, 200, 0.2)",
            },
            title: {
              display: true,
              text: "월",
              font: {
                size: 16,
                weight: "bold",
              },
              color: "#4A4A4A",
            },
            ticks: {
              color: "#4A4A4A",
              font: {
                size: 14,
              },
              maxRotation: 0,
              minRotation: 0,
              autoSkip: true,
              maxTicksLimit: 6,
            },
          },
          y: {
            grid: {
              color: "rgba(200, 200, 200, 0.2)",
            },
            beginAtZero: true,
            title: {
              display: true,
              text: "요청 수",
              font: {
                size: 16,
                weight: "bold",
              },
              color: "#4A4A4A",
            },
            ticks: {
              color: "#4A4A4A",
              font: {
                size: 14,
              },
            },
          },
        },
      },
    };
  },
  mounted() {
    this.fetchChartData();
  },
  methods: {
    // 현재 달 기준으로 12개월 월 레이블을 생성하는 함수
    generateMonthLabels() {
      const labels = [];
      const date = new Date();
      for (let i = 2; i >= 0; i--) { // i 범위 수정 받아 올 값들
        const monthDate = new Date(date.getFullYear(), date.getMonth() - i, 1);
        labels.push(`${monthDate.getFullYear()}-${String(monthDate.getMonth() + 1).padStart(2, "0")}`);
      }
      return labels;
    },

    async fetchChartData() {
      try {
        const response = await axios.get("http://43.203.239.57:8000/api/monthly-requests");
        const data = response.data;

        // API 데이터로 chartData 설정
        this.chartData = {
          labels: this.generateMonthLabels(),
          datasets: [
            {
              label: "총 검사 요청",
              data: data.totalRequests,
              backgroundColor: "#42a5f5",
              borderRadius: 12,
              borderWidth: 2,
              hoverBackgroundColor: "#1e88e5",
            },
            {
              label: "AI 검사 요청",
              data: data.aiRequests,
              backgroundColor: "#ff6384",
              borderRadius: 12,
              borderWidth: 2,
              hoverBackgroundColor: "#d32f2f",
            },
          ],
        };
      } catch (error) {
        console.error("Failed to fetch data:", error);

        // 샘플 데이터를 사용하여 chartData 설정
        this.chartData = {
          labels: this.generateMonthLabels(),
          datasets: [
            {
              label: "총 검사 요청",
              data: [5, 16, 11, 70, 85, 90, 95, 100, 110, 105, 120, 130], // 받아올 만큼 배열 만들기
              backgroundColor: "#42a5f5",
              borderRadius: 12,
              borderWidth: 2,
              hoverBackgroundColor: "#1e88e5",
            },
            {
              label: "AI 검사 요청",
              data: [3, 14, 10, 40, 45, 50, 55, 60, 65, 70, 75, 80],
              backgroundColor: "#ff6384",
              borderRadius: 12,
              borderWidth: 2,
              hoverBackgroundColor: "#d32f2f",
            },
          ],
        };
      }
    },
    refreshData() {
      this.chartData = null;
      this.fetchChartData();
    },
  },
};
</script>

<style scoped>
.bar-chart-container {
  height: 100%;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}

.chart-content {
  flex-grow: 1;
  width: 100%;
  position: relative;
}

.chart-content .chartjs-render-monitor {
  height: 100% !important;
  width: 100% !important;
}

h3 {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

.refresh-button {
  background-color: #42a5f5;
  color: #ffffff;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.refresh-button:hover {
  background-color: #1e88e5;
}
</style>
