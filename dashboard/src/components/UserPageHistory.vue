/* UserPageHistory.vue - A Vue.js component that fetches and displays the user's history */
<template>
  <div class="user-page-history">
    <h2 class="header">User Page History</h2>
    <div v-if="isLoading" class="loading">Loading...</div>
    <!-- <div v-if="errorMessage" class="error">{{ errorMessage }}</div> -->
    <div v-if="historyData.length > 0" class="history-container">
      <div
        v-for="(item, index) in historyData"
        :key="index"
        class="history-item"
      >
        <div
          v-for="(accessedUrl, urlIndex) in item.urlsAccessed"
          :key="urlIndex"
          class="url-details"
        >
          <div class="url-card">
            <p>
              <strong>URL:</strong>
              <a :href="accessedUrl.url" target="_blank" class="url-link">{{
                accessedUrl.url
              }}</a>
            </p>
            <p>
              <strong>Malicious:</strong>
              <span :class="accessedUrl.isMalicious ? 'malicious' : 'safe'">{{
                accessedUrl.isMalicious ? "Yes" : "No"
              }}</span>
            </p>
            <p>
              <strong>Accessed At:</strong>
              {{ new Date(accessedUrl.createdAt).toLocaleString() }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!isLoading && historyData.length === 0" class="no-history">
      No history available.
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserPageHistory",
  data() {
    return {
      historyData: [],
      isLoading: false,
      errorMessage: "",
    };
  },
  created() {
    this.fetchUserHistory();
  },
  methods: {
    async fetchUserHistory() {
      this.isLoading = true;
      try {
        const response = await axios.get("/user/history");
        if (response.status === 200 && response.data.statusCode === 200) {
          this.historyData = response.data.data;
        } else {
          this.setTempData();
          this.errorMessage = "Failed to fetch user history.";
        }
      } catch (error) {
        this.setTempData();
        this.errorMessage = "An error occurred while fetching user history.";
      } finally {
        this.isLoading = false;
      }
    },
    setTempData() {
      this.historyData = [
        {
          urlsAccessed: [
            {
              url: "http://000066655333778880000.000webhostapp.com/",
              isMalicious: true,
              createdAt: new Date().toISOString(),
            },
            {
              url: "http://021bag.com/",
              isMalicious: true,
              createdAt: new Date().toISOString(),
            },
            {
              url: "http://naver.com",
              isMalicious: false,
              createdAt: new Date().toISOString(),
            },
            {
              url: "http://google.com",
              isMalicious: false,
              createdAt: new Date().toISOString(),
            },
            {
              url: "http://example.com",
              isMalicious: false,
              createdAt: new Date().toISOString(),
            },
            {
              url: "http://unknown-site.org",
              isMalicious: false,
              createdAt: new Date().toISOString(),
            },
            {
              url: "http://0432www.com/",
              isMalicious: true,
              createdAt: new Date().toISOString(),
            },
          ],
        },
      ];
    },
  },
};
</script>

<style scoped>
.user-page-history {
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 20px auto;
}

.header {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.loading {
  text-align: center;
  font-size: 1.2em;
  color: #666;
}

.error {
  color: #e74c3c;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.history-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.history-item {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.url-details {
  margin-bottom: 10px;
}

.url-card {
  padding: 15px;
  background-color: #f0f8ff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.url-link {
  color: #3498db;
  text-decoration: none;
}

.url-link:hover {
  text-decoration: underline;
}

.malicious {
  color: #e74c3c;
  font-weight: bold;
}

.safe {
  color: #2ecc71;
  font-weight: bold;
}

.no-history {
  text-align: center;
  font-size: 1.1em;
  color: #888;
}
</style>
