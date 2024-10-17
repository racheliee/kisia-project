<template>
  <div class="url-search fixed full-page">
    <h2>URL Search</h2>
    <div class="search-box">
      <input
        v-model="url"
        @keyup.enter="searchUrl"
        placeholder="Enter a URL to search (e.g., example.com)"
      />
      <button @click="searchUrl">Search</button>
    </div>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    <div v-if="urlInfo" class="url-info">
      <h3>URL Information</h3>
      <p><strong>URL:</strong> {{ urlInfo.url }}</p>
      <p><strong>Malicious:</strong> {{ urlInfo.isMalicious ? 'Yes' : 'No' }}</p>
      <button @click="toggleDetails">View Details</button>
    </div>
    <div v-if="showDetails" class="details-modal">
      <div class="details-content">
        <span class="close" @click="toggleDetails">&times;</span>
        <h3>Detailed URL Information</h3>
        <p><strong>URL: </strong> {{ urlInfo.url }}</p>
        <p><strong>Malicious: </strong> {{ urlInfo.isMalicious ? 'Yes' : 'No' }}</p>
        <p><strong>Access Count: </strong> {{ urlInfo.accessCount }}</p>
        <p><strong>False Negative: </strong> {{ urlInfo.falseNeg }}</p>
        <p><strong>False Positive: </strong> {{ urlInfo.falsePos }}</p>
        <p><strong>Confidence Score: </strong> {{ urlInfo.confidenceScore ?? 'N/A' }}</p>
        <p><strong>Created At: </strong> {{ formatDate(urlInfo.createdAt) }}</p>
        <p><strong>Updated At: </strong> {{ formatDate(urlInfo.updatedAt) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserUrlSearch',
  data() {
    return {
      url: '',
      loading: false,
      errorMessage: '',
      urlInfo: {
        url: 'http://example.com',
        isMalicious: false,
        accessCount: 10,
        falseNeg: 0,
        falsePos: 1,
        confidenceScore: 85,
        createdAt: '2024-10-06T02:36:52.645Z',
        updatedAt: '2024-10-12T09:05:56.607Z',
      },
      showDetails: false,
    };
  },
  methods: {
    async searchUrl() {
      if (!this.url.trim()) {
        this.errorMessage = 'Please enter a valid URL.';
        return;
      }

      this.loading = true;
      this.errorMessage = '';
      this.urlInfo = null;
      this.showDetails = false;

      try {
        const response = await axios.post('/admin/url-search', { url: this.url.trim() });
        this.urlInfo = response.data.data;
      } catch (error) {
        this.errorMessage = error.response?.data?.message || 'An error occurred while searching for URL information.';
        this.urlInfo = {
          url: this.url,
          isMalicious: false,
          accessCount: 0,
          falseNeg: 0,
          falsePos: 0,
          confidenceScore: 'N/A',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
      } finally {
        this.loading = false;
      }
    },
    toggleDetails() {
      this.showDetails = !this.showDetails;
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
  },
};
</script>

<style scoped>
.url-search {
  max-width: 900px; width: 100%;
  height: 89vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: linear-gradient(135deg, #00c6ff, #0072ff);
  padding: 0;
  box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  transition: all 0.4s ease;
}

h2 {
  font-size: 32px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 30px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
}

.search-box {
  display: flex;
  gap: 16px;
  margin-bottom: 30px;
  width: 80%;
  max-width: 600px;
}

input {
  flex: 1;
  padding: 14px;
  font-size: 16px;
  border: none;
  border-radius: 25px;
  transition: box-shadow 0.3s, transform 0.4s;
  box-shadow: 0px 5px 15px rgba(0, 114, 255, 0.4);
}

input:focus {
  outline: none;
  box-shadow: 0px 8px 20px rgba(0, 114, 255, 0.7);
  transform: translateY(-2px);
}

button {
  padding: 14px 25px;
  font-size: 16px;
  background: linear-gradient(135deg, #ff512f, #dd2476);
  color: #ffffff;
  border: none;
  border-radius: 25px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.4s ease;
  box-shadow: 0 10px 20px rgba(221, 36, 118, 0.5);
}

button:hover {
  background: linear-gradient(135deg, #dd2476, #ff512f);
  box-shadow: 0 15px 30px rgba(221, 36, 118, 0.7);
  transform: translateY(-4px) scale(1.05);
}

.loading {
  color: #ff512f;
  font-style: italic;
}

.error {
  color: #ff6b6b;
  margin-top: 10px;
  font-weight: bold;
}

.url-info {
  text-align: left;
  margin-top: 20px;
  padding: 25px;
  background-color: #f0faff;
  border-radius: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  font-size: 18px;
  width: 80%;
  max-width: 300px;
}

.details-modal {
  position: fixed;
  top: 0;
  left: 0;
  max-width: 900px; width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  padding: 20px;
}

.details-content {
  background-color: #ffffff;
  padding: 40px;
  max-width: 700px;
  max-width: 900px; width: 100%;
  border-radius: 30px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  position: relative;
  animation: fadeIn 0.4s ease;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 2em;
  cursor: pointer;
  color: #444;
  transition: color 0.3s;
}

.close:hover {
  color: #ff512f;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
