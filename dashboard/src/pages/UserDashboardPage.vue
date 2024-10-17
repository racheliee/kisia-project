<template>
  <div class="user-page">
    <UserHeader :userId="userId" />
    <div class="main-content">
      <div class="bottom-section">
        <div class="top5">
          <UserTop5Chart />
        </div>
        <div class="db-search">
          <UserUrlSerach />
        </div>
      </div>
      <UserImageSlider />
    </div>
  </div>
</template>

<script>
import UserImageSlider from "@/components/UserImageSlider.vue";
import UserHeader from "@/components/UserHeader.vue";
import UserTop5Chart from "@/components/UserTop5Chart.vue";
import UserUrlSerach from "@/components/UserUrlSerach.vue";

export default {
  name: "UserDashboardPage",
  components: {
    UserImageSlider,
    UserHeader,
    UserTop5Chart,
    UserUrlSerach,
  },
  computed: {
    userId() {
      // console.log(this.$route.query);
      return this.$route.query.userId;
    },
  },
};
</script>


<style scoped>
.user-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  height: max-content;
  padding: 16px;
}

.main-content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 16px;
  margin-top: 16px;
}

.bottom-section {
  display: flex;
  gap: 16px;
}

.top5,
.db-search {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  max-height: max-content;
}
</style>
