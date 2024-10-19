<template>
  <div class="container">
    <nav class="header">
      <div class="logo">
        <img src="@/assets/logo.png" alt="URLs 로고" class="logo__image">
        <img src="@/assets/text-logo.png" alt="URLs 텍스트 로고" class="logo__text-image">
      </div>
      <div class="auth-buttons">
        <button class="button button--signup" @click="goToSignupPage">회원가입</button>
        <button class="button button--login" @click="goToLoginPage">로그인</button>
      </div>
    </nav>

    <main class="main-content">
      <section class="hero">
        <div class="hero__content">
          <div class="hero__text">
            <h1 class="hero__heading">
              {{ typedHeading }}
              <br v-if="typedSecondHeading"/>
              {{ typedSecondHeading }}
            </h1>
            <p class="hero__subtext">{{ typedSubText }}</p>
            <button class="button button--cta" @click="goToSignupPage">지금 시작하기</button>
          </div>
          <div class="hero__image-wrapper">
            <img
              :src="currentImage"
              alt="URL 체크 결과 이미지"
              class="hero__image"
              :class="{ 'fade-in': fadeIn }"
            >
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p>&copy; 2024 URLs. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 헤딩을 두 부분으로 나눔
      fullHeading: 'A simple check,',
      typedHeading: '',
      secondHeading: 'total safety',
      typedSecondHeading: '',
      subText: '안전한 인터넷 서핑, 지금부터 시작',
      typedSubText: '',
      images: [
        require('@/assets/urlcheck-detect.png'),
        require('@/assets/urlcheck-undetect.png'),
      ],
      currentImageIndex: 0,
      fadeIn: false,
    };
  },
  computed: {
    currentImage() {
      return this.images[this.currentImageIndex];
    },
  },
  mounted() {
    this.startImageToggle();
    this.typeHeading();
  },
  methods: {
    startImageToggle() {
      setInterval(() => {
        this.fadeIn = false;
        setTimeout(() => {
          this.currentImageIndex =
            (this.currentImageIndex + 1) % this.images.length;
          this.fadeIn = true;
        }, 300);
      }, 3000);
    },
    goToLoginPage() {
      this.$router.push('/LoginPage');
    },
    goToSignupPage() {
      this.$router.push('/SignupPage');
    },
    typeHeading() {
      let index = 0;
      const typingSpeed = 100; // 타이핑 속도(ms)
      const fullText = this.fullHeading;
      const interval = setInterval(() => {
        this.typedHeading += fullText[index];
        index++;
        if (index >= fullText.length) {
          clearInterval(interval);
          // 첫 번째 헤딩 타이핑이 끝나면 두 번째 헤딩 타이핑 시작
          this.typeSecondHeading();
        }
      }, typingSpeed);
    },
    typeSecondHeading() {
      let index = 0;
      const typingSpeed = 100; // 타이핑 속도(ms)
      const fullText = this.secondHeading;
      const interval = setInterval(() => {
        this.typedSecondHeading += fullText[index];
        index++;
        if (index >= fullText.length) {
          clearInterval(interval);
          // 헤딩 타이핑이 모두 끝나면 서브텍스트 타이핑 시작
          this.typeSubText();
        }
      }, typingSpeed);
    },
    typeSubText() {
      let index = 0;
      const typingSpeed = 100; // 타이핑 속도(ms)
      const fullText = this.subText;
      const interval = setInterval(() => {
        this.typedSubText += fullText[index];
        index++;
        if (index >= fullText.length) {
          clearInterval(interval);
        }
      }, typingSpeed);
    },
  },
};
</script>

<style scoped>
/* CSS 변수 설정 */
:root {
  --primary-color: #4b6cb7;
  --secondary-color: #182848;
  --accent-color: #ff6b6b;
  --text-color: #ffffff;
  --background-gradient: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
}

/* 기본 스타일 초기화 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #f9f9f9; 
}

body {
  font-family: 'Helvetica Neue', sans-serif;
  background: var(--background-gradient);
  color: var(--text-color);
}

/* 컨테이너 스타일 */
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* 헤더 스타일 */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}

.logo {
  display: flex;
  align-items: center;
}

.logo__image {
  height: 60px;
  margin-right: 10px;
}

.logo__text-image {
  height: 60px;
}

.auth-buttons {
  display: flex;
  gap: 10px;
}

.button {
  padding: 10px 20px;
  border: 2px solid var(--text-color);
  background: transparent;
  color: var(--text-color);
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s;
}

.button:hover {
  background: var(--accent-color);
  border-color: var(--accent-color);
}

/* 메인 콘텐츠 스타일 */
.main-content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.hero__content {
  display: flex;
  align-items: center;
  gap: 50px;
}

.hero__text {
  flex: 1;
  animation: slideInLeft 1s forwards;
}

.hero__heading {
  font-size: 4rem;
  margin-bottom: 20px;
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
  line-height: 1.2;
}

.hero__subtext {
  font-size: 1.5rem;
  margin-bottom: 30px;
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
}

.button--cta {
  padding: 15px 30px;
  background: var(--accent-color);
  border: none;
  border-radius: 30px;
  color: var(--text-color);
  font-size: 1.2rem;
  cursor: pointer;
  transition: background 0.3s;
  background: #e5e5e5;
}

.button--cta:hover {
  background: #e55a5a;
}

/* 히어로 이미지 스타일 */
.hero__image-wrapper {
  flex: 1;
  text-align: center;
}

.hero__image {
  max-width: 80%;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  opacity: 0;
  transition: opacity 0.5s;
}

.fade-in {
  opacity: 1;
}

/* 푸터 스타일 */
.footer {
  text-align: center;
  padding: 20px;
}

/* 애니메이션 */
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* 타이핑 커서 효과 */
.hero__heading::after,
.hero__subtext::after {
  content: '';
  display: inline-block;
  width: 1px;
  height: 1em;
  background-color: var(--text-color);
  animation: blink 1s infinite;
  vertical-align: bottom;
  margin-left: 2px;
}

.button--signup:hover,
.button--login:hover {
  color: #e55a5a;
}

@keyframes blink {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .hero__content {
    flex-direction: column;
    text-align: center;
  }

  .hero__text {
    animation: none;
  }

  .hero__heading {
    font-size: 3rem;
  }

  .hero__subtext {
    font-size: 1.2rem;
  }
}
</style>
