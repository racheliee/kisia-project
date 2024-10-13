<template>
  <div class="time-range-chart">
    <h1>Total requests</h1>
    <!-- 선택된 범위의 차트 -->
    <div class="chart-container">
      <Line :data="chartData" :options="chartOptions" />
    </div>
    <!-- 범위 선택 버튼들 -->
    <div class="button-group">
      <button
        v-for="(range, index) in ranges"
        :key="index"
        :class="{ active: activeRange === range.value }"
        @click="setActiveRange(range.value)"
      >
        {{ range.label }}
      </button>
    </div>
  </div>
</template>

<script>
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, Title);

export default {
  name: "TimeRangeChart",
  components: {
    Line,
  },
  data() {
    return {
      activeRange: "day", // 기본값: 일간
      ranges: [
        { label: "일", value: "day" },
        { label: "주", value: "week" },
        { label: "월", value: "month" },
      ],
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            beginAtZero: true,
            grid: {
              color: "#f0f0f0",
            },
            ticks: {
              stepSize: 20,
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            position: "top",
            labels: {
              color: "#333",
              font: {
                size: 14,
              },
            },
          },
          tooltip: {
            backgroundColor: "#333",
            titleFont: {
              size: 14,
              weight: 'bold',
            },
            bodyFont: {
              size: 12,
            },
            bodySpacing: 5,
            padding: 10,
          },
        },
      },
    };
  },
  computed: {
    chartData() {
      const data = this.getDataByRange(this.activeRange);
      return {
        labels: data.labels,
        datasets: [
          {
            label: `${this.getLabelByRange(this.activeRange)} 검사 갯수`,
            data: data.values,
            backgroundColor: "rgba(66, 165, 245, 0.3)",
            borderColor: "#42A5F5",
            pointBackgroundColor: "#ffffff",
            pointBorderColor: "#42A5F5",
            pointRadius: 5,
            pointHoverRadius: 7,
            tension: 0.4,
            fill: true,
          },
        ],
      };
    },
  },
  methods: {
    setActiveRange(range) {
      this.activeRange = range;
    },
    getLabelByRange(range) {
      switch (range) {
        case "day":
          return "최근 24시간";
        case "week":
          return "이번 주";
        case "month":
          return "최근 6개월";
        default:
          return "";
      }
    },
    getDataByRange(range) {
      const now = new Date();
      let labels = [];
      let values = [];

      if (range === "day") {
        // 최근 24시간 데이터 (1시간 간격)
        for (let i = 23; i >= 0; i--) {
          const hour = new Date(now);
          hour.setHours(now.getHours() - i);
          labels.push(`${hour.getHours()}시`);
          values.push(Math.floor(Math.random() * 100) + 1); // 임시 데이터
        }
      } else if (range === "week") {
        // 오늘 날짜부터 시작하여 이전 6일간의 데이터 생성
        for (let i = 0; i < 7; i++) {
          const day = new Date(now);
          day.setDate(now.getDate() - i);
          labels.unshift(`${day.getMonth() + 1}월 ${day.getDate()}일`); // 오른쪽에 오늘 날짜가 오도록
          values.unshift(Math.floor(Math.random() * 500) + 100); // 임시 데이터
        }
      } else if (range === "month") {
        // 최근 6개월 데이터
        for (let i = 5; i >= 0; i--) {
          const month = new Date(now);
          month.setMonth(now.getMonth() - i);
          labels.push(`${month.getFullYear()}-${month.getMonth() + 1}`);
          values.push(Math.floor(Math.random() * 1000) + 200); // 임시 데이터
        }
      }

      return { labels, values };
    },
  },
};
</script>

<style scoped>
.time-range-chart {
  max-width: 100%; /* 가로 크기를 더 적당하게 조정 */
  height: 450px;
  width: 90%;    
  margin: 50px auto;
  padding: 20px;
  border-radius: 15px;
  /* background-color: #ffffff; */
  /* box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1); */
}

.button-group {
  display: flex;
  justify-content: center;
  margin-top: 2%;
  gap: 10px;
}

button {
  padding: 12px 20px;
  font-size: 15px;
  cursor: pointer;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: all 0.3s;
}

button:hover {
  background-color: #e0e0e0;
  transform: translateY(-3px);
}

button.active {
  background-color: #42a5f5;
  color: #fff;
  border-color: #42a5f5;
}

.chart-container {
  /* padding: 30px; */
  height: 350px; 
  width: 100%;
}
</style>