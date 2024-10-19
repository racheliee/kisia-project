<template>
  <header class="header">
    <div class="header-left">
      <router-link to="/">
        <img src="@/assets/logo.png" alt="Logo" class="logo" />
      </router-link>
      <h1>Database Dashboard</h1>
    </div>
    <div class="header-right">
    </div>
  </header>
</template>

<script>
export default {
  name: "LoginHeaderComponent",
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 40px;
  background-color: #f5f5f5; /* 밝은 배경 색상 */
  color: #333333; /* 텍스트 색상 어둡게 */
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1); /* 그림자 살짝 조정 */
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  transition: background-color 0.3s ease;
}

.header:hover {
  background-color: #e0e0e0; /* hover 시 배경색 약간 어둡게 */
}

.header-left {
  display: flex;
  align-items: center;
}

.logo {
  height: 40px;
  margin-right: 10px;
  transition: transform 0.2s ease;
}

.logo:hover {
  transform: scale(1.05);
}

h1 {
  font-size: 24px;
  font-weight: 700;
  color: #333333; /* 텍스트 색 어둡게 */
  transition: color 0.3s ease;
}

h1:hover {
  color: #000000; /* hover 시 검정색 */
}

.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.settings-link,
.profile-link {
  font-size: 16px;
  color: #666666; /* 링크 텍스트 색상 어둡게 */
  transition: color 0.3s ease;
  text-decoration: none;
}

.settings-link:hover,
.profile-link:hover {
  color: #333333; /* hover 시 색상 더 어둡게 */
}
</style>
