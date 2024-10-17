<template>
  <header>
    <HeaderComponent />
  </header>

  <div class="dashboard">
    <!-- 상단 요약 카드 섹션 -->
    <div class="summary-cards">
      <SummaryCard title="총 URL 갯수" />
      <SummaryCard title="악성 URL 갯수" />
      <SummaryCard title="총 사용자수" />
      <SummaryCard title="DB Size" />
    </div>

    <!-- 주요 그래프 섹션 -->
    <div class="main-charts">
      <div class="chart-card top5-section">
        <Top5Chart />
      </div>
      
      <div class="chart-card"> 
        <BarChart title="All AI Requests" />
      </div>
    </div>

    <!-- DB Overview 섹션 -->
    <div class="chart-card db-overview full-width">
      <TimeRangeChart title="URL 검사 갯수 (일/주/월)" />
    </div>

    <!-- Confusion Matrix와 Hit Rate 섹션 -->
    <div class="confusion-hit-section">
      <div class="chart-card rm-background">
        <ConfusionMatrix />
        <div class="info-card url-db-section">
          <h2>악성 URL DB</h2>
          <UrlSearchBar />
        </div>
      </div>
      <div class="chart-card">
        <ConfidenceHistogram />
      </div>
    </div>

    <!-- 악성 URL DB 및 사용자 통계 섹션 -->
    <div class="url-and-user-stats">
      <div class="info-card user-stats-section">
        <UserStats />
      </div>
    </div>
  </div>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import SummaryCard from "@/components/SummaryCard.vue";
import BarChart from "@/components/BarChart.vue";
import Top5Chart from "@/components/Top5Chart.vue";
import UrlSearchBar from "@/components/UrlSearchBar.vue";
import TimeRangeChart from "@/components/TimeRangeChart.vue";
import ConfidenceHistogram from "@/components/ConfidenceHistogram.vue";
import ConfusionMatrix from "@/components/ConfusionMatrix.vue";
import UserStats from "@/components/UserStats.vue";

import { Chart, PointElement, LineElement, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
Chart.register(PointElement, LineElement, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

export default {
  name: "DashboardPage",
  components: {
    HeaderComponent,
    SummaryCard,
    BarChart,
    Top5Chart,
    UrlSearchBar,
    TimeRangeChart,
    ConfusionMatrix,
    ConfidenceHistogram,
    UserStats,
  },
  mounted() {
    if (!localStorage.getItem("access_token")) {
      // Redirect to login if not authenticated
      this.$router.push({ path: "/login" });
    }
  }
};
</script>


<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 30px;
  background-color: #f5f6fa;
}

/* 상단 요약 카드 */
.summary-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 25px;
}

/* 메인 차트 섹션 (Top 5) */
.main-charts {
  display: flex;
  gap: 25px;
}

/* 부차적 차트 섹션 (Total Revenue 및 Customer Map) */
.secondary-charts {
  display: flex;
  gap: 25px;
}

.main-charts .chart-card {
  flex: 1; /* 좌우 차트가 동일하게 커지도록 설정 */
}

/* 차트 카드 스타일 */
.chart-card {
  padding: 20px;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.chart-card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 12px 30px rgba(0, 0, 0, 0.15);
}

/* DB Overview 섹션 전체 폭 사용 */
.db-overview.full-width {
  width: 100%;
  padding: 0;
}

/* 악성 URL DB 및 사용자 통계 섹션 (옆으로 배치) */
.url-and-user-stats {
  display: flex;
  gap: 25px;
}

/* 정보 카드 스타일 (악성 URL DB, 사용자 통계) */
.info-card {
  flex: 1;
  padding: 25px;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.info-card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 12px 30px rgba(0, 0, 0, 0.15);
}

/* Confusion Matrix와 Hit Rate 섹션 */
.confusion-hit-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
}

.rm-background {
  box-shadow: none;
}

/* 타이틀 스타일링 */
h2 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #333;
}
</style>