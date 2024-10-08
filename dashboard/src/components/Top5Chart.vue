<template>
  <div class="top5-chart">
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
      <h3>{{ tabs[activeTab].label }}</h3>
      <Bar
        v-if="tabs[activeTab]"
        :data="getChartData(tabs[activeTab].data)"
        :options="chartOptions"
      />
    </div>
  </div>
</template>

<script>
import { Bar } from "vue-chartjs";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title);

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
          label: "Access Count TOP 5",
          data: [
            { label: "URL1", value: 50 },
            { label: "URL2", value: 40 },
            { label: "URL3", value: 30 },
            { label: "URL4", value: 20 },
            { label: "URL5", value: 10 },
          ],
        },
        {
          label: "False Negative Report TOP 5",
          data: [
            { label: "URL1", value: 45 },
            { label: "URL2", value: 10 },
            { label: "URL3", value: 25 },
            { label: "URL4", value: 15 },
            { label: "URL5", value: 5 },
          ],
        },
        {
          label: "False Positive Report TOP 5",
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
        maintainAspectRatio: true,
        indexAxis: "y",
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            beginAtZero: true,
          },
        },
      },
    };
  },
  methods: {
    getChartData(data) {
      return {
        labels: data.map((item) => item.label),
        datasets: [
          {
            label: this.tabs[this.activeTab].label,
            data: data.map((item) => item.value),
            backgroundColor: "#42A5F5",
          },
        ],
      };
    },
  },
};
</script>

<style scoped>
.top5-chart {
  /* text-align: center; */
  max-width: 600px;
  border-radius: 8px;
  padding: 20px;
}

.tab-buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 20px;
}

button {
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  /* background-color: #f0f0f0; */
  border: 1px solid #ccc;
  border-radius: 4px;
}

button.active {
  background-color: #42a5f5;
  color: #fff;
  border-color: #42a5f5;
}

.chart-content {
  padding: 10px;
  max-height: 500px; /* Limit the chart's max height */
  overflow: hidden;
}
</style>
