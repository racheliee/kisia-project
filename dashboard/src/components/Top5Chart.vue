<template>
  <div class="top5-chart">
    <h2>Top 5 Reports</h2>
    <!-- Tab Buttons -->
    <div class="tab-buttons">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        :class="{ active: activeTab === index }"
        @click="activeTab = index"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Display only the selected chart -->
    <div class="chart-content">
      <Bar
        v-if="tabs[activeTab]"
        :data="getChartData(tabs[activeTab].data)"
        :options="chartOptions"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Bar } from "vue-chartjs";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip);

export default {
  name: "Top5Chart",
  components: {
    Bar,
  },
  data() {
    return {
      activeTab: 0,
      tabs: [
        {
          label: "Access Count",
          data: [
            { label: "URL1", value: 50 },
            { label: "URL2", value: 40 },
            { label: "URL3", value: 30 },
            { label: "URL4", value: 20 },
            { label: "URL5", value: 10 },
          ],
        },
        {
          label: "False Negative Report",
          data: [
            { label: "URL1", value: 45 },
            { label: "URL2", value: 10 },
            { label: "URL3", value: 25 },
            { label: "URL4", value: 15 },
            { label: "URL5", value: 5 },
          ],
        },
        {
          label: "False Positive Report",
          data: [
            { label: "URL1", value: 42 },
            { label: "URL2", value: 32 },
            { label: "URL3", value: 11 },
            { label: "URL4", value: 12 },
            { label: "URL5", value: 2 },
          ],
        },
      ],
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: "y",
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#333",
            titleFont: { size: 14, weight: "bold" },
            bodyFont: { size: 12 },
            bodySpacing: 5,
            padding: 10,
          },
        },
        scales: {
          x: { beginAtZero: true, grid: { color: "#f0f0f0" } },
          y: { grid: { color: "#f0f0f0" }, ticks: { font: { size: 14 }, color: "#555" } },
        },
      },
    };
  },
  methods: {
    async fetchData() {
      try {
        const [accessCountRes, fnRes, fpRes] = await Promise.all([
          axios.get("http://43.203.239.57:8000/admin/top-accessed-urls"),
          axios.get("http://43.203.239.57:8000/admin/top-false-negatives"),
          axios.get("http://43.203.239.57:8000/admin/top-false-postives"),
        ]);

        this.tabs[0].data = accessCountRes.data.map(item => ({ label: item.url, value: item.accessCount }));
        this.tabs[1].data = fnRes.data.map(item => ({ label: item.url, value: item.fnCount }));
        this.tabs[2].data = fpRes.data.map(item => ({ label: item.url, value: item.fpCount }));
      } catch (error) {
        console.error("Failed to fetch data, using default values:", error);
      }
    },
    getChartData(data) {
      return {
        labels: data.map(item => item.label),
        datasets: [
          {
            label: this.tabs[this.activeTab].label,
            data: data.map(item => item.value),
            backgroundColor: "rgba(66, 165, 245, 0.6)",
            borderColor: "#42A5F5",
            borderWidth: 1,
            borderRadius: 10,
            hoverBackgroundColor: "#1e88e5",
          },
        ],
      };
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
.top5-chart {
  max-width: 600px;
  margin: auto;
  padding: 25px;
  border-radius: 15px;
}

h2 {
  text-align: center;
  font-size: 22px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
}

.tab-buttons {
  display: flex;
  justify-content: space-around;
  gap: 10px;
  margin-bottom: 15px;
}

button {
  padding: 10px 18px;
  font-size: 14px;
  cursor: pointer;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: all 0.3s;
}

button:hover {
  background-color: #e0e0e0;
  transform: translateY(-3px);
}

button.active {
  background-color: #42a5f5;
  color: #fff;
  border-color: #42a5f5;
}

.chart-content {
  padding: 15px;
  height: 300px;
}
</style>