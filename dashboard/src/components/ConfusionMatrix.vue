<template>
  <div class="confusion-matrix-container">
    <h3>Confusion Matrix</h3>

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
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      truePositive: 0,  // Default values until data is fetched
      falseNegative: 0,
      falsePositive: 0,
      trueNegative: 0,
    };
  },
  mounted() {
    this.fetchConfusionMatrixData();
  },
  methods: {
    cellStyle(value) {
      return {
        backgroundColor: value > 30 ? "#8ecae6" : "#bde0fe",
        color: "#023047",
        fontSize: "1.5rem",
        textAlign: "center",
        padding: "10px",
      };
    },
    async fetchConfusionMatrixData() {
      try {
        // Fetch data from your API
        const response = await axios.get('/api/confusion-matrix');
        const data = response.data;

        this.truePositive = data.truePositive;
        this.falseNegative = data.falseNegative;
        this.falsePositive = data.falsePositive;
        this.trueNegative = data.trueNegative;
      } catch (error) {
        console.error('Error fetching confusion matrix data, using temporary data', error);
        this.useTemporaryData(); // Use temp data if the API call fails
      }
    },
    useTemporaryData() {
      // Temp data when the API call fails
      this.truePositive = 23;
      this.falseNegative = 7;
      this.falsePositive = 10;
      this.trueNegative = 60;
    },
  },
};
</script>

<style scoped>
.confusion-matrix-container {
  text-align: center;
  margin: 20px 0;
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
</style>
