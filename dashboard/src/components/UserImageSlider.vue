<template>
  <div class="temp-images">
    <button @click="prevImage" class="nav-button left">
      <i class="fas fa-chevron-left"></i>
    </button>
    <div class="image-wrapper">
      <img :src="currentImage" alt="temp image" />
    </div>
    <button @click="nextImage" class="nav-button right">
      <i class="fas fa-chevron-right"></i>
    </button>
    <div class="image-indicators">
      <span v-for="(image, index) in images" :key="index" class="indicator" :class="{ active: index === currentImageIndex }" @click="goToImage(index)"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserImageSlider',
  data() {
    return {
      images: [
        require('@/assets/1.png'),
        require('@/assets/2.jpg'),
        require('@/assets/3.jpg')
      ],
      currentImageIndex: 0,
    };
  },
  computed: {
    currentImage() {
      return this.images[this.currentImageIndex];
    }
  },
  mounted() {
    this.startImageRotation();
  },
  methods: {
    startImageRotation() {
      setInterval(() => {
        this.nextImage();
      }, 3000); // Change image every 3 seconds
    },
    nextImage() {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    },
    prevImage() {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
    },
    goToImage(index) {
      this.currentImageIndex = index;
    }
  }
};
</script>

<style scoped>
.temp-images {
  position: relative;
  width: 60%;
  height: 400px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin: 20px auto;
  background: linear-gradient(135deg, #e0eafc, #cfdef3);
}

.image-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.5s ease-in-out;
}

.temp-images img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  padding: 12px;
  cursor: pointer;
  border-radius: 50%;
  transition: background-color 0.3s;
}

.nav-button:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

.nav-button.left {
  left: 10px;
}

.nav-button.right {
  right: 10px;
}

.nav-button i {
  font-size: 18px;
}

.image-indicators {
  position: absolute;
  bottom: 15px;
  display: flex;
  gap: 8px;
}

.indicator {
  width: 12px;
  height: 12px;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s;
}

.indicator.active {
  background-color: #ffffff;
}
</style>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
