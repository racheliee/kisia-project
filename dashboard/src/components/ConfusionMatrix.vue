<template>
  <div class="dashboard-container">
    <h3>Model Statistics</h3>

    <!-- Buttons to toggle between views -->
    <div class="toggle-buttons">
      <button @click="toggleView('confusionMatrix')">
        Show Confusion Matrix
      </button>
      <button @click="toggleView('confidenceChart')">
        Show Confidence Hit Rate
      </button>
    </div>

    <!-- Confusion Matrix -->
    <div v-if="showConfusionMatrix" class="confusion-matrix-container">
      <h3>Confusion Matrix for AI Model</h3>
      <div class="matrix">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Predicted Positive</th>
              <th>Predicted Negative</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Actual Positive</td>
              <td :style="cellStyle(truePositive)">{{ truePositive }}</td>
              <td :style="cellStyle(falseNegative)">{{ falseNegative }}</td>
            </tr>
            <tr>
              <td>Actual Negative</td>
              <td :style="cellStyle(falsePositive)">{{ falsePositive }}</td>
              <td :style="cellStyle(trueNegative)">{{ trueNegative }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Confidence Hit Rate Chart -->
    <div v-if="showConfidenceChart" class="confidence-hit-rate-container">
      <h3>Confidence and Hit Rate</h3>
      <canvas id="confidenceChart"></canvas>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { nextTick } from "vue";
import Chart from "chart.js/auto";

export default {
  data() {
    return {
      truePositive: 0,  // Default values until data is fetched
      falseNegative: 0,
      falsePositive: 0,
      trueNegative: 0,
      confidenceHitRates: [], // Stores confidence hit rate data
      confidenceValues: [], // Confidence ranges
      counts: [], // Counts of each confidence range
      showConfusionMatrix: true, // Flag to show Confusion Matrix by default
      showConfidenceChart: false, // Flag to hide Confidence Chart initially
    };
  },
  mounted() {
    this.fetchConfusionMatrixData();
    this.fetchConfidenceHitRateData();
  },
  methods: {
    // Style for matrix cells
    cellStyle(value) {
      return {
        backgroundColor: value > 30 ? "#8ecae6" : "#bde0fe",
        color: "#023047",
        fontSize: "1.5rem",
        textAlign: "center",
        padding: "10px",
      };
    },
    // Fetch confusion matrix data
    async fetchConfusionMatrixData() {
      try {
        const response = await axios.get("/admin/model/confusion-matrix");
        const modelData = response.data.find((model) => model.model === "AI_MODEL");

        if (modelData) {
          this.truePositive = modelData.truePositive;
          this.falseNegative = modelData.falseNegative;
          this.falsePositive = modelData.falsePositive;
          this.trueNegative = modelData.trueNegative;
        } else {
          this.useTemporaryData();
        }
      } catch (error) {
        console.error("Error fetching confusion matrix data, using temporary data", error);
        this.useTemporaryData();
      }
    },
    // Use temporary data for confusion matrix
    useTemporaryData() {
      this.truePositive = 71;
      this.falseNegative = 7;
      this.falsePositive = 10;
      this.trueNegative = 60;
    },
    // Fetch confidence hit rate data
    async fetchConfidenceHitRateData() {
      try {
        const response = await axios.get("/admin/model/confidence-hit-rate");
        this.confidenceHitRates = response.data;

        this.confidenceValues = this.confidenceHitRates.map((item) => item.confidenceRange);
        this.counts = this.confidenceHitRates.map((item) => item.count);
      } catch (error) {
        console.error("Error fetching confidence hit rate data", error);
        this.useTemporaryConfidenceHitRateData();
      }
    },
    // Temporary confidence hit rate data
    useTemporaryConfidenceHitRateData() {
      this.confidenceHitRates = [
        { confidenceRange: "0.6-0.7", count: 60 },
        { confidenceRange: "0.7-0.8", count: 90 },
        { confidenceRange: "0.8-0.9", count: 120 },
        { confidenceRange: "0.9-1.0", count: 100 },
      ];

      this.confidenceValues = this.confidenceHitRates.map((item) => item.confidenceRange);
      this.counts = this.confidenceHitRates.map((item) => item.count);
    },
    // Render the confidence hit rate chart
    renderConfidenceChart() {
      const ctx = document.getElementById("confidenceChart").getContext("2d");

      new Chart(ctx, {
        type: "line",
        data: {
          labels: this.confidenceValues, // X-axis: Confidence ranges
          datasets: [
            {
              label: "Hit Rate",
              data: this.counts, // Y-axis: Counts corresponding to confidence ranges
              borderColor: "rgba(255, 99, 132, 1)",
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderWidth: 2,
              fill: false, // Line without area fill
              pointRadius: 4, // Points on the chart
              pointHoverRadius: 6,
              tension: 0.4, // Curved line
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              title: {
                display: true,
                text: "Confidence",
              },
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Hit Rate",
              },
            },
          },
        },
      });
    },
    // Toggle between views
    toggleView(view) {
      if (view === 'confusionMatrix') {
        this.showConfusionMatrix = true;
        this.showConfidenceChart = false;
      } else if (view === 'confidenceChart') {
        this.showConfusionMatrix = false;
        this.showConfidenceChart = true;
        // Use Vue's nextTick to ensure the DOM is updated before rendering the chart
        nextTick(() => {
          this.renderConfidenceChart();
        });
      }
    }
  },
};
</script>

<style scoped>
.dashboard-container {
  text-align: center;
  margin: 20px;
}

.toggle-buttons {
  margin-bottom: 20px;
}

.toggle-buttons button {
  margin: 5px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
}

.confusion-matrix-container,
.confidence-hit-rate-container {
  margin-top: 20px;
}

.matrix table {
  margin: 0 auto;
  border-collapse: collapse;
}

.matrix th,
.matrix td {
  border: 1px solid #ddd;
  padding: 15px;
  font-size: 1.2rem;
}

.matrix th {
  background-color: #cad2c5;
}

canvas {
  max-width: 900px;
  margin: 40px auto;
  height: 500px;
}
</style>
