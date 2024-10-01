<template>
  <div>
    <h2>{{ currentChartTitle }}</h2>

    <div class="button-container">
      <button @click="showChart('accessCount')">Access Count TOP 5</button>
      <button @click="showChart('falseNegative')">False Negative Report TOP 5</button>
      <button @click="showChart('falsePositive')">False Positive Report TOP 5</button>
    </div>

    <canvas v-show="currentChart === 'accessCount'" id="accessCountTop5"></canvas>
    <canvas v-show="currentChart === 'falseNegative'" id="falseNegativeTop5"></canvas>
    <canvas v-show="currentChart === 'falsePositive'" id="falsePositiveTop5"></canvas>
  </div>
</template>

<script>
import axios from 'axios';
import { Chart } from 'chart.js/auto';

export default {
  data() {
    return {
      accessCountData: [],
      falseNegativeData: [],
      falsePositiveData: [],
      currentChart: 'accessCount',
      currentChartTitle: 'Access Count TOP 5',
      interval: null,
    };
  },
  mounted() {
    this.fetchData();
    this.startAutoSwitch();
  },
  beforeUnmount() { // 변경된 부분
    clearInterval(this.interval);
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get('/api/top5-reports');
        const data = response.data;
        this.accessCountData = data.accessCountTop5;
        this.falseNegativeData = data.falseNegativeTop5;
        this.falsePositiveData = data.falsePositiveTop5;

        this.renderCharts();
      } catch (error) {
        console.error('Error fetching data, using temporary data', error);
        this.useTemporaryData();
        this.renderCharts();
      }
    },
    useTemporaryData() {
      this.accessCountData = [
        { url: 'https://example1.com', count: 150 },
        { url: 'https://example2.com', count: 120 },
        { url: 'https://example3.com', count: 110 },
        { url: 'https://example4.com', count: 100 },
        { url: 'https://example5.com', count: 90 },
      ];

      this.falseNegativeData = [
        { url: 'https://malicious1.com', count: 5 },
        { url: 'https://malicious2.com', count: 4 },
        { url: 'https://malicious3.com', count: 3 },
        { url: 'https://malicious4.com', count: 2 },
        { url: 'https://malicious5.com', count: 1 },
      ];

      this.falsePositiveData = [
        { url: 'https://benign1.com', count: 5 },
        { url: 'https://benign2.com', count: 4 },
        { url: 'https://benign3.com', count: 3 },
        { url: 'https://benign4.com', count: 2 },
        { url: 'https://benign5.com', count: 1 },
      ];
    },
    renderCharts() {
      new Chart(document.getElementById('accessCountTop5'), {
        type: 'bar',
        data: {
          labels: this.accessCountData.map((item) => item.url),
          datasets: [
            {
              label: 'Access Count',
              data: this.accessCountData.map((item) => item.count),
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          indexAxis: 'y',
          scales: { x: { beginAtZero: true } },
        },
      });

      new Chart(document.getElementById('falseNegativeTop5'), {
        type: 'bar',
        data: {
          labels: this.falseNegativeData.map((item) => item.url),
          datasets: [
            {
              label: 'False Negative Count',
              data: this.falseNegativeData.map((item) => item.count),
              backgroundColor: 'rgba(255, 159, 64, 0.6)',
              borderColor: 'rgba(255, 159, 64, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          indexAxis: 'y',
          scales: { x: { beginAtZero: true } },
        },
      });

      new Chart(document.getElementById('falsePositiveTop5'), {
        type: 'bar',
        data: {
          labels: this.falsePositiveData.map((item) => item.url),
          datasets: [
            {
              label: 'False Positive Count',
              data: this.falsePositiveData.map((item) => item.count),
              backgroundColor: 'rgba(153, 102, 255, 0.6)',
              borderColor: 'rgba(153, 102, 255, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          indexAxis: 'y',
          scales: { x: { beginAtZero: true } },
        },
      });
    },
    showChart(chart) {
      this.currentChart = chart;
      if (chart === 'accessCount') {
        this.currentChartTitle = 'Access Count TOP 5';
      } else if (chart === 'falseNegative') {
        this.currentChartTitle = 'False Negative Report TOP 5 (Last 30 Days)';
      } else if (chart === 'falsePositive') {
        this.currentChartTitle = 'False Positive Report TOP 5 (Last 30 Days)';
      }
    },
    startAutoSwitch() {
      const charts = ['accessCount', 'falseNegative', 'falsePositive'];
      let currentIndex = 0;

      this.interval = setInterval(() => {
        currentIndex = (currentIndex + 1) % charts.length;
        this.showChart(charts[currentIndex]);
      }, 5000); // 5초마다 차트 전환
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
</style>
