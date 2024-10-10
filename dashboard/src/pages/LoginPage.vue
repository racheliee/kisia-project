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
      // Admin login bypass
      if (this.loginId === "admin" && this.password === "admin") {
        localStorage.setItem("access_token", "dummy_admin_access_token");
        localStorage.setItem("refresh_token", "dummy_admin_refresh_token");
        this.$router.push({ name: "DashboardPage" });
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
        console.log("axios", response); // 응답 데이터 확인

        if (
          response.status === 200 &&
          response.data.message === "Successfully signed in"
        ) {
          const { access_token, refresh_token } = response.data.data;
          localStorage.setItem("access_token", access_token);
          localStorage.setItem("refresh_token", refresh_token);
          this.$router.push({ name: "DashboardPage" });
          console.log(1);
          
        }
      } catch (error) {
        if (error.response) {
          const { message, statusCode } = error.response.data;
          console.log(2);

          if (statusCode === 401) {
            this.errorMessage =
              message === "loginId is incorrect"
                ? "Login ID is incorrect"
                : "Password is incorrect";
                console.log(3);

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
  margin-top: 100px;
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
