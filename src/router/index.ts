import { createRouter, createWebHistory } from 'vue-router'
import ArchitectureView from '../views/ArchitectureView.vue'
import InteriorView from '../views/InteriorView.vue'
import LandscapeView from '../views/LandscapeView.vue'
import ContactView from '../views/ContactView.vue'
import AboutView from '../views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AboutView
    },
    {
      path: '/architecture',
      name: 'architecture',
      component: ArchitectureView
    },
    {
      path: '/interior',
      name: 'interior',
      component: InteriorView
    },
    {
      path: '/landscape',
      name: 'landscape',
      component: LandscapeView
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: ContactView
    },
  ]
})

export default router
