<template>
  <header class="header">
    <div class="header-left">
      <!-- 로고 -->
      <img src="@/assets/logo.png" alt="Logo" class="logo" />
      <h1>Database Dashboard</h1>
    </div>

    <div class="header-right">
      <!-- Admin 텍스트와 로그아웃 버튼 -->
      <span class="admin-text">Welcome, Admin</span>
      <button @click="logout" class="logout-button">Logout</button>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
  methods: {
    logout() {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");

      alert("Logged out successfully.");
      this.$router.push("/"); // Redirect to home page
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background-color: #ffffff;
  border-bottom: 2px solid #e0e0e0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.logo {
  height: 50px; /* 로고 크기 조절 */
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.1);
}

h1 {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  transition: color 0.3s ease;
}

h1:hover {
  color: #42a5f5;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.admin-text {
  font-weight: bold;
  font-size: 18px;
  color: #555;
}

.logout-button {
  padding: 10px 20px;
  font-size: 14px;
  color: #ffffff;
  background-color: #ff6f61;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.logout-button:hover {
  background-color: #e64a19;
  transform: scale(1.05);
}
</style>
