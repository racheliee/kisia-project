<template>
  <div class="login-page">
    <!-- 헤더 추가 -->
    <LoginHeaderComponent />

    <div class="login-container">
      <h2>Sign In</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="loginId">Login ID</label>
          <input
            type="text"
            id="loginId"
            v-model="loginId"
            required
            placeholder="Enter your login ID"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            placeholder="Enter your password"
            autocomplete="current-password"
          />
        </div>
        <button type="submit" class="login-button">Login</button>
      </form>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <p class="signup-link">
        Don't have an account?
        <router-link to="/SignupPage" class="link">Sign up here</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import LoginHeaderComponent from "@/components/LoginHeaderComponent.vue";
import axios from "axios";

export default {
  name: "LoginPage",
  components: {
    LoginHeaderComponent,
  },
  data() {
    return {
      loginId: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    async handleLogin() {
      // temp admin account
      if (this.loginId === "admin" && this.password === "admin") {
        localStorage.setItem("access_token", "dummy_admin_access_token");
        localStorage.setItem("refresh_token", "dummy_admin_refresh_token");
        this.$router.push({ name: "DashboardPage" });
        return;
      }
      if (this.loginId === "test" && this.password === "test") {
        localStorage.setItem("access_token", "dummy_admin_access_token");
        localStorage.setItem("refresh_token", "dummy_admin_refresh_token");
        this.$router.push({ name: "UserDashboardPage", query: { userId: this.loginId } });
        return;
      }

      try {
        const response = await axios.post(
          "http://43.203.239.57:8000/auth/login",
          {
            username: this.loginId,
            password: this.password,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        console.log("axios 응답:", response); // 전체 응답 로그 출력

        // status 코드가 200 또는 201일 때만 토큰을 저장
        if ([200, 201].includes(response.status)) {
          const { access_token, refresh_token } = response.data.data; // 중첩된 data 하나 제거
          localStorage.setItem("access_token", access_token);
          localStorage.setItem("refresh_token", refresh_token);

          // 관리자 또는 특정 사용자만 AdminDashboard로 이동
          if (this.loginId === "admin" || this.loginId === "example") {
            this.$router.push({ name: "DashboardPage" });
          }
          console.log("로그인 성공");
        } else {
          console.log("조건에 맞지 않는 응답:", response);
        }
      } catch (error) {
        console.log("로그인 오류:", error); // 오류 로그 출력
        if (error.response) {
          const { message, statusCode } = error.response.data;
          if (statusCode === 401) {
            this.errorMessage =
              message === "loginId is incorrect"
                ? "Login ID is incorrect"
                : "Password is incorrect";
          } else {
            this.errorMessage = message || "An error occurred during login.";
          }
        } else {
          this.errorMessage = "An error occurred during login.";
        }
      }
    },
  },
};
</script>

<style scoped>
.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #e9f1f7;
}

.login-container {
  width: 100%;
  max-width: 400px;
  padding: 40px;
  margin-top: 150px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  text-align: center;
}

h2 {
  margin-bottom: 24px;
  font-size: 26px;
  font-weight: bold;
  color: #1a202c;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.form-group {
  margin-bottom: 24px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #2d3748;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 12px;
  border: 1px solid #cbd5e0;
  border-radius: 6px;
  box-sizing: border-box;
  font-size: 15px;
  transition: border-color 0.3s, box-shadow 0.3s;
}

input[type="text"]:focus,
input[type="password"]:focus {
  border-color: #63b3ed;
  box-shadow: 0 0 6px rgba(99, 179, 237, 0.4);
}

input[type="text"]::placeholder,
input[type="password"]::placeholder {
  color: #a0aec0;
}

.login-button {
  width: 100%;
  padding: 14px;
  background-color: #3182ce;
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  box-shadow: 0 4px 10px rgba(49, 130, 206, 0.3);
}

.login-button:hover {
  background-color: #2b6cb0;
  transform: translateY(-2px);
}

.error-message {
  color: #e53e3e;
  margin-top: 12px;
  font-size: 14px;
  font-weight: bold;
}

.signup-link {
  margin-top: 20px;
  font-size: 14px;
  color: #4a5568;
}

.link {
  color: #3182ce;
  text-decoration: none;
  font-weight: 600;
}

.link:hover {
  color: #2b6cb0;
  text-decoration: underline;
}
</style>
