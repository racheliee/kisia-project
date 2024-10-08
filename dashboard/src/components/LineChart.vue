<template>
  <div>
    <h3>{{ title }}</h3>
    <Line v-if="chartData" :data="chartData" :options="chartOptions" />
    <p v-else>Loading data...</p>
  </div>
</template>

<script>
import { Line } from "vue-chartjs";
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title } from "chart.js";
import axios from "axios";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title);

export default {
  name: "LineChart",
  components: {
    Line,
  },
  props: {
    title: {
      type: String,
      default: "Line Chart",
    },
  },
  data() {
    return {
      chartData: null,
      chartOptions: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };
  },
  mounted() {
    this.fetchChartData();
  },
  methods: {
    async fetchChartData() {
      try {
        const response = await axios.get("/api/db-size");
        const data = response.data;

        this.chartData = {
          labels: data.labels,
          datasets: [
            {
              label: this.title,
              data: data.values,
              borderColor: "#42A5F5",
              backgroundColor: "rgba(66, 165, 245, 0.2)",
              fill: true,
            },
          ],
        };
      } catch (error) {
        console.error("Failed to fetch data:", error);

        // 데이터를 가져오지 못한 경우 temp data 사용
        this.chartData = {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [
            {
              label: this.title,
              data: [300, 400, 500, 600, 750, 800, 900, 1000, 1100, 1200, 1300, 1400],
              borderColor: "#42A5F5",
              backgroundColor: "rgba(66, 165, 245, 0.2)",
              fill: true,
            },
          ],
        };
      }
    },
  },
};
</script>

<style scoped>
h3 {
  text-align: center;
  margin-bottom: 10px;
}
</style>
