<template>
  <div class="url-search-bar">
    <button @click="openModal">URL 검색</button>

    <div v-if="isModalVisible" class="modal-overlay" @click="closeModal">
      <div class="modal" @click.stop>
        <header>
          <h3>URL 검색</h3>
          <button class="close" @click="closeModal">X</button>
        </header>
        <main>
          <input 
            type="text" 
            v-model="query" 
            placeholder="검색할 URL을 입력하세요..." 
            @keyup.enter="searchUrl" 
          />
          <button @click="searchUrl">검색</button>

          <div v-if="urlData.length > 0" class="url-info">
            <h4>검색 결과</h4>
            <div v-for="(url, index) in paginatedUrls" :key="index" class="url-item">
              <p>URL: {{ url.url }}</p>
              <p>Status: {{ url.status }}</p>
              <button @click="showDetails(url)">자세히 보기</button>
            </div>

            <div class="pagination">
              <button @click="prevPage" :disabled="currentPage === 1">&lt;</button>
              <span>페이지 {{ currentPage }} / {{ totalPages }}</span>
              <button @click="nextPage" :disabled="currentPage === totalPages">&gt;</button>
            </div>
          </div>

          <p v-else-if="errorMessage">{{ errorMessage }}</p>
        </main>
      </div>
    </div>

    <div v-if="selectedUrl" class="details-modal">
      <div class="modal-content">
        <p>URL: {{ selectedUrl.url }}</p>
        <p>Created: {{ selectedUrl.created }}</p>
        <p>Access Count: {{ selectedUrl.accessCount }}</p>
        <p>Status: {{ selectedUrl.status }}</p>
        <p>Source: {{ selectedUrl.source }}</p>
        <p>Confidence Score: {{ selectedUrl.confidenceScore }}</p>
        <button @click="closeDetails">닫기</button>
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
      urlData: [],
      errorMessage: "",
      selectedUrl: null,
      isModalVisible: false,
      currentPage: 1,
      itemsPerPage: 5, // 검색 결과를 5개씩 보여줍니다.
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
      this.query = ""; // 초기화
      this.urlData = [];
      this.errorMessage = "";
      this.selectedUrl = null;
      this.currentPage = 1; // 페이지 초기화
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
        const response = await axios.get(`/api/url-info?query=${this.query}`);
        this.urlData = response.data;
        this.currentPage = 1; // 검색 후 첫 페이지로 리셋
      } catch (error) {
        console.error("Failed to fetch URL data:", error);

        // 임시 데이터로 설정
        this.urlData = [
          {
            url: this.query,
            created: "2023-01-01",
            accessCount: 42,
            status: "malicious",
            source: "user_submission",
            confidenceScore: 85,
          },{
            url: this.query,
            created: "2023-01-01",
            accessCount: 42,
            status: "malicious",
            source: "user_submission",
            confidenceScore: 85,
          },{
            url: this.query,
            created: "2023-01-01",
            accessCount: 42,
            status: "malicious",
            source: "user_submission",
            confidenceScore: 85,
          },{
            url: this.query,
            created: "2023-01-01",
            accessCount: 42,
            status: "malicious",
            source: "user_submission",
            confidenceScore: 85,
          },{
            url: this.query,
            created: "2023-01-01",
            accessCount: 42,
            status: "malicious",
            source: "user_submission",
            confidenceScore: 85,
          },{
            url: this.query,
            created: "2023-01-01",
            accessCount: 42,
            status: "malicious",
            source: "user_submission",
            confidenceScore: 85,
          },{
            url: this.query,
            created: "2023-01-01",
            accessCount: 42,
            status: "malicious",
            source: "user_submission",
            confidenceScore: 85,
          },{
            url: this.query,
            created: "2023-01-01",
            accessCount: 42,
            status: "malicious",
            source: "user_submission",
            confidenceScore: 85,
          },{
            url: this.query,
            created: "2023-01-01",
            accessCount: 42,
            status: "malicious",
            source: "user_submission",
            confidenceScore: 85,
          },{
            url: this.query,
            created: "2023-01-01",
            accessCount: 42,
            status: "malicious",
            source: "user_submission",
            confidenceScore: 85,
          },{
            url: this.query,
            created: "2023-01-01",
            accessCount: 42,
            status: "malicious",
            source: "user_submission",
            confidenceScore: 85,
          },{
            url: this.query,
            created: "2023-01-01",
            accessCount: 42,
            status: "malicious",
            source: "user_submission",
            confidenceScore: 85,
          },{
            url: this.query,
            created: "2023-01-01",
            accessCount: 42,
            status: "malicious",
            source: "user_submission",
            confidenceScore: 85,
          },{
            url: this.query,
            created: "2023-01-01",
            accessCount: 42,
            status: "malicious",
            source: "user_submission",
            confidenceScore: 85,
          },{
            url: this.query,
            created: "2023-01-01",
            accessCount: 42,
            status: "malicious",
            source: "user_submission",
            confidenceScore: 85,
          },{
            url: this.query,
            created: "2023-01-01",
            accessCount: 42,
            status: "malicious",
            source: "user_submission",
            confidenceScore: 85,
          },{
            url: this.query,
            created: "2023-01-01",
            accessCount: 42,
            status: "malicious",
            source: "user_submission",
            confidenceScore: 85,
          },{
            url: this.query,
            created: "2023-01-01",
            accessCount: 42,
            status: "malicious",
            source: "user_submission",
            confidenceScore: 85,
          },{
            url: this.query,
            created: "2023-01-01",
            accessCount: 42,
            status: "malicious",
            source: "user_submission",
            confidenceScore: 85,
          },{
            url: this.query,
            created: "2023-01-01",
            accessCount: 42,
            status: "malicious",
            source: "user_submission",
            confidenceScore: 85,
          },{
            url: this.query,
            created: "2023-01-01",
            accessCount: 42,
            status: "malicious",
            source: "user_submission",
            confidenceScore: 85,
          },{
            url: this.query,
            created: "2023-01-01",
            accessCount: 42,
            status: "malicious",
            source: "user_submission",
            confidenceScore: 85,
          },{
            url: this.query,
            created: "2023-01-01",
            accessCount: 42,
            status: "malicious",
            source: "user_submission",
            confidenceScore: 85,
          },{
            url: this.query,
            created: "2023-01-01",
            accessCount: 42,
            status: "malicious",
            source: "user_submission",
            confidenceScore: 85,
          },{
            url: this.query,
            created: "2023-01-01",
            accessCount: 42,
            status: "malicious",
            source: "user_submission",
            confidenceScore: 85,
          },{
            url: this.query,
            created: "2023-01-01",
            accessCount: 42,
            status: "malicious",
            source: "user_submission",
            confidenceScore: 85,
          },{
            url: this.query,
            created: "2023-01-01",
            accessCount: 42,
            status: "malicious",
            source: "user_submission",
            confidenceScore: 85,
          },{
            url: this.query,
            created: "2023-01-01",
            accessCount: 42,
            status: "malicious",
            source: "user_submission",
            confidenceScore: 85,
          },{
            url: this.query,
            created: "2023-01-01",
            accessCount: 42,
            status: "malicious",
            source: "user_submission",
            confidenceScore: 85,
          },{
            url: this.query,
            created: "2023-01-01",
            accessCount: 42,
            status: "malicious",
            source: "user_submission",
            confidenceScore: 85,
          },{
            url: this.query,
            created: "2023-01-01",
            accessCount: 42,
            status: "malicious",
            source: "user_submission",
            confidenceScore: 85,
          },{
            url: this.query,
            created: "2023-01-01",
            accessCount: 42,
            status: "malicious",
            source: "user_submission",
            confidenceScore: 85,
          },{
            url: this.query,
            created: "2023-01-01",
            accessCount: 42,
            status: "malicious",
            source: "user_submission",
            confidenceScore: 85,
          },{
            url: this.query,
            created: "2023-01-01",
            accessCount: 42,
            status: "malicious",
            source: "user_submission",
            confidenceScore: 85,
          },{
            url: this.query,
            created: "2023-01-01",
            accessCount: 42,
            status: "malicious",
            source: "user_submission",
            confidenceScore: 85,
          },{
            url: this.query,
            created: "2023-01-01",
            accessCount: 42,
            status: "malicious",
            source: "user_submission",
            confidenceScore: 85,
          },{
            url: this.query,
            created: "2023-01-01",
            accessCount: 42,
            status: "malicious",
            source: "user_submission",
            confidenceScore: 85,
          },
        ];

        this.errorMessage = "서버 데이터를 불러오지 못했습니다. 임시 데이터를 표시합니다.";
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
  gap: 30px;
}

button {
  padding: 10px 15px;
  font-size: 16px;
  background-color: #42a5f5;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

button:hover {
  background-color: #1e88e5;
  transform: scale(1.05);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  border-radius: 10px;
  padding: 25px;
  width: 450px;
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.3);
  animation: fadeIn 0.3s ease;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close {
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 20px;
  color: #ff3d00;
}

input {
  padding: 12px;
  font-size: 16px;
  border: 2px solid #42a5f5;
  border-radius: 5px;
  width: 100%;
  margin-bottom: 15px;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #1e88e5;
  outline: none;
}

.url-info {
  margin-top: 15px;
}

.url-item {
  margin-bottom: 15px;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  background: #f9f9f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.pagination {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}

.details-modal {
  position: fixed;
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.3);
  z-index: 1000;
}

.modal-content {
  margin-top: 10px;
}

p {
  margin: 5px 0;
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
