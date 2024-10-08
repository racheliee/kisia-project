<template>
  <div>
    <h3>{{ title }}</h3>
    <Bar v-if="chartData" :data="chartData" :options="chartOptions" />
    <p v-else>Loading data...</p>
  </div>
</template>

<script>
import { Bar } from "vue-chartjs";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title } from "chart.js";
import axios from "axios";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title);

export default {
  name: "BarChart",
  components: {
    Bar,
  },
  props: {
    title: {
      type: String,
      default: "Bar Chart",
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
        const response = await axios.get("/api/monthly-requests");
        const data = response.data;

        // 데이터가 있을 경우 API 데이터를 chartData에 반영
        this.chartData = {
          labels: data.labels,
          datasets: [
            {
              label: this.title,
              data: data.values,
              backgroundColor: "#42A5F5",
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
              data: [12, 19, 3, 5, 2, 3, 7, 8, 12, 6, 10, 15],
              backgroundColor: "#42A5F5",
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
