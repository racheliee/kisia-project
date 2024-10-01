<template>
  <div>
    <!-- <h2>URL Search and Database Info</h2> -->

    <div class="search-container">
      <input
        type="text"
        v-model="query"
        placeholder="Search URL or isMalicious (true/false)"
        @keypress.enter="searchURL"
      />
      <button @click="searchURL">Search</button>
    </div>

    <table v-if="results.length" class="results-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>URL</th>
          <th>Is Malicious</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="url in paginatedResults" :key="url.id">
          <td>{{ url.id }}</td>
          <td>{{ url.url }}</td>
          <td>{{ url.isMalicious ? 'Yes' : 'No' }}</td>
          <td>
            <button @click="showDetails(url)">Show More Details</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 페이징 버튼 -->
    <div class="pagination" v-if="results.length">
      <button v-if="currentPage > 1" @click="changePage(1)">&lt;&lt;</button>
      <button v-if="currentPage > 1" @click="changePage(currentPage - 1)">&lt;</button>
      <button v-for="page in totalPages" :key="page" @click="changePage(page)">
        {{ page }}
      </button>
      <button v-if="currentPage < totalPages" @click="changePage(currentPage + 1)">&gt;</button>
      <button v-if="currentPage < totalPages" @click="changePage(totalPages)">&gt;&gt;</button>
    </div>

    <!-- 팝업 창 -->
    <div v-if="popupData" class="overlay" @click="closePopup">
      <div class="popup" @click.stop>
        <h3>URL Details</h3>
        <p><strong>URL:</strong> {{ popupData.url }}</p>
        <p><strong>Is Malicious:</strong> {{ popupData.isMalicious ? 'Yes' : 'No' }}</p>
        <p><strong>Type:</strong> {{ popupData.type || 'N/A' }}</p>
        <p><strong>Score:</strong> {{ popupData.score }}</p>
        <p><strong>Access Count:</strong> {{ popupData.accessCount }}</p>
        <p><strong>Created At:</strong> {{ popupData.createdAt }}</p>
        <p><strong>Updated At:</strong> {{ popupData.updatedAt }}</p>
        <button @click="closePopup">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      query: '',
      results: [], // 검색된 결과
      currentPage: 1, // 현재 페이지
      itemsPerPage: 10, // 페이지당 항목 수
      popupData: null, // 팝업에 표시될 URL 정보
    };
  },
  computed: {
    paginatedResults() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.results.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.results.length / this.itemsPerPage);
    },
  },
  methods: {
    async searchURL() {
      try {
        // 실제 DB에서 데이터 요청
        const response = await axios.get('/api/urls', {
          params: { query: this.query },
        });
        this.results = response.data;
      } catch (error) {
        console.error('Error fetching data, using temporary data', error);
        this.useTemporaryData();
      }
      this.currentPage = 1;
    },
    useTemporaryData() {
      // DB 오류 발생 시 임시 데이터 사용
      this.results = [
        {
          id: 1,
          url: 'https://example.com',
          isMalicious: false,
          type: null,
          score: 0.0,
          accessCount: 150,
          createdAt: '2022-01-15',
          updatedAt: '2022-06-30',
        },
        {
          id: 2,
          url: 'https://malicious-site.com',
          isMalicious: true,
          type: 'Phishing',
          score: 85.5,
          accessCount: 300,
          createdAt: '2023-03-10',
          updatedAt: '2023-05-15',
        },
        // 추가 데이터는 필요에 따라 더 작성
      ];
    },
    changePage(page) {
      this.currentPage = page;
    },
    showDetails(url) {
      this.popupData = url;
    },
    closePopup() {
      this.popupData = null;
    },
  },
};
</script>

<style scoped>
.search-container {
  margin-bottom: 20px;
}
input[type='text'] {
  width: 300px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
}
button {
  padding: 10px 15px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
.results-table {
  width: 80%;
  margin: 20px auto;
  border-collapse: collapse;
}
.results-table th,
.results-table td {
  border: 1px solid #ddd;
  padding: 10px;
}
.results-table th {
  background-color: #007bff;
  color: white;
}
.pagination button {
  margin: 5px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}
.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  z-index: 1000;
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}
</style>
