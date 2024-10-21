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
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";

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
          data: [],
        },
        {
          label: "False Negative Report",
          data: [],
        },
        {
          label: "False Positive Report",
          data: [],
        },
        {
          label: "Malicious URLs",
          data: [],
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
          y: {
            grid: { color: "#f0f0f0" },
            ticks: { display: false }, // Hide y-axis labels since URLs are displayed in the bars
          },
        },
      },
    };
  },
  methods: {
    async fetchData() {
      try {
        // eslint-disable-next-line no-unused-vars
        const [accessCountRes, fnRes, fpRes, maliciousRes] = await Promise.all([
          axios.get("http://43.203.239.57:8000/admin/top-urls"),
          axios.get("http://43.203.239.57:8000/admin/top-false-negatives"),
          axios.get("http://43.203.239.57:8000/admin/top-false-postives"),
          axios.get("http://43.203.239.57:8000/admin/top-malicious"),
        ]);

        this.tabs[0].data = accessCountRes.data.data.map((item) => ({
          label: item.url,
          value: item.accessCount,
        }));
        this.tabs[1].data = fnRes.data.data.map((item) => ({
          label: item.url,
          value: item.falseNegCount,
        }));
        this.tabs[2].data = fpRes.data.data.map((item) => ({
          label: item.url,
          value: item.falsePosCount,
        }));
        this.tabs[3].data = maliciousRes.data.data.map((item) => ({
          label: item.url,
          value: item.accessCount,
        }));
      } catch (error) {
        console.error("Failed to fetch data, using default values:", error);

        // Temporary data in case of failure
        this.tabs[0].data = [
          { label: "https://google.com", value: 11 },
          { label: "https://naver.com", value: 10 },
          { label: "http://021bag.com", value: 7 },
          { label: "http://0432www.com", value: 4 },
          { label: "https://www.kisia.or.kr/", value: 3 },
        ];
        this.tabs[1].data = [
          { label: "", value: 0 },
          { label: "", value: 0 },
          { label: "", value: 0 },
          { label: "", value: 0 },
          { label: "", value: 0 },
        ];
        this.tabs[2].data = [
          { label: "", value: 0 },
          { label: "", value: 0 },
          { label: "", value: 0 },
          { label: "", value: 0 },
          { label: "", value: 0 },
        ];
        this.tabs[3].data = [
          { label: "http://021bag.com", value: 4 },
          { label: "http://0432www.com", value: 3 },
          { label: "http://04324g.com/", value: 2 },
          { label: "http://000066655333778880000.000webhostapp.com/", value: 1 },
          { label: "http://0432bbb.com/", value: 1 },
        ];
      }
    },
    getChartData(data) {
      return {
        labels: data.map((item) => item.label), // Hide the label on the y-axis
        datasets: [
          {
            label: this.tabs[this.activeTab].label,
            data: data.map((item) => item.value),
            backgroundColor: "rgba(66, 165, 245, 0.6)",
            borderColor: "#42A5F5",
            borderWidth: 1,
            borderRadius: 10,
            hoverBackgroundColor: "#1e88e5",
            barThickness: 30,
          },
        ],
        urls: data.map((item) => item.label),
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

.chart-content .bar {
  position: relative;
}

.chart-content .bar:before {
  content: attr(data-label);
  position: absolute;
  left: 5px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  color: #fff;
  white-space: nowrap;
}
</style>
