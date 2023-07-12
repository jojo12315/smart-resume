import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/Manage.vue'
import Manage from "@/views/Manage.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Manage',
    component: () => import(/* webpackChunkName: "about" */ '../views/Manage.vue'),
    redirect:'home',
    children:[
      {path: 'resume', name: 'Resume',component: () => import('../views/Resume.vue')},
      {path: 'home', name: 'Home',component: () => import('../views/Home.vue')},
      {path: 'statisticsView', name: 'StatisticsView',component: () => import('../views/StatisticsView.vue')},
      {path: 'resumeAnalysis', name: 'ResumeAnalysis',component: () => import('../views/ResumeAnalysis.vue')},
      {path: 'resumeView', name: 'resumeView',component: () => import('../views/ResumeView.vue')},
      {path: 'matchingView', name: 'matchingView',component: () => import('../views/MatchingView.vue')},
    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router