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
          image: 'https://www.boannews.com/media/upFiles2/2024/08/814399607_9801.jpg',
          title: 'KISIA, ‘2024 제2회 KISIA 정보보호 개발자 해커톤’ 큰 호응 속 개최',
        },
        {
          image: 'https://cdn.datanet.co.kr/news/photo/202409/196545_119853_4122.jpg',
          title: 'KISIA, 금융권 망분리 규제개선 세미나 개최',
        },
        {
          image: 'https://cdn.digitaltoday.co.kr/news/photo/202409/534852_499627_2727.png',
          title: 'KISIA, 사이버보안 모태펀드 운용사 ‘린벤처스’와 MOU',
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
