<template>
  <div class="confusion-matrix-container">
    <div class="matrix-header">
      <h3>{{ modelName }} Confusion Matrix</h3>
    </div>
    <table class="confusion-matrix">
      <thead>
        <tr>
          <th></th>
          <th>Predicted Positive</th>
          <th>Predicted Negative</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>Actual Positive</th>
          <td>{{ TP }}</td>
          <td>{{ FN }}</td>
        </tr>
        <tr>
          <th>Actual Negative</th>
          <td>{{ FP }}</td>
          <td>{{ TN }}</td>
        </tr>
      </tbody>
    </table>
    <div class="button-group">
      <button @click="switchModel(0)" class="model-button">URL</button>
      <button @click="switchModel(1)" class="model-button">Dynamic</button>
      <button @click="switchModel(2)" class="model-button">Static</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      models: [
        {
          modelName: "URL",
          // confusionMatrix: { TP: 50, FP: 10, FN: 5, TN: 100 },
          confusionMatrix: { TP: 0, FP: 0, FN: 0, TN: 0 },
        },
        {
          modelName: "Dynamic",
          // confusionMatrix: { TP: 60, FP: 8, FN: 7, TN: 90 },
          confusionMatrix: { TP: 0, FP: 0, FN: 0, TN: 0 },
        },
        {
          modelName: "Static",
          // confusionMatrix: { TP: 40, FP: 12, FN: 10, TN: 110 },
          confusionMatrix: { TP: 0, FP: 0, FN: 0, TN: 0 },

        },
      ],
      currentIndex: 0,
    };
  },
  computed: {
    modelName() {
      return this.models[this.currentIndex].modelName;
    },
    TP() {
      return this.models[this.currentIndex].confusionMatrix.TP || 0;
    },
    FP() {
      return this.models[this.currentIndex].confusionMatrix.FP || 0;
    },
    FN() {
      return this.models[this.currentIndex].confusionMatrix.FN || 0;
    },
    TN() {
      return this.models[this.currentIndex].confusionMatrix.TN || 0;
    },
  },
  methods: {
    async fetchConfusionMatrix(model) {
      try {
        const response = await axios.get(`http://43.203.239.57:8000/admin/model/confusion-matrix?model=${model}`);
        const data = response.data.find((item) => item.model === model);

        if (data) {
          this.models[this.currentIndex].confusionMatrix = {
            TP: data.truePositive,
            FP: data.falsePositive,
            FN: data.falseNegative,
            TN: data.trueNegative,
          };
        }
      } catch (error) {
        console.error("Failed to fetch confusion matrix:", error);
      }
    },
    switchModel(index) {
      this.currentIndex = index;
      const modelKey = ["url", "dynamic", "static"][index];
      this.fetchConfusionMatrix(modelKey);
    },
  },
  mounted() {
    this.switchModel(this.currentIndex);
  },
};
</script>

<style scoped>
.confusion-matrix-container {
  max-width: 600px;
  margin: 30px auto;
  padding: 20px;
  border-radius: 15px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.matrix-header {
  text-align: center;
  margin-bottom: 20px;
}

h3 {
  font-size: 22px;
  font-weight: bold;
  color: #333;
}

.confusion-matrix {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th, td {
  border: 1px solid #333;
  padding: 12px;
  text-align: center;
  font-size: 16px;
}

th {
  background-color: #f7f7f7;
  font-weight: bold;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.model-button {
  background-color: #42a5f5;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.model-button:hover {
  background-color: #1e88e5;
}
</style>