<template>
  <div id="app">
    <header>
      <h1>Admin Dashboard</h1>
    </header>

    <div class="dashboard-container">
      <!-- 서비스 관련 차트 -->
      <section class="dashboard-box">
        <h2>Service Stats</h2>
        <ServiceCharts />
      </section>

      <!-- URL 검색 및 데이터베이스 정보 -->
      <section class="dashboard-box">
        <h2>URL Search and Database Info</h2>
        <URLSearch />
        <DbOverview />
      </section>

      <!-- URL 통계 (Top 5 및 False Reports) -->
      <section class="dashboard-box">
        <h2>URL Statistics</h2>
        <Top5Reports />
      </section>

      <!-- 모델 성능 차트 -->
      <section class="dashboard-box">
        <h2>Model Performance</h2>
        <ModelPerformance />
      </section>

      <!-- 사용자 정보 -->
      <section class="dashboard-box">
        <h2>User Information</h2>
        <UserInformation />
      </section>
    </div>

    <footer>
      <p>&copy; 2024 URL Scanner Dashboard. All Rights Reserved.</p>
    </footer>
  </div>
</template>

<script>
import ServiceCharts from './components/ServiceCharts.vue';
import URLSearch from './components/URLSearch.vue';
import Top5Reports from './components/Top5Reports.vue';
import DbOverview from './components/DbOverview.vue';
import ModelPerformance from './components/ModelPerformance.vue';
import UserInformation from './components/UserInformation.vue';  // 사용자 정보 컴포넌트 추가

export default {
  components: {
    ServiceCharts,
    URLSearch,
    Top5Reports,
    DbOverview,
    ModelPerformance,
    UserInformation,
  },
};
</script>

<style>
#app {
  text-align: center;
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  background-color: #007bff;
  color: white;
  padding: 20px;
  text-align: center;
  flex-shrink: 0;
}

footer {
  background-color: #f1f1f1;
  padding: 10px;
  text-align: center;
  margin-top: auto;
  flex-shrink: 0;
}

.dashboard-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr)); /* 최소 400px 너비로 설정 */
  gap: 20px;
  justify-content: center;
  margin-top: 20px;
  padding: 20px;
  flex-grow: 1;
}

.dashboard-box {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  height: 100%; /* 박스 높이를 통일 */
  overflow-y: auto; /* 내부 내용이 길면 스크롤 */
}

h2 {
  font-size: 1.5em;
  margin-bottom: 15px;
}

@media (max-width: 1200px) {
  .dashboard-container {
    grid-template-columns: 1fr 1fr; /* 2열 레이아웃 */
  }
}

@media (max-width: 800px) {
  .dashboard-container {
    grid-template-columns: 1fr; /* 모바일에서는 1열 레이아웃 */
  }
}
</style>
