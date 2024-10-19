<template>
  <div class="signup-page">
    <LoginHeaderComponent />

    <div class="signup-container">
      <h2>Sign Up</h2>
      <form @submit.prevent="handleSignup">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            placeholder="Enter your email"
          />
        </div>
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            v-model="username"
            required
            placeholder="Choose a username"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            placeholder="Create a password"
          />
        </div>
        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="confirmPassword"
            required
            placeholder="Confirm your password"
          />
        </div>
        <button type="submit" class="signup-button">Sign Up</button>
      </form>
      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import LoginHeaderComponent from "@/components/LoginHeaderComponent.vue";
import axios from "axios";

export default {
  name: "SignupPage",
  components: {
    LoginHeaderComponent,
  },
  data() {
    return {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      successMessage: '',
      errorMessage: '',
    };
  },
  methods: {
    async handleSignup() {
      // Check if passwords match
      if (this.password !== this.confirmPassword) {
        this.errorMessage = "Passwords do not match.";
        this.successMessage = '';
        return;
      }

      try {
        const response = await axios.post("http://43.203.239.57:8000/auth/signup", {
          email: this.email,
          username: this.username,
          password: this.password,
        });

        if (response.data.statusCode === 201) {
          this.successMessage = response.data.message;
          this.errorMessage = '';
          setTimeout(() => {
            this.$router.push({ path: "/" }); // Redirect to home page upon successful signup
          }, 1000);
        }
      } catch (error) {
        this.successMessage = '';
        if (error.response && error.response.status === 400) {
          this.errorMessage = error.response.data.message;
        } else {
          this.errorMessage = "An error occurred during signup.";
        }
      }
    },
  },
};
</script>

<style scoped>
.signup-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #e9f1f7;
}

.signup-container {
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

input[type="email"],
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

input[type="email"]:focus,
input[type="text"]:focus,
input[type="password"]:focus {
  border-color: #63b3ed;
  box-shadow: 0 0 6px rgba(99, 179, 237, 0.4);
}

.signup-button {
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

.signup-button:hover {
  background-color: #2b6cb0;
  transform: translateY(-2px);
}

.success-message {
  color: #38a169;
  margin-top: 12px;
  font-size: 14px;
  font-weight: bold;
}

.error-message {
  color: #e53e3e;
  margin-top: 12px;
  font-size: 14px;
  font-weight: bold;
}
</style>