<template>
  <div class="bar-chart-container">
    <div class="chart-header">
      <h3>Confidence Score Hit Rate Histogram</h3>
      <button @click="refreshData" class="refresh-button">Refresh Data</button>
    </div>
    <div class="chart-content">
      <canvas ref="chartCanvas"></canvas>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default {
  data() {
    return {
      confidenceData: [], // API로부터 가져온 데이터를 저장할 배열
      chart: null,
    };
  },
  mounted() {
    this.fetchConfidenceData();
  },
  beforeUnmount() {
    if (this.chart) {
      this.chart.destroy();
    }
  },
  methods: {
    // API 호출하여 confidence score 구간별 hit rate 가져오기
    async fetchConfidenceData() {
      try {
        const response = await axios.get("http://43.203.239.57:8000/admin/model/confidence-hit-rate");
        this.confidenceData = response.data.data.map(item => ({
          range: item.confidenceRange,
          count: item.count,
        }));
        this.renderChart();
      } catch (error) {
        console.error("Failed to fetch confidence hit rate data:", error);
        // Fallback to sample data if API fails
        this.confidenceData = [
          { range: "0.5-0.6", count: 1000 },
          { range: "0.6-0.7", count: 2000 },
          { range: "0.7-0.8", count: 1500 },
          { range: "0.8-0.9", count: 1200 },
          { range: "0.9-1.0", count: 800 },
        ];
        this.renderChart();
      }
    },
    // Chart.js를 사용해 히스토그램 렌더링
    renderChart() {
      const ctx = this.$refs.chartCanvas.getContext("2d");

      if (this.chart) {
        this.chart.destroy();
      }

      this.chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: this.confidenceData.map(item => item.range),
          datasets: [
            {
              label: "Hit Rate",
              data: this.confidenceData.map(item => item.count),
              backgroundColor: [
                "#4BC0C0",
                "#36A2EB",
                "#FFCE56",
                "#FF6384",
                "#9B59B6"
              ],
              borderColor: "#fff",
              borderWidth: 1,
              borderRadius: 5,
              barPercentage: 0.8,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              title: {
                display: true,
                text: "Confidence Score Range",
                font: {
                  size: 16,
                  weight: 'bold',
                },
              },
              grid: {
                color: "#f0f0f0",
              },
            },
            y: {
              title: {
                display: true,
                text: "Hit Count",
                font: {
                  size: 16,
                  weight: 'bold',
                },
              },
              grid: {
                color: "#f0f0f0",
              },
              ticks: {
                stepSize: 500,
              },
            },
          },
          plugins: {
            legend: {
              display: true,
              position: "top",
              labels: {
                font: {
                  size: 14,
                },
                color: "#333",
              },
            },
            tooltip: {
              backgroundColor: "#333",
              titleFont: {
                size: 14,
                weight: 'bold',
              },
              bodyFont: {
                size: 12,
              },
              bodySpacing: 5,
              padding: 10,
            },
          },
        },
      });
    },
    // 데이터 새로 고침
    refreshData() {
      this.fetchConfidenceData();
    },
  },
};
</script>

<style scoped>
.bar-chart-container {
  height: 550px;
  width: 450px;
  padding: 80px;
  padding-top: 0;
  padding-bottom: 0;
  margin: 20px auto;
  border-radius: 15px;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px 20px;
}

.chart-content {
  height: 450px;
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
