<template>
  <div class="user-stats">
    <h2>사용자 통계</h2>
    <div class="stats">

      <div class="stat-item group reft-view">
        <div class="sub-item">
          <h3>총 사용자 수</h3>
          <p>{{ totalUsers }}</p>
        </div>
        <div class="sub-item">
          <h3>이번 달 신규 가입자</h3>
          <p>{{ newUsers }}</p>
        </div>
        <div class="sub-item">
          <h3>활동 유저</h3>
          <p>{{ activeUsers }}</p>
        </div>
      </div>

      <div class="stat-item large light-view">
        <h3>지난 30일 이내 활성 사용자</h3>
        <div class="chart-container">
          <canvas ref="activeUsersChart"></canvas>
        </div>
      </div>

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
      totalUsers: 2,
      newUsers: 2,
      activeUsers: 2,
      activeUsersData: this.generateActiveUsersData(),
      chart: null,
    };
  },
  mounted() {
    this.fetchUserStats();
    this.renderChart();
  },
  beforeUnmount() {
    if (this.chart) {
      this.chart.destroy();
    }
  },
  methods: {
    async fetchUserStats() {
      try {
        const [totalUsersResponse, newUsersResponse, activeUsersResponse] = await Promise.all([
          axios.get("http://43.203.239.57:8000/admin/users/total-users"),
          axios.get("http://43.203.239.57:8000/admin/users/new-users"),
          axios.get("http://43.203.239.57:8000/admin/users/active-users"),
        ]);

        this.totalUsers = totalUsersResponse.data.totalUsers || 1000;
        this.newUsers = newUsersResponse.data.newUsers || 50;
        this.activeUsers = activeUsersResponse.data.activeUsers || 3500;
      } catch (error) {
        console.error("Failed to fetch user stats:", error);
      }
    },
    generateActiveUsersData() {
      const data = [];
      for (let i = 0; i < 30; i++) {
        // data.push(Math.floor(Math.random() * 2) + 1);
        if (i == 28 || i == 29) {
          data.push(1);
        } else {
          data.push(0);
        }
      }
      return data;
    },
    generateDateLabels() {
      const labels = [];
      const today = new Date();
      for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        labels.push(`${date.getMonth() + 1}/${date.getDate()}`);
      }
      return labels;
    },
    renderChart() {
      const ctx = this.$refs.activeUsersChart.getContext("2d");

      this.chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: this.generateDateLabels(),
          datasets: [
            {
              label: "활성 사용자",
              data: this.activeUsersData,
              backgroundColor: "rgba(75, 192, 192, 0.7)",
              borderColor: "#4BC0C0",
              borderWidth: 2,
              borderRadius: 10,
              hoverBackgroundColor: "rgba(54, 162, 235, 0.8)",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: true, labels: { color: "#374151" } },
            tooltip: {
              backgroundColor: "#374151",
              titleFont: { size: 16, weight: 'bold', family: 'Arial' },
              bodyFont: { size: 14, family: 'Arial' },
              bodySpacing: 8,
              padding: 16,
              boxPadding: 8,
            },
          },
          scales: {
            x: {
              ticks: {
                maxRotation: 45,
                minRotation: 0,
                autoSkip: true,
                maxTicksLimit: 10,
                font: { size: 14 },
                color: "#374151",
              },
              grid: { color: "#e0e0e0" },
            },
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 10,
                font: { size: 14 },
                color: "#374151",
              },
              grid: { color: "#e0e0e0" },
            },
          },
        },
      });
    },
  },
};
</script>

<style scoped>
.user-stats {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  border-radius: 20px;
  max-width: 900px;
  margin: 0 auto;
}

.stats {
  display: grid;
  grid-template-columns: 3fr 7fr;
  gap: 30px;
  width: 100%;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  text-align: center;
}

.stat-item.large {
  height: 400px;
}

.chart-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.sub-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;
}

.stat-item:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.2);
}

h2 {
  font-size: 28px;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 25px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

h3 {
  font-size: 20px;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 15px;
}

p {
  font-size: 24px;
  font-weight: bold;
  color: #0d9488;
  margin: 0;
}

canvas {
  width: 100% !important;
  height: 100% !important;
}
</style>
