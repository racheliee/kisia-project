<template>
  <div class="summary-card">
    <h3>{{ title }}</h3>
    <p>{{ value }}</p>
  </div>
</template>

<script>
export default {
  name: "SummaryCard",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    const defaultData = {
      "총 검사 요청": 500,
      "AI 검사 요청": 120,
      "총 URL 갯수": 1000,
      "총 사용자 수": 200,
      "총 활성 사용자": 50,
      "이번 달 신규 회원": 5,
    };
    return {
      value: defaultData[this.title] || 0,
    };
  },
};
</script>

<style scoped>
.summary-card {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: center;
}
</style>
