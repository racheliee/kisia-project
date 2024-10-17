<template>
  <header class="user-header">
    <div class="logo">
      <div class="combined-logo">
        <img src="@/assets/logo.png" alt="로고" />
        <img src="@/assets/text-logo.png" alt="text로고">
      </div>
    </div>
    <div class="user-info">
      <span class="username">{{ userId }}</span>
      <button class="logout-button" @click="logout">로그아웃</button>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    userId: {
      type: String,
      required: false
    }
  },
  name: 'UserHeader',
  methods: {
    logout() {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");

      alert("Logged out successfully.");
      this.$router.push("/"); // Redirect to home page
    }
  }
};
</script>

<style scoped>
.user-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  color: white;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  margin: 20px;
  transition: all 0.4s ease;
}

.user-header:hover {
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.4);
  transform: scale(1.02);
}

.logo {
  display: flex;
  align-items: center;
}

.combined-logo {
  display: flex;
  align-items: center;
}

.combined-logo img {
  height: 5rem; /* Adjust this value to make the images larger */
  margin-right: 8px;
  transition: transform 0.3s ease;
}

.combined-logo img:hover {
  transform: rotate(10deg) scale(1.1);
}

.username {
  font-size: 1.4rem;
  font-weight: 700;
  background: linear-gradient(90deg, #f3ec78, #af4261);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 32px;
}

.logout-button {
  background: linear-gradient(135deg, #ff416c, #ff4b2b);
  color: white;
  border: none;
  padding: 12px 28px;
  border-radius: 30px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.4s ease;
  box-shadow: 0 8px 16px rgba(255, 75, 43, 0.5);
  font-size: 1rem;
}

.logout-button:hover {
  background: linear-gradient(135deg, #ff4b2b, #ff416c);
  box-shadow: 0 12px 24px rgba(255, 75, 43, 0.7);
  transform: translateY(-3px) scale(1.05);
}

.logout-button:active {
  transform: translateY(0);
  box-shadow: 0 4px 8px rgba(255, 75, 43, 0.4);
}
</style>
