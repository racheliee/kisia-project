import { createRouter, createWebHistory } from 'vue-router';
import DashboardPage from '@/pages/DashboardPage.vue';
import UserDashboardPage from '@/pages/UserDashboardPage.vue';
import LoginPage from '@/pages/LoginPage.vue';
import SignupPage from '@/pages/SignupPage.vue'; // SignupPage 컴포넌트 추가

const routes = [
  {
    path: '/',
    name: 'LoginPage',
    component: LoginPage,
  },
  {
    path: '/AdminDashboard',
    name: 'DashboardPage',
    component: DashboardPage,
    meta: { requiresAuth: true }, // 인증이 필요한 페이지로 설정
  },
  {
    path: '/UserDashboard',
    name: 'UserDashboardPage',
    component: UserDashboardPage,
    meta: { requiresAuth: true }, // 인증이 필요한 페이지로 설정
  },
  {
    path: '/SignupPage',
    name: 'SignupPage',
    component: SignupPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 라우터 가드 추가 - 인증이 필요한 페이지 접근 제어
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('access_token'); // 토큰 존재 여부 확인

  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    // 인증이 필요한 페이지에 비로그인 상태로 접근 시 로그인 페이지로 리디렉션
    next({ name: 'LoginPage' });
  } else {
    next();
  }
});

export default router;
