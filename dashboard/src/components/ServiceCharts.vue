<template>
  <div class="service-charts-container">
    <h2 class="chart-title">Service Stats</h2>
    <div class="chart-wrapper">
      <canvas id="serviceChart"></canvas>
    </div>
  </div>
</template>

<script>
import { Chart } from 'chart.js/auto';
import axios from 'axios';

export default {
  data() {
    return {
      totalRequests: [],
      aiRequests: [],
      isLoading: false, // To handle loading state
      chartInstance: null, // Chart.js instance
      months: [], // Dynamically adjusted months
    };
  },
  mounted() {
    this.initializeMonths(); // Initialize months before rendering chart
    this.fetchData(); // Fetch monthly data for the current year
  },
  methods: {
    // Initialize months array based on the current month
    initializeMonths() {
      const currentMonth = new Date().getMonth(); // 0 = January, 11 = December
      const monthLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      
      // Rearrange the months so the current month is at the end
      this.months = [...monthLabels.slice(currentMonth + 1), ...monthLabels.slice(0, currentMonth + 1)];
    },
    async fetchData() {
      this.isLoading = true;

      try {
        // Fetch total requests for the year (monthly data)
        const totalRequestsResponse = await axios.get('/admin/stats/total-requests?interval=month');
        this.totalRequests = totalRequestsResponse.data.totalRequests;

        // Fetch AI requests for the year (monthly data)
        const aiRequestsResponse = await axios.get('/admin/stats/ai-requests?interval=month');
        this.aiRequests = aiRequestsResponse.data.aiRequests;

        // Render the chart with the new data
        this.renderChart();
      } catch (error) {
        console.error('Error fetching data, using sample data', error);
        this.useSampleData();
        this.renderChart();
      }

      this.isLoading = false;
    },
    useSampleData() {
      // Sample data when API calls fail
      this.totalRequests = [50, 80, 60, 100, 90, 120, 50, 80, 60, 100, 90, 120];
      this.aiRequests = [30, 40, 35, 60, 70, 80, 30, 40, 35, 60, 70, 80];
    },
    renderChart() {
      const ctx = document.getElementById('serviceChart').getContext('2d');

      // Destroy the previous chart instance if it exists
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      this.chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.months, // Dynamically adjusted months
          datasets: [
            {
              label: 'Total Requests',
              data: this.totalRequests,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              hoverBackgroundColor: 'rgba(75, 192, 192, 0.8)',
              borderRadius: 5,
            },
            {
              label: 'AI Requests',
              data: this.aiRequests,
              backgroundColor: 'rgba(255, 159, 64, 0.6)',
              borderColor: 'rgba(255, 159, 64, 1)',
              hoverBackgroundColor: 'rgba(255, 159, 64, 0.8)',
              borderRadius: 5,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                color: '#333',
              },
            },
            x: {
              ticks: {
                color: '#333',
              },
            },
          },
          plugins: {
            legend: {
              display: true,
              labels: {
                color: '#333',
                font: {
                  size: 14,
                  family: 'Arial',
                },
              },
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              titleColor: '#fff',
              bodyColor: '#fff',
              bodyFont: {
                size: 14,
              },
              padding: 10,
              displayColors: false,
              borderWidth: 1,
              borderColor: '#333',
            },
          },
        },
      });
    },
  },
};
</script>

<style scoped>
.service-charts-container {
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 1000px;
}

.chart-title {
  font-size: 1.8em;
  font-weight: bold;
  color: #003366;
  margin-bottom: 15px;
}

.chart-wrapper {
  position: relative;
  height: 400px;
}

canvas {
  max-width: 100%;
  height: auto;
}
</style>
