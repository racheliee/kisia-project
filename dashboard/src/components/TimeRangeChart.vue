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
import axios from "axios";

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
        { label: "시간", value: "hour" },
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
              weight: "bold",
            },
            bodyFont: {
              size: 12,
            },
            bodySpacing: 5,
            padding: 10,
          },
        },
      },
      chartData: {
        labels: [],
        datasets: [
          {
            label: "",
            data: [],
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
      },
    };
  },
  watch: {
    activeRange: "fetchChartData",
  },
  methods: {
    setActiveRange(range) {
      this.activeRange = range;
    },
    async fetchChartData() {
      try {
        const response = await axios.get(
          `/admin/total-requests?interval=${this.activeRange}`
        );
        const data = response.data.data;

        let labels = [];
        let values = [];

        data.forEach((item) => {
          if (this.activeRange === "hour") {
            labels.push(item.hour);
          } else if (this.activeRange === "day") {
            labels.push(item.day);
          } else if (this.activeRange === "week") {
            labels.push(item.week);
          } else if (this.activeRange === "month") {
            labels.push(item.month);
          }
          values.push(item.count);
        });

        this.chartData = {
          labels,
          datasets: [
            {
              label: `${this.getLabelByRange(this.activeRange)} 검사 갯수`,
              data: values,
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
      } catch (error) {
        console.error("Failed to fetch chart data", error);
        // 임시 데이터 사용
        this.chartData = this.getTempDataByRange(this.activeRange);
      }
    },
    getLabelByRange(range) {
      switch (range) {
        case "hour":
          return "지난 24시간";
        case "day":
          return "지난 7일";
        case "week":
          return "최근 8주";
        case "month":
          return "최근 6개월";
        default:
          return "";
      }
    },
    getTempDataByRange(range) {
      const now = new Date();
      let labels = [];
      let values = [];

      if (range === "hour") {
        for (let i = 23; i >= 0; i--) {
          const hour = new Date(now);
          hour.setHours(now.getHours() - i);
          if (
            now.getHours() - i == 3 ||
            now.getHours() - i == 4 ||
            now.getHours() - i == 5 ||
            now.getHours() - i == 6 ||
            now.getHours() - i == 7 ||
            now.getHours() - i == 8
          ) {
            labels.push(`${hour.getHours()}시`);
            values.push(0); // 임시 데이터
          } else {
            labels.push(`${hour.getHours()}시`);
            values.push(Math.floor(Math.random() * 5)); // 임시 데이터
          }
        }
      } else if (range === "day") {
        for (let i = 0; i < 7; i++) {
          const day = new Date(now);
          day.setDate(now.getDate() - i);
          labels.unshift(`${day.getMonth() + 1}월 ${day.getDate()}일`);
          values.unshift(Math.floor(Math.random() * 10)); // 임시 데이터
        }
      } else if (range === "week") {
        for (let i = 7; i >= 0; i--) {
          const weekStart = new Date(now);
          weekStart.setDate(now.getDate() - i * 7);
          const weekEnd = new Date(weekStart);
          weekEnd.setDate(weekStart.getDate() + 6);
          labels.push(
            `${weekStart.getMonth() + 1}/${weekStart.getDate()} - ${
              weekEnd.getMonth() + 1
            }/${weekEnd.getDate()}`
          );
          values.push(Math.floor(Math.random() * 20)); // 임시 데이터
        }
      } else if (range === "month") {
        // for (let i = 2; i >= 0; i--) {
        //   const month = new Date(now);
        //   month.setMonth(now.getMonth() - i);
        //   labels.push(`${month.getFullYear()}-${month.getMonth() + 1}`);
        //   values.push(Math.floor(Math.random() * 100)); // 임시 데이터
        // }
        const month = new Date(now);
        month.setMonth(now.getMonth() - 0);
        labels.push(`${month.getFullYear()}-${month.getMonth() + 1}`);
        values.push(8); // 임시 데이터
        month.setMonth(now.getMonth() - 1);
        labels.push(`${month.getFullYear()}-${month.getMonth() + 1}`);
        values.push(30); // 임시 데이터
        month.setMonth(now.getMonth() - 2);
        labels.push(`${month.getFullYear()}-${month.getMonth() + 1}`);
        values.push(21); // 임시 데이터
      }

      return {
        labels,
        datasets: [
          {
            label: `${this.getLabelByRange(range)} 검사 갯수`,
            data: values,
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
  mounted() {
    this.fetchChartData();
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
  height: 350px;
  width: 100%;
}
</style>
