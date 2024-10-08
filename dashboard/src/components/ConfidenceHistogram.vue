<!-- ConfidenceHistogram.vue -->
<template>
  <div>
    <h2>Confidence Score Hit Rate Histogram</h2>
    <BarChart :chartData="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { Bar } from "vue-chartjs";
import { Chart, BarElement, CategoryScale, LinearScale } from "chart.js";

Chart.register(BarElement, CategoryScale, LinearScale);

export default {
  components: {
    BarChart: Bar,
  },
  data() {
    return {
      confidenceData: [
        { confidence: 0.5, hits: 150 },
        { confidence: 0.6, hits: 200 },
        { confidence: 0.7, hits: 300 },
        { confidence: 0.8, hits: 450 },
        { confidence: 0.9, hits: 600 },
      ],
    };
  },
  computed: {
    chartData() {
      return {
        labels: this.confidenceData.map((data) => data.confidence.toFixed(2)),
        datasets: [
          {
            label: "Hit Rate",
            data: this.confidenceData.map((data) => data.hits),
            backgroundColor: "rgba(75, 192, 192, 0.5)",
          },
        ],
      };
    },
    chartOptions() {
      return {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: "Confidence Score",
            },
          },
          y: {
            title: {
              display: true,
              text: "Hit Count",
            },
          },
        },
      };
    },
  },
};
</script>

<style scoped>
h2 {
  text-align: center;
}
</style>
