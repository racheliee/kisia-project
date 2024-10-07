<template>
  <div id="app">
    <!-- Show header and navigation only if user is logged in -->
    <header v-if="isLoggedIn">
      <h1>Admin Dashboard</h1>
    </header>

    <nav class="nav-bar" v-if="isLoggedIn">
      <ul>
        <li>
          <a href="#" @click.prevent="showSection('serviceStats')"
            >Service Stats</a
          >
        </li>
        <li>
          <a href="#" @click.prevent="showSection('dbOverview')"
            >Database Info</a
          >
        </li>
        <li>
          <a href="#" @click.prevent="showSection('userInfo')">User Info</a>
        </li>
        <li>
          <a href="#" @click.prevent="showSection('urlStats')">URL Stats</a>
        </li>
        <li>
          <a href="#" @click.prevent="showSection('urlSearch')">URL Search</a>
        </li>
        <li>
          <a href="#" @click.prevent="showSection('confusionMatrix')"
            >Confusion Matrix</a
          >
        </li>
        <li>
          <a href="#" @click.prevent="logout">Logout</a>
        </li>
      </ul>
    </nav>

    <!-- Login form -->
    <div class="login-container" v-if="!isLoggedIn">
      <div class="login-box">
        <h2>Login</h2>
        <form @submit.prevent="login">
          <input
            type="text"
            v-model="username"
            placeholder="Username"
            required
          />
          <input
            type="password"
            v-model="password"
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
          <p v-if="errorMessage">{{ errorMessage }}</p>
        </form>
      </div>
    </div>

    <!-- Dashboard Sections -->
    <div class="dashboard-container" v-if="isLoggedIn">
      <!-- Service Stats -->
      <section v-if="currentSection === 'serviceStats'" class="dashboard-box">
        <ServiceCharts />
      </section>

      <!-- Database Info -->
      <section v-if="currentSection === 'dbOverview'" class="dashboard-box">
        <h2>Database Info</h2>
        <DbOverview />
      </section>

      <!-- User Information -->
      <section v-if="currentSection === 'userInfo'" class="dashboard-box">
        <h2>User Information</h2>
        <UserInformation />
      </section>

      <!-- URL Statistics -->
      <section v-if="currentSection === 'urlStats'" class="dashboard-box">
        <h2>URL Statistics</h2>
        <Top5Reports />
      </section>

      <!-- URL Search -->
      <section v-if="currentSection === 'urlSearch'" class="dashboard-box">
        <h2>URL Search</h2>
        <URLSearch />
      </section>

      <!-- Confusion Matrix -->
      <section
        v-if="currentSection === 'confusionMatrix'"
        class="dashboard-box"
      >
        <h2>Confusion Matrix</h2>
        <ConfusionMatrix />
      </section>
    </div>

    <footer v-if="isLoggedIn">
      <p>&copy; 2024 URL Scanner Dashboard. All Rights Reserved.</p>
    </footer>
  </div>
</template>

<script>
import ServiceCharts from "./components/ServiceCharts.vue";
import DbOverview from "./components/DbOverview.vue";
import UserInformation from "./components/UserInformation.vue";
import Top5Reports from "./components/Top5Reports.vue";
import URLSearch from "./components/URLSearch.vue";
import ConfusionMatrix from "./components/ConfusionMatrix.vue";

export default {
  data() {
    return {
      username: "", // Input for username
      password: "", // Input for password
      errorMessage: "", // For showing login error
      isLoggedIn: false, // To check if user is logged in
      currentSection: "serviceStats", // Default section
    };
  },
  components: {
    ServiceCharts,
    DbOverview,
    UserInformation,
    Top5Reports,
    URLSearch,
    ConfusionMatrix,
  },
  methods: {
    showSection(section) {
      this.currentSection = section;
    },
    login() {
      // Temporary hardcoded admin credentials
      const tempAdmin = {
        username: "admin",
        password: "admin123",
      };

      if (this.username === tempAdmin.username && this.password === tempAdmin.password) {
        this.isLoggedIn = true;
        sessionStorage.setItem("user", JSON.stringify(tempAdmin)); // Save session
      } else {
        this.errorMessage = "Invalid username or password.";
      }
    },
    logout() {
      this.isLoggedIn = false;
      sessionStorage.removeItem("user"); // Clear session
    },
    checkSession() {
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (user) {
        this.isLoggedIn = true;
      }
    },
  },
  mounted() {
    this.checkSession(); // Check for session when the component is mounted
  },
};
</script>

<style scoped>
/* General Layout */
#app {
  text-align: center;
  font-family: "Roboto", sans-serif;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f4f6f9;
}

/* Header Styling */
header {
  background-color: #003366;
  color: white;
  padding: 20px;
  text-align: center;
  flex-shrink: 0;
  font-size: 1.8em;
  font-weight: bold;
}

/* Nav Bar Styling */
.nav-bar {
  background-color: #004080;
  padding: 10px 0;
}

.nav-bar ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: space-around;
}

.nav-bar a {
  color: white;
  text-decoration: none;
  padding: 10px 20px;
  transition: background-color 0.3s ease;
}

.nav-bar a:hover {
  background-color: #0059b3;
  border-radius: 5px;
}

/* Login Box Styling */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-box {
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
  width: 100%;
}

input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

/* Dashboard Layout */
.dashboard-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
  justify-items: center;
}

.dashboard-box {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
}

h2 {
  font-size: 1.5em;
  margin-bottom: 15px;
  color: #003366;
  border-bottom: 2px solid #d1d9e6;
  padding-bottom: 10px;
}

/* Footer Styling */
footer {
  background-color: #003366;
  color: white;
  padding: 10px;
  text-align: center;
  margin-top: auto;
}

/* Responsive Design */
@media (max-width: 800px) {
  .dashboard-container {
    grid-template-columns: 1fr;
  }
}
</style>
