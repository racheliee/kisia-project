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
        const response = await axios.get("/api/users/stats");
        const data = response.data;

        this.totalUsers = data.totalUsers;
        this.activeUsers = data.activeUsers;
        this.newUsersThisMonth = data.newUsersThisMonth;

        this.renderChart();
      } catch (error) {
        console.error("Error fetching user data, using temporary data", error);
        this.useTemporaryData();
        this.renderChart();
      }
    },
    // 임시 데이터 사용
    useTemporaryData() {
      const today = new Date();
      const last30DaysDate = new Date();
      last30DaysDate.setDate(today.getDate() - 30);
      const currentMonth = today.getMonth();
      const currentYear = today.getFullYear();

      // 임시 사용자 데이터
      const userData = [
        { id: 1, updatedAt: "2024-09-01" },
        { id: 2, updatedAt: "2024-09-15" },
        { id: 3, updatedAt: "2024-07-30" },
        { id: 4, updatedAt: "2024-08-10" },
        { id: 5, updatedAt: "2024-09-25" },
        { id: 6, updatedAt: "2024-06-20" },
        { id: 7, updatedAt: "2024-09-10" },
        { id: 8, updatedAt: "2024-08-25" },
        { id: 9, updatedAt: "2024-09-28" },
        { id: 10, updatedAt: "2024-10-01" },
      ];

      this.totalUsers = userData.length;

      // 최근 30일 이내 로그인한 활성 사용자 수 계산
      this.activeUsers = userData.filter((user) => {
        const userLastLogin = new Date(user.updatedAt);
        return userLastLogin >= last30DaysDate;
      }).length;

      // 이번 달 신규 사용자 수 계산
      this.newUsersThisMonth = userData.filter((user) => {
        const userJoinedDate = new Date(user.updatedAt);
        return (
          userJoinedDate.getMonth() === currentMonth &&
          userJoinedDate.getFullYear() === currentYear
        );
      }).length;
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
