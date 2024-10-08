<template>
  <div>
    <h3>사용자 히스토리 로그</h3>
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Action</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(log, index) in logs" :key="index">
          <td>{{ log.date }}</td>
          <td>{{ log.action }}</td>
          <td>{{ log.details }}</td>
        </tr>
      </tbody>
    </table>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserHistoryLogs",
  data() {
    return {
      logs: [],
      errorMessage: "",
    };
  },
  mounted() {
    this.fetchUserHistoryLogs();
  },
  methods: {
    async fetchUserHistoryLogs() {
      try {
        const response = await axios.get("/api/user-history-logs");
        this.logs = response.data;
      } catch (error) {
        console.error("Failed to fetch user history logs:", error);
        
        // 임시 데이터
        this.logs = [
          { date: "2023-09-01", action: "Login", details: "User logged in" },
          { date: "2023-09-02", action: "Profile Update", details: "Updated profile information" },
          { date: "2023-09-03", action: "Logout", details: "User logged out" },
        ];
        
        this.errorMessage = "서버 데이터를 불러오지 못했습니다. 임시 데이터를 표시합니다.";
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

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

th, td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
}
</style>
