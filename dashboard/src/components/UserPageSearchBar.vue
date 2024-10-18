<template>
  <div class="search-bar">
    <div class="search-bar-container">
      <input
        v-model="url"
        type="text"
        placeholder="Enter URL to scan"
        @keyup.enter="searchUrl"
        class="search-input"
      />
      <button @click="searchUrl" class="search-icon-button">
        <img src="@/assets/search.svg" alt="Search" class="search-icon" />
      </button>
    </div>

    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <span class="close-button" @click="closeModal">&times;</span>
        <div class="modal-header">
          <h3 class="modal-title">URL Analysis Report</h3>
        </div>
        <div class="modal-body">
          <div class="modal-item">
            <span class="item-label">URL:</span>
            <span class="item-value">{{ urlData.url }}</span>
          </div>
          <div class="modal-item">
            <span class="item-label">Is Malicious:</span>
            <span class="item-value" :class="{'malicious': urlData.isMalicious}">{{ urlData.isMalicious ? 'Yes' : 'No' }}</span>
          </div>
          <div class="modal-item">
            <span class="item-label">Access Count:</span>
            <span class="item-value">{{ urlData.accessCount }}</span>
          </div>
          <div class="modal-item">
            <span class="item-label">False Negatives:</span>
            <span class="item-value">{{ urlData.falseNeg }}</span>
          </div>
          <div class="modal-item">
            <span class="item-label">False Positives:</span>
            <span class="item-value">{{ urlData.falsePos }}</span>
          </div>
          <div class="modal-item">
            <span class="item-label">Created At:</span>
            <span class="item-value">{{ formatDate(urlData.createdAt) }}</span>
          </div>
          <div class="modal-item">
            <span class="item-label">Updated At:</span>
            <span class="item-value">{{ formatDate(urlData.updatedAt) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      url: '',
      urlData: {
        url: '',
        isMalicious: false,
        accessCount: 0,
        falseNeg: 0,
        falsePos: 0,
        createdAt: '',
        updatedAt: '',
      },
      responseMessage: null,
      showModal: false,
    };
  },
  methods: {
    async searchUrl() {
      if (!this.url) {
        this.responseMessage = 'Please enter a URL.';
        return;
      }

      try {
        const response = await axios.post('/admin/url-search', {
          url: this.url,
        });

        if (response.data.statusCode === 200) {
          this.urlData = response.data.data;
          this.responseMessage = null;
        } else {
          this.setDefaultUrlData(response.data.message);
        }
      } catch (error) {
        this.setDefaultUrlData(error.response?.data?.message || 'An error occurred during the request.');
      } finally {
        this.openModal();
      }
    },
    setDefaultUrlData(message) {
      this.responseMessage = message || 'An error occurred.';
      this.urlData = {
        url: this.url + ' // Not Found',
        isMalicious: false,
        accessCount: 0,
        falseNeg: 0,
        falsePos: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleString();
    },
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
  },
};
</script>

<style scoped>
.search-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem;
  margin: 3rem 0;

}

.search-bar-container {
  display: flex;
  align-items: center;
  border: 2px solid #ccc;
  border-radius: 8px;
  padding: 0.75rem;
  width: 600px;
  background-color: #ffffff;
}

.search-input {
  flex: 1;
  padding: 0.75rem;
  font-size: 1rem;
  border: none;
  outline: none;
}

.search-icon-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: 0.75rem;
}

.search-icon {
  width: 24px;
  height: 24px;
}

.response-message {
  margin-top: 1.5rem;
  color: red;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  width: 80%;
  max-width: 700px;
  position: relative;
}

.close-button {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  font-size: 2rem;
  cursor: pointer;
  color: #333;
}

.modal-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.modal-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  background-color: #f1f1f1;
  border-radius: 8px;
}

.item-label {
  font-weight: bold;
  color: #555;
}

.item-value {
  color: #333;
}

.item-value.malicious {
  color: red;
  font-weight: bold;
}
</style>
