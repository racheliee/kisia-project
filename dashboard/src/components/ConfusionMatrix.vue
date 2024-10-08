<!-- ConfusionMatrix.vue -->
<template>
  <div>
    <h2>{{ modelName }} Confusion Matrix</h2>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      modelName: "Model 1", // 사용할 모델 이름
      confusionMatrix: {
        TP: 50,
        FP: 10,
        FN: 5,
        TN: 100,
      },
    };
  },
  computed: {
    TP() {
      return this.confusionMatrix?.TP || 0;
    },
    FP() {
      return this.confusionMatrix?.FP || 0;
    },
    FN() {
      return this.confusionMatrix?.FN || 0;
    },
    TN() {
      return this.confusionMatrix?.TN || 0;
    },
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #333;
  padding: 8px;
  text-align: center;
}
</style>
