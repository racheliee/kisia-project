<template>
  <div class="user-page-news">
    <img :src="newsData[currentIndex].image" :alt="newsData[currentIndex].title" />
    <h3>{{ newsData[currentIndex].title }}</h3>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newsData: [
        {
          image: 'https://via.placeholder.com/800x400',
          title: 'News Title 1',
        },
        {
          image: 'https://via.placeholder.com/800x400',
          title: 'News Title 2',
        },
        {
          image: 'https://via.placeholder.com/800x400',
          title: 'News Title 3',
        },
      ],
      currentIndex: 0,
    };
  },
  mounted() {
    this.startSlideshow();
  },
  beforeUnmount() {
    clearInterval(this.interval);
  },
  methods: {
    startSlideshow() {
      this.interval = setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.newsData.length;
      }, 3000);
    },
  },
};
</script>

<style scoped>
.user-page-news {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.user-page-news img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.user-page-news h3 {
  margin-top: 10px;
  font-size: 1.5em;
}
</style>
