<template>
  <div class="summary-card">
    <h3>{{ title }}</h3>
    <p>{{ value }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SummaryCard",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      value: 0,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const defaultData = {
        "총 검사 요청": 500,
        "총 AI 검사 요청": 120,
        "총 URL 갯수": 1000,
        "DB Size": "200MB",
      };

      try {
        if (this.title === "총 검사 요청") {
          const response = await axios.get("/admin/total-requests?interval=month");
          this.value = response.data.totalRequests;
        } else if (this.title === "총 AI 검사 요청") {
          const response = await axios.get("/admin/ai-requests?interval=month");
          this.value = response.data.aiRequests;
        } else if (this.title === "총 URL 갯수" || this.title === "DB Size") {
          const response = await axios.get("/admin/db-overview");
          this.value = this.title === "총 URL 갯수" ? response.data.totalUrls : response.data.dbSize;
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
        this.value = defaultData[this.title] || 0;
      }
    },
  },
};
</script>

<style scoped>
.summary-card {
  padding: 20px;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
  width: 80%;
  max-width: 300px;
  margin: 0 auto;
}

.summary-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

h3 {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
  transition: color 0.3s;
}

h3:hover {
  color: #42a5f5;
}

p {
  font-size: 24px;
  font-weight: bold;
  color: #ff6f61;
  margin: 0;
}
</style>