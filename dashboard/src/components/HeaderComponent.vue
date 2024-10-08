<template>
  <header class="header">
    <div class="header-left">
      <!-- 로고 -->
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
      <h1>Database</h1>
    </div>
    
    <div class="header-right">
      <!-- Admin 텍스트와 로그아웃 버튼 -->
      <span class="admin-text">Admin</span>
      <button @click="logout" class="logout-button">로그아웃</button>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
  methods: {
    logout() {
      // 로그아웃 로직 추가 (예: API 호출 후 리다이렉트)
      alert("로그아웃 되었습니다.");
      // 실제 로그아웃 시에는 Vue Router로 로그인 페이지로 이동하거나 처리합니다.
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 15px;
}

.logo {
  height: 40px; /* 로고 크기 조절 */
}

.header-right {
  display: flex;
  align-items: center;
  gap: 15px;
}

.admin-text {
  font-weight: bold;
  font-size: 16px;
  color: #333;
}

.logout-button {
  padding: 8px 16px;
  font-size: 14px;
  color: #fff;
  background-color: #42a5f5;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.logout-button:hover {
  background-color: #1e88e5;
}
</style>
