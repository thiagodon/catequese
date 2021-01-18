import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'
require('firebase/auth');

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'recadastramento',
    component: () => import('../components/HelloWorld.vue')
  },
  {
    path: '/cadastrar',
    name: 'signup',
    component: () => import('../components/Signup.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/Login.vue')
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('../components/ForgotPassword.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../components/Home.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/locais',
    name: 'locations',
    component: () => import('../components/locations/LocationsList.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/niveis-maiores',
    name: 'groups',
    component: () => import('../components/levels/GroupsList.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/niveis',
    name: 'levels',
    component: () => import('../components/levels/LevelsList.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/dias',
    name: 'days',
    component: () => import('../components/days/DaysList.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/catequistas',
    name: 'catechists',
    component: () => import('../components/catechists/CatechistsList.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/catequizandos',
    name: 'catechizings',
    component: () => import('../components/catechizings/CatechizingsList.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/salas',
    name: 'rooms',
    component: () => import('../components/rooms/RoomsList.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/turmas',
    name: 'classes',
    component: () => import('../components/classes/ClassesList.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/matriculas',
    name: 'enrollments',
    component: () => import('../components/catechizings/EnrollmentsStart.vue'),
    meta: {
      requiresAuth: true
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const currentUser = firebase.auth().currentUser

  if (requiresAuth && !currentUser) next({ path: '/login', query: { redirect: to.fullPath } })
  else next()
})

export default router