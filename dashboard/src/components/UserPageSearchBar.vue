<template>
  <div class="container">
    <div class="input-section">
      <input
        type="text"
        v-model="url"
        placeholder="URL을 입력하세요"
        class="url-input"
      />
      <button @click="onCheck" class="check-button">검사</button>
    </div>

    <div class="detect-section">
      <div class="first-detect card">
        <h2>1차 검사 결과</h2>
        <div class="result">
          <span class="label">최종 결과:</span>
          <span :class="['value', finalResultClass]">
            {{ finalResult }}
          </span>
        </div>
        <div class="result">
          <span class="label">API/DB 결과:</span>
          <span class="value">{{ apiDbResult }}</span>
        </div>
      </div>

      <div class="second-detect card">
        <h2>AI 추가 검사</h2>
        <button @click="onAiCheck" class="ai-button">AI 추가 검사</button>
        <div class="result">
          <span class="label">AI 검사 결과:</span>
          <span :class="['value', aiResultClass]">
            {{ aiResult }}
          </span>
        </div>
      </div>
    </div>

    <div class="loading-overlay" v-if="isLoading">
      <div class="loading-spinner"></div>
      <p>로딩 중...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      url: '',
      finalResult: '', // '악성' or '노말'
      apiDbResult: '', // 'NONE', 'DB', 'API'
      aiResult: '', // '악성' or '노말'
      isLoading: false,
      // 임시 데이터 (axios 요청 실패 시 사용)
      tempDataDatabase: {
        statusCode: 200,
        message: 'Successfully received and processed URL',
        data: {
          url: 'www.google.com',
          isMalicious: false,
          source: 0,
        },
      },
      tempDataAi: {
        statusCode: 200,
        message: 'Successfully received and processed URL',
        data: {
          url: 'www.google.com',
          isMalicious: true,
          source: 2,
        },
      },
    };
  },
  computed: {
    finalResultClass() {
      return this.finalResult === '악성' ? 'malicious' : 'normal';
    },
    aiResultClass() {
      return this.aiResult === '악성' ? 'malicious' : 'normal';
    },
  },
  methods: {
    async onCheck() {
      if (!this.url) {
        alert('URL을 입력하세요');
        return;
      }
      this.isLoading = true;
      try {
        const response = await axios.post('/url/database', { url: this.url });

        if (response.status === 200) {
          const { isMalicious, source } = response.data.data;
          this.finalResult = isMalicious ? '악성' : '노말';
          if (isMalicious) {
            this.apiDbResult =
              source === 0 ? 'DB' : source === 1 ? 'API' : 'UNKNOWN';
          } else {
            this.apiDbResult = 'NONE';
          }
        } else {
          alert(`에러: ${response.data.message}`);
        }
      } catch (error) {
        // axios 요청 실패 시 임시 데이터 사용
        console.error('Axios error:', error);
        alert('Axios 요청 실패, 임시 데이터를 사용합니다.');

        const result = this.tempDataDatabase;
        const { isMalicious, source } = result.data;
        this.finalResult = isMalicious ? '악성' : '노말';
        if (isMalicious) {
          this.apiDbResult =
            source === 0 ? 'DB' : source === 1 ? 'API' : 'UNKNOWN';
        } else {
          this.apiDbResult = 'NONE';
        }
      } finally {
        this.isLoading = false;
      }
    },
    async onAiCheck() {
      if (!this.url) {
        alert('URL을 입력하세요');
        return;
      }

      // localStorage에서 access_token 가져오기
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        alert('Access token이 없습니다. 다시 로그인해주세요.');
        return;
      }

      this.isLoading = true;
      try {
        const response = await axios.post(
          '/url/ai',
          { url: this.url },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          const { isMalicious } = response.data.data;
          this.aiResult = isMalicious ? '악성' : '노말';
        } else {
          alert(`에러: ${response.data.message}`);
        }
      } catch (error) {
        // axios 요청 실패 시 임시 데이터 사용
        console.error('Axios error:', error);
        alert('Axios 요청 실패, 임시 데이터를 사용합니다.');

        const result = this.tempDataAi;
        const { isMalicious } = result.data;
        this.aiResult = isMalicious ? '악성' : '노말';
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
/* 컨테이너 스타일 */
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

/* 입력 섹션 스타일 */
.input-section {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.url-input {
  flex: 1;
  padding: 12px 15px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 4px;
}

.check-button {
  padding: 12px 20px;
  margin-left: 10px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
}

.check-button:hover {
  background-color: #45a049;
  cursor: pointer;
}

/* detect-section 재디자인 */
.detect-section {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.card {
  flex: 0 0 48%;
  box-sizing: border-box;
  margin-bottom: 30px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #ddd;
  transition: box-shadow 0.3s ease;
}

.card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.card h2 {
  margin-bottom: 15px;
  color: #333;
  font-size: 20px;
}

.result {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.label {
  width: 130px;
  font-weight: bold;
  color: #555;
}

.value {
  font-size: 18px;
}

.malicious {
  color: #e74c3c;
  font-weight: bold;
}

.normal {
  color: #2ecc71;
  font-weight: bold;
}

/* AI 버튼 위치 조정 */
.second-detect .ai-button {
  margin-bottom: 15px;
}

/* AI 버튼 스타일 */
.ai-button {
  padding: 12px 20px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 4px;
}

.ai-button:hover {
  background-color: #2980b9;
  cursor: pointer;
}

/* 로딩 오버레이 스타일 */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 9999;
}

.loading-spinner {
  border: 8px solid #f3f3f3;
  border-top: 8px solid #4caf50;
  border-radius: 50%;
  width: 70px;
  height: 70px;
  animation: spin 1s linear infinite;
}

.loading-overlay p {
  color: #fff;
  margin-top: 20px;
  font-size: 20px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* 반응형 디자인 */
@media (max-width: 800px) {
  .detect-section {
    flex-direction: column;
  }

  .card {
    flex: 1 0 100%;
    margin-bottom: 20px;
  }
}

@media (max-width: 600px) {
  .input-section {
    flex-direction: column;
  }

  .check-button {
    margin-left: 0;
    margin-top: 10px;
    width: 100%;
  }

  .ai-button {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
