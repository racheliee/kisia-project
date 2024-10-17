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

            bodySpacing: 7,
            padding: 15,
            displayColors: false,
          },
        },
        scales: {
          x: {
            beginAtZero: true,
            grid: { color: "#ddd" },
          },
          y: {
            grid: { color: "#f0f0f0" },
            ticks: {
              display: true,
              color: "#555",
            },
          },
        },
      },
    };
  },
  methods: {
    async fetchData() {
      try {
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

        this.tabs[0].data = [
          { label: "URL1", value: 50 },
          { label: "URL2", value: 40 },
          { label: "URL3", value: 30 },
          { label: "URL4", value: 20 },
          { label: "URL5", value: 10 },
        ];
        this.tabs[1].data = [
          { label: "URL1", value: 45 },
          { label: "URL2", value: 10 },
          { label: "URL3", value: 25 },
          { label: "URL4", value: 15 },
          { label: "URL5", value: 5 },
        ];
        this.tabs[2].data = [
          { label: "URL1", value: 42 },
          { label: "URL2", value: 32 },
          { label: "URL3", value: 11 },
          { label: "URL4", value: 12 },
          { label: "URL5", value: 2 },
        ];
        this.tabs[3].data = [
          { label: "URL1", value: 6 },
          { label: "URL2", value: 4 },
          { label: "URL3", value: 3 },
          { label: "URL4", value: 2 },
          { label: "URL5", value: 1 },
        ];
      }
    },
    getChartData(data) {
      return {
        labels: data.map((item) => item.label),
        datasets: [
          {
            label: this.tabs[this.activeTab].label,
            data: data.map((item) => item.value),
            backgroundColor: [
              "rgba(255, 99, 132, 0.8)",
              "rgba(54, 162, 235, 0.8)",
              "rgba(255, 206, 86, 0.8)",
              "rgba(75, 192, 192, 0.8)",
              "rgba(153, 102, 255, 0.8)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
            ],
            borderWidth: 2,
            borderRadius: 15,
            hoverBackgroundColor: "rgba(255, 159, 64, 0.9)",
            barThickness: 20,
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
  max-width: 900px;
  margin: 0;
  padding: 35px;
  border-radius: 25px;
  box-shadow: 0px 6px 25px rgba(0, 0, 0, 0.3);
  background: linear-gradient(135deg, #8e44ad, #3498db);
  transition: all 0.4s ease;
}

h2 {
  text-align: center;
  font-size: 28px;
  font-weight: bold;
  color: #f4f4f4;
  margin-bottom: 30px;
}

.tab-buttons {
  display: flex;
  justify-content: space-around;
  gap: 12px;
  margin-bottom: 30px;
}

button {
  flex-grow: 1;
  padding: 12px 20px;
  font-size: 16px;
  cursor: pointer;
  background: linear-gradient(135deg, #ff7e5f, #feb47b);
  color: #ffffff;
  border: none;
  border-radius: 15px;
  font-weight: bold;
  transition: all 0.4s ease;
  box-shadow: 0 8px 16px rgba(255, 126, 95, 0.5);
}

button:hover {
  background: linear-gradient(135deg, #feb47b, #ff7e5f);
  box-shadow: 0 12px 24px rgba(255, 126, 95, 0.7);
  transform: translateY(-3px) scale(1.05);
}

button.active {
  background-color: #1abc9c;
  color: #ffffff;
  box-shadow: 0px 3px 10px rgba(26, 188, 156, 0.3);
}

.chart-content {
  padding: 20px;
  height: 400px;
  border-radius: 20px;
  background-color: #f9f9f9;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
}
</style>
