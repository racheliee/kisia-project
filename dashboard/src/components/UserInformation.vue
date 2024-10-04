<template>
  <div>
    <h2>User Information</h2>

    <!-- 총 사용자 수를 문자열로 출력 -->
    <div class="total-users">
      <strong>Total Users:</strong> <span>{{ totalUsers }}</span>
    </div>

    <!-- 활성 사용자 및 신규 사용자 바 그래프 -->
    <canvas id="userStatsChart"></canvas>
  </div>
</template>

<script>
import axios from "axios";
import { Chart } from "chart.js/auto";

export default {
  data() {
    return {
      totalUsers: 0, // 총 사용자 수
      activeUsers: 0, // 활성 사용자 수
      newUsersThisMonth: 0, // 이번 달 신규 사용자 수
    };
  },
  mounted() {
    this.fetchUserData();
  },
  methods: {
    async fetchUserData() {
      try {
        // Fetch total users
        const totalUsersResponse = await axios.get("/admin/users/total-users");
        this.totalUsers = totalUsersResponse.data.totalUsers;

        // Fetch active users
        const activeUsersResponse = await axios.get("/admin/users/active-users");
        this.activeUsers = activeUsersResponse.data.activeUsers;

        // Fetch new users this month
        const newUsersResponse = await axios.get("/admin/users/new-users");
        this.newUsersThisMonth = newUsersResponse.data.newUsers;

        // Render the chart after fetching data
        this.renderChart();
      } catch (error) {
        console.error("Error fetching user data, using temporary data", error);
        this.useTemporaryData();
        this.renderChart();
      }
    },
    // 임시 데이터 사용
    useTemporaryData() {
      this.totalUsers = 3500;
      this.activeUsers = 1500;
      this.newUsersThisMonth = 500;
    },
    // 차트 렌더링
    renderChart() {
      const ctx = document.getElementById("userStatsChart").getContext("2d");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Active Users (Last 30 Days)", "New Users (This Month)"],
          datasets: [
            {
              label: "User Count",
              data: [this.activeUsers, this.newUsersThisMonth],
              backgroundColor: [
                "rgba(255, 159, 64, 0.6)",
                "rgba(153, 102, 255, 0.6)",
              ],
              borderColor: ["rgba(255, 159, 64, 1)", "rgba(153, 102, 255, 1)"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Number of Users",
              },
            },
          },
        },
      });
    },
  },
};
</script>

<style scoped>
.total-users {
  font-size: 20px;
  margin-bottom: 20px;
}

canvas {
  max-width: 900px;
  margin: 40px auto;
  height: 500px;
}
</style>
