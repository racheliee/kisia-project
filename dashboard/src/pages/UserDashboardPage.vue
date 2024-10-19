<template>
  <div class="full-container">
    <div class="userPageHeader">
      <UserPageHeader :username="userId" />
    </div>

    <section class="url-search">
      <UserPageSearchBar />
    </section>

    <div class="content">
      <div class="content-left">
        <div class="keep-in-mind-url">
          <UserPageKeepInMindUrl />
        </div>
        <div class="user-url-news">
          <UserPageNews />
        </div>
      </div>

      <div class="content-right">
        <UserPageHistory />
      </div>
    </div>
  </div>
</template>

<script>
import UserPageHeader from "@/components/UserPageHeader.vue";
import UserPageSearchBar from "@/components/UserPageSearchBar.vue";
import UserPageKeepInMindUrl from "@/components/UserPageKeepInMindUrl.vue";
import UserPageNews from "@/components/UserPageNews.vue";
import UserPageHistory from "@/components/UserPageHistory.vue";

export default {
  components: {
    UserPageHeader,
    UserPageSearchBar,
    UserPageKeepInMindUrl,
    UserPageNews,
    UserPageHistory
  },
  data() {
    return {
      searchQuery: "",
      keepInMindUrls: [],
      userUrlNews: [],
      searchHistory: [],
    };
  },
  computed: {
    userId() {
      return this.$route.query.userId || "Guest"; // 값이 없을 경우 기본값 설정
    },
  },
};
</script>

<style scoped>
.full-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 0;
  background-color: #f5f5f5;
}

.content {
  display: flex;
  flex: 1;
  gap: 1.5rem;
  margin-top: 5rem;
}

.url-search {
  max-height: 40vh;
}

.content-left {
  flex: 1;
  /* background-color: #ffffff; */
  padding: 0;
  /* border: 1px solid #ddd; */
  border-radius: 8px;
  /* box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); */
  max-height: 130vh;
  overflow-y: auto;
}

.content-right {
  flex: 1;
  background-color: #ffffff;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-height: 130vh;
  overflow-y: auto;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
}

.keep-in-mind-url,
.user-url-news {
  margin-bottom: 1.5rem;
}

.keep-in-mind-url,
.user-url-news,
.content-right {
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #fafafa;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
}

.keep-in-mind-url h2,
.user-url-news h2 {
  margin-top: 0;
}

.content-right {
  padding-left: 0;
  padding-right: 0;
}


</style>
