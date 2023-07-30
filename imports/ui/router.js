import { createRouter, createWebHistory } from 'vue-router'
import Home from './Home.vue'



export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./LoginForm.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./RegisterForm.vue'),
    },
    {
      path: '/index',
      name: 'landingpage',
      component: () => import('./LandingPage.vue'),
      meta:{requiresAuth:true},
    },
  ],
})

// Add a global navigation guard to check if the user is logged in before accessing the route
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !Meteor.userId()) {
    // Redirect to the login page if the route requires authentication and the user is not logged in
    next('/');
  } else {
    // Allow access to the route
    next();
  }
});
