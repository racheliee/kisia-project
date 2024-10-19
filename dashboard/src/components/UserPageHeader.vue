<template>
  <header class="user-header">
    <div class="logo-box">
      <img class="main-logo" src="@/assets/logo.png" alt="메인 로고">
      <img class="text-logo" src="@/assets/text-logo.png" alt="텍스트 로고">
    </div>
    <div class="user-controls">
      <span class="username">{{ username }}님</span>
      <button @click="logout" class="logout-button">로그아웃</button>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    username: {
      type: String,
      required: true
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      alert("Logged out successfully.");
      this.$router.push("/"); // 홈 페이지로 리다이렉트
    }
  }
};
</script>

<style scoped>
.user-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #ffffff;
  border-bottom: 2px solid #e9ecef;
  /* box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); */
}

.logo-box {
  display: flex;
  align-items: center;
}

.main-logo {
  width: 80px;
  height: auto;
  margin-right: 1rem;
}

.text-logo {
  height: 80px;
  width: auto;
}

.user-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.username {
  font-size: 1rem;
  color: #495057;
  font-weight: 600;
}

.logout-button {
  padding: 0.6rem 1.2rem;
  background-color: #ff6b6b;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.logout-button:hover {
  background-color: #fa5252;
  transform: translateY(-2px);
}
</style>
