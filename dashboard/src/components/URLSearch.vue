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
          <th>URL</th>
          <th>Is Malicious</th>
          <th>Access Count</th>
          <th>Confidence Score</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="url in paginatedResults" :key="url.url">
          <td>{{ url.url }}</td>
          <td>{{ url.isMalicious ? "Yes" : "No" }}</td>
          <td>{{ url.accessCount }}</td>
          <td>{{ url.confidenceScore }}</td>
          <td>
            <button @click="showDetails(url)">Show More Details</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 페이징 버튼 -->
    <div class="pagination" v-if="results.length">
      <button v-if="currentPage > 1" @click="changePage(1)">&lt;&lt;</button>
      <button v-if="currentPage > 1" @click="changePage(currentPage - 1)">
        &lt;
      </button>
      <button v-for="page in totalPages" :key="page" @click="changePage(page)">
        {{ page }}
      </button>
      <button
        v-if="currentPage < totalPages"
        @click="changePage(currentPage + 1)"
      >
        &gt;
      </button>
      <button v-if="currentPage < totalPages" @click="changePage(totalPages)">
        &gt;&gt;
      </button>
    </div>

    <!-- 팝업 창 -->
    <div v-if="popupData" class="overlay" @click="closePopup">
      <div class="popup" @click.stop>
        <h3>URL Details</h3>
        <p><strong>URL:</strong> {{ popupData.url }}</p>
        <p><strong>Is Malicious:</strong> {{ popupData.isMalicious ? "Yes" : "No" }}</p>
        <p><strong>Detected By:</strong> {{ popupData.detectedBy || "N/A" }}</p>
        <p><strong>False Positive Count:</strong> {{ popupData.fpCount }}</p>
        <p><strong>False Negative Count:</strong> {{ popupData.fnCount }}</p>
        <p><strong>Confidence Score:</strong> {{ popupData.confidenceScore }}</p>
        <p><strong>Access Count:</strong> {{ popupData.accessCount }}</p>
        <p><strong>Created At:</strong> {{ popupData.createdAt }}</p>
        <p><strong>Updated At:</strong> {{ popupData.updatedAt }}</p>
        <button @click="closePopup">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      query: "",
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
        const response = await axios.get("/admin/url/search", {
          params: { url: this.query }, // Adjust the request according to the API
        });

        if (response.data.found) {
          // If URL is found, structure the data and add it to results
          this.results = [
            {
              url: response.data.url,
              isMalicious: response.data.isMalicious,
              accessCount: response.data.accessCount,
              detectedBy: response.data.detectedBy,
              fpCount: response.data.fpCount,
              fnCount: response.data.fnCount,
              confidenceScore: response.data.confidenceScore,
              createdAt: response.data.created_at,
              updatedAt: response.data.updated_at,
            },
          ];
        } else {
          this.results = []; // No results if URL is not found
          alert("No results found for this URL.");
        }
      } catch (error) {
        console.error("Error fetching data, using temporary data", error);
        this.useTemporaryData();
      }
      this.currentPage = 1;
    },
    useTemporaryData() {
      // Example of temporary data in case of an API error
      this.results = [
        {
          url: "https://example.com",
          isMalicious: false,
          detectedBy: "AI_MODEL",
          accessCount: 50,
          fpCount: 2,
          fnCount: 0,
          confidenceScore: 0.92,
          createdAt: "2024-01-01",
          updatedAt: "2024-02-01",
        },
        {
          url: "https://malicious-site.com",
          isMalicious: true,
          detectedBy: "AI_MODEL",
          accessCount: 300,
          fpCount: 0,
          fnCount: 2,
          confidenceScore: 0.95,
          createdAt: "2023-01-01",
          updatedAt: "2023-06-01",
        },
        // Add more temporary results if necessary
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
input[type="text"] {
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
