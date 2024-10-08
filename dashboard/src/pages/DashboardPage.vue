<template>
  <header>
    <HeaderComponent />
  </header>

  <div class="dashboard">
    <!-- 상단 요약 카드 섹션 -->
    <div class="summary-cards">
      <SummaryCard title="총 검사 요청" />
      <SummaryCard title="AI 검사 요청" />
      <SummaryCard title="총 URL 갯수" />
      <SummaryCard title="총 사용자 수" />
    </div>

    <!-- Top 5 섹션 -->
    <div class="top5-section">
      <h2>Top 5 URLs</h2>
      <Top5Chart />
    </div>

    <div class="db-overview">
      <TimeRangeChart title="URL 검사 갯수 (일/주/월)" />

    </div>

    <!-- 그래프 섹션 -->
    <div class="graph-section">
      <BarChart title="월별 검사 요청" />
      <LineChart title="DB 크기 변화" />
    </div>

    <!-- 악성 URL DB 섹션 -->
    <div class="url-db-section">
      <h2>악성 URL DB</h2>
      <UrlSearchBar />
    </div>

    <div class="confusion-matix_and_hit-rate">
      <!-- <ConfusionMatrix/>
      <ConfidenceHistogram/> -->
    </div>

    <!-- 사용자 통계 섹션 -->
    <div class="user-stats-section">
      <SummaryCard title="총 활성 사용자" />
      <SummaryCard title="이번 달 신규 회원" />
      <UserHistoryLogs />
    </div>
  </div>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import SummaryCard from "@/components/SummaryCard.vue";
import BarChart from "@/components/BarChart.vue";
import LineChart from "@/components/LineChart.vue";
import Top5Chart from "@/components/Top5Chart.vue";
import UrlSearchBar from "@/components/UrlSearchBar.vue";
import UserHistoryLogs from "@/components/UserHistoryLogs.vue";
import TimeRangeChart from "@/components/TimeRangeChart.vue"; 
// import ConfidenceHistogram from "@/components/ConfidenceHistogram.vue";
// import ConfusionMatrix from "@/components/ConfusionMatrix.vue";

export default {
  name: "DashboardPage",
  components: {
    HeaderComponent,
    SummaryCard,
    BarChart,
    LineChart,
    Top5Chart,
    UrlSearchBar,
    UserHistoryLogs,
    TimeRangeChart,
    // ConfusionMatrix,
    // ConfidenceHistogram,
  },
};
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 20px;
}

/* 상단 요약 카드 */
.summary-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

/* Top 5 섹션 */
.top5-section {
  padding: 20px;
  border-radius: 8px;
}

/* 그래프 섹션 */
.graph-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

/* 악성 URL DB 섹션 */
.url-db-section {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

/* 사용자 통계 섹션 */
.user-stats-section {
  display: flex;
  gap: 20px;
  align-items: center;
}
</style>
