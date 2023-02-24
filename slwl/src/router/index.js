import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  { path: '/login', component: () => import('@/views/login') },
  {
    path: '/',redirect: '/dashboard', component: () => import('@/views/layout'),
children:[{ path: '/branches/organization-manage', component: () => import('@/views/organization-manage') },
    { path: '/branches/institutions-jobs-area', component: () => import('@/views/institutions-jobs-area') },
  { path: '/transit/freight-manage', component: () => import('@/views/freight-manage') },
  { path: '/dashboard', component: () => import('@/views/dashboard') },
  { path: '/transit/car-models', component: () => import('@/views/transit/car-models') },
  { path: '/transit/vehicle', component: () => import('@/views/transit/vehicle') },
  { path: '/transit/car-register', component: () => import('@/views/transit/car-register') },]
 },]

const router = new VueRouter({ 
  routes
})

export default router
