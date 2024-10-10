<template>
  <div class="url-search-bar">
    <button @click="openModal" class="search-button">URL 검색</button>

    <div v-if="isModalVisible" class="modal-overlay" @click="closeModal">
      <div class="modal" @click.stop>
        <header class="modal-header">
          <h3>URL 검색</h3>
          <button class="close" @click="closeModal">&times;</button>
        </header>
        <main class="modal-main">
          <input 
            type="text" 
            v-model="query" 
            placeholder="검색할 URL을 입력하세요..." 
            @keyup.enter="searchUrl" 
            class="search-input"
          />
          <button @click="searchUrl" class="search-button">검색</button>

          <div v-if="urlData.length > 0" class="url-info">
            <h4>검색 결과</h4>
            <div v-for="(url, index) in paginatedUrls" :key="index" class="url-item">
              <p class="url-item-text"><strong>URL:</strong> {{ url.url }} &nbsp;&nbsp; <strong>Status:</strong> {{ url.status }}</p>
              <button @click="showDetails(url)" class="details-button">자세히 보기</button>
            </div>

            <div class="pagination">
              <button @click="prevPage" :disabled="currentPage === 1" class="pagination-button">&lt;</button>
              <span>페이지 {{ currentPage }} / {{ totalPages }}</span>
              <button @click="nextPage" :disabled="currentPage === totalPages" class="pagination-button">&gt;</button>
            </div>
          </div>

          <p v-else-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </main>
        <button class="close-modal-button" @click="closeModal">닫기</button>
      </div>
    </div>

    <div v-if="selectedUrl" class="details-modal">
      <div class="modal-content">
        <header class="modal-header">
          <h3>URL 세부 정보</h3>
          <button class="close" @click="closeDetails">&times;</button>
        </header>
        <div class="modal-body">
          <p><strong>URL:</strong> {{ selectedUrl.url }}</p>
          <p><strong>Created:</strong> {{ selectedUrl.created }}</p>
          <p><strong>Access Count:</strong> {{ selectedUrl.accessCount }}</p>
          <p><strong>Status:</strong> {{ selectedUrl.status }}</p>
          <p><strong>Source:</strong> {{ selectedUrl.source }}</p>
          <p><strong>Confidence Score:</strong> {{ selectedUrl.confidenceScore }}</p>
        </div>
        <footer class="modal-footer">
          <button @click="closeDetails" class="close-details-button">닫기</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UrlSearchBar",
  data() {
    return {
      query: "",
      urlData: [
        {
          url: "http://example1.com",
          created: "2024-01-01",
          accessCount: 100,
          status: "malicious",
          source: "user_submission",
          confidenceScore: 90,
        },
        {
          url: "http://example2.com",
          created: "2024-02-15",
          accessCount: 75,
          status: "safe",
          source: "system_analysis",
          confidenceScore: 95,
        },
        // additional sample data
      ],
      errorMessage: "",
      selectedUrl: null,
      isModalVisible: false,
      currentPage: 1,
      itemsPerPage: 5,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.urlData.length / this.itemsPerPage);
    },
    paginatedUrls() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.urlData.slice(start, start + this.itemsPerPage);
    },
  },
  methods: {
    openModal() {
      this.isModalVisible = true;
      this.query = "";
      this.errorMessage = "";
      this.selectedUrl = null;
      this.currentPage = 1;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    async searchUrl() {
      if (!this.query) {
        this.errorMessage = "검색할 URL을 입력해주세요.";
        return;
      }

      this.errorMessage = "";
      try {
        const response = await axios.post("http://43.203.239.57:8000/admin/url-search", { url: this.query });
        
        if (response.data.found) {
          this.urlData = [
            {
              url: response.data.url,
              created: response.data.created_at,
              accessCount: response.data.accessCount,
              status: response.data.isMalicious ? "malicious" : "safe",
              source: response.data.detectedBy,
              confidenceScore: Math.round(response.data.confidenceScore * 100),
            },
          ];
          this.currentPage = 1;
        } else {
          this.errorMessage = "URL을 찾을 수 없습니다.";
        }
      } catch (error) {
        console.error("Failed to fetch URL data:", error);
        this.errorMessage = "서버 데이터를 불러오지 못했습니다.";
      }
    },
    showDetails(url) {
      this.selectedUrl = url;
    },
    closeDetails() {
      this.selectedUrl = null;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
  },
};
</script>



<style scoped>
.url-search-bar {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.search-button {
  padding: 12px 20px;
  font-size: 16px;
  background-color: #42a5f5;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.search-button:hover {
  background-color: #1e88e5;
  transform: scale(1.05);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  border-radius: 12px;
  padding: 30px;
  width: 450px;
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.3);
  animation: fadeIn 0.3s ease;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.close {
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 24px;
  color: #ff3d00;
  transition: color 0.3s;
}

.close:hover {
  color: #d32f2f;
}

.close-modal-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #ff3d00;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 15px;
}

.close-modal-button:hover {
  background-color: #d32f2f;
}

.search-input {
  padding: 12px;
  font-size: 16px;
  border: 2px solid #42a5f5;
  border-radius: 8px;
  width: 100%;
  margin-bottom: 15px;
  transition: border-color 0.3s;
}

.search-input:focus {
  border-color: #1e88e5;
  outline: none;
}

.url-info {
  margin-top: 20px;
}

.url-item {
  margin-bottom: 8px;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #f9f9f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.url-item-text {
  font-size: 14px;
  margin: 0;
}

.details-button {
  padding: 6px 12px;
  font-size: 13px;
  background-color: #66bb6a;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.details-button:hover {
  background-color: #43a047;
  transform: scale(1.05);
}

.pagination {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
  justify-content: center;
}

.pagination-button {
  padding: 8px 12px;
  font-size: 14px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.pagination-button:hover {
  background-color: #e0e0e0;
}

.details-modal {
  position: fixed;
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  border-radius: 12px;
  padding: 30px;
  width: 450px;
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.3);
  z-index: 1000;
}

.modal-content {
  margin-top: 10px;
}

.modal-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}

.close-details-button {
  padding: 12px 20px;
  font-size: 16px;
  background-color: #f44336;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.close-details-button:hover {
  background-color: #d32f2f;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>