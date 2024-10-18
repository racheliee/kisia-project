<template>
  <div class="user-page-keep-in-mind-url">
    <h2>Top 5 Malicious URLs</h2>
    <div v-if="urls.length > 0" class="urls-container">
      <ul>
        <li v-for="(item, index) in urls" :key="index" class="url-item">
          <span class="url">{{ item.url }}</span>
          <span class="access-count">Access Count: {{ item.accessCount }}</span>
        </li>
      </ul>
    </div>
    <div v-else class="no-data">
      <p>No data available</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserPageKeepInMindUrl',
  data() {
    return {
      urls: [],
      sampleData: [
        { url: 'http://sample1.com', accessCount: 10 },
        { url: 'http://sample2.com', accessCount: 8 },
        { url: 'http://sample3.com', accessCount: 15 },
        { url: 'http://sample4.com', accessCount: 5 },
        { url: 'http://sample5.com', accessCount: 12 },
      ],
    };
  },
  created() {
    this.fetchTopMaliciousUrls();
  },
  methods: {
    async fetchTopMaliciousUrls() {
      try {
        const response = await axios.get('/admin/top-malicious');
        if (response.status === 200 && response.data.statusCode === 200) {
          this.urls = response.data.data;
        }
      } catch (error) {
        console.error('Failed to fetch top malicious URLs:', error);
        this.urls = this.sampleData;
      }
    },
  },
};
</script>

<style scoped>
.user-page-keep-in-mind-url {
  padding: 20px;
  max-width: 600px;
  margin: auto;
}

h2 {
  margin-bottom: 20px;
  text-align: center;
  color: #333;
}

.urls-container {
  background-color: #ffffff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.url-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
}

.url-item:last-child {
  border-bottom: none;
}

.url {
  font-weight: bold;
  color: #007acc;
  text-decoration: none;
}

.access-count {
  font-size: 14px;
  color: #666;
}

.no-data {
  text-align: center;
  padding: 20px;
  color: #999;
}
</style>
