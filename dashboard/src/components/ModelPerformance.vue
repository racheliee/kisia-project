<template>
  <div>
    <h2>{{ currentModelTitle }}</h2>

    <div class="button-container">
      <button @click="showModel(0)" :disabled="models.length === 0">Model 1</button>
      <button @click="showModel(1)" :disabled="models.length === 0">Model 2</button>
      <button @click="showModel(2)" :disabled="models.length === 0">Model 3</button>
    </div>

    <div v-for="(model, index) in models" :key="index" v-show="currentModel === index" class="confusion-matrix-container">
      <h3>{{ model.name }} - Confusion Matrix</h3>
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
            <td>Actual Positive</td>
            <td>{{ model.truePositive }}</td>
            <td>{{ model.falseNegative }}</td>
          </tr>
          <tr>
            <td>Actual Negative</td>
            <td>{{ model.falsePositive }}</td>
            <td>{{ model.trueNegative }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      models: [], // 모델별 Confusion Matrix 데이터
      currentModel: 0, // 현재 보여주는 모델의 인덱스
      currentModelTitle: "", // 현재 모델의 제목
      interval: null, // 자동 전환을 위한 interval
    };
  },
  mounted() {
    this.fetchModelData();
  },
  beforeUnmount() {
    clearInterval(this.interval); // 컴포넌트 소멸 시 interval 제거
  },
  methods: {
    // 모델 데이터를 가져오는 함수
    async fetchModelData() {
      try {
        const response = await axios.get("/api/models/confusion-matrix");
        this.models = response.data.models;

        if (this.models.length > 0) {
          this.showModel(0); // 첫 번째 모델을 기본으로 표시
          this.startAutoSwitch(); // 모델 데이터가 있을 때만 자동 전환 시작
        }
      } catch (error) {
        console.error("Error fetching model data, using temporary data", error);
        this.useTemporaryData();
        if (this.models.length > 0) {
          this.showModel(0); // 첫 번째 모델을 기본으로 표시
          this.startAutoSwitch(); // 모델 데이터가 있을 때만 자동 전환 시작
        }
      }
    },
    // 임시 데이터 사용
    useTemporaryData() {
      this.models = [
        {
          name: "Model 1",
          truePositive: 80,
          falseNegative: 10,
          falsePositive: 5,
          trueNegative: 100,
        },
        {
          name: "Model 2",
          truePositive: 70,
          falseNegative: 15,
          falsePositive: 8,
          trueNegative: 90,
        },
        {
          name: "Model 3",
          truePositive: 85,
          falseNegative: 5,
          falsePositive: 10,
          trueNegative: 95,
        },
      ];
    },
    showModel(index) {
      if (this.models.length > 0 && this.models[index]) {
        this.currentModel = index;
        this.currentModelTitle = `${this.models[index].name} - Confusion Matrix`;
      }
    },
    startAutoSwitch() {
      const totalModels = this.models.length;
      let currentIndex = 0;

      this.interval = setInterval(() => {
        currentIndex = (currentIndex + 1) % totalModels;
        this.showModel(currentIndex);
      }, 5000); // 5초마다 모델 전환
    },
  },
};
</script>

<style scoped>
.confusion-matrix-container {
  margin: 20px 0;
  text-align: center;
}

.confusion-matrix {
  width: 100%;
  border-collapse: collapse;
  margin: 0 auto;
}

.confusion-matrix th,
.confusion-matrix td {
  border: 1px solid #ddd;
  padding: 10px;
}

.confusion-matrix th {
  background-color: #007bff;
  color: white;
}

.button-container {
  margin-bottom: 20px;
}

.button-container button {
  padding: 10px 15px;
  margin: 5px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.button-container button:disabled {
  background-color: #ccc;
}

.button-container button:hover:not(:disabled) {
  background-color: #0056b3;
}
</style>
