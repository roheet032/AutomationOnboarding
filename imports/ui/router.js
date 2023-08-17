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
    {
      path: '/contacts',
      name: 'contacts',
      component: () => import('./components/Contacts.vue'),
      meta:{requiresAuth:true},
    },
    {
      path: '/organizations',
      name: 'organizations',
      component: () => import('./components/Organizations.vue'),
      meta:{requiresAuth:true},
    },
    {
      path: '/tags',
      name: 'tags',
      component: () => import('./components/Tags.vue'),
      meta:{requiresAuth:true},
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('./components/Users.vue'),
      meta:{requiresAuth:true},
    },
  
    // {
    //   path: '/sidebar',
    //   name: 'sidebar',
    //   component: () => import('./Sidebar.vue'),
    // },
    
  ],
})

// Add a global navigation guard to check if the user is logged in before accessing the route
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !Meteor.userId()) {
    // Redirect to the login page if the route requires authentication and the user is not logged in
    next('/login');
  } else {
    // Allow access to the route
    next();
  }
});
