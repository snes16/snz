import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ArchitectureView from '../views/ArchitectureView.vue'
import InteriorView from '../views/InteriorView.vue'
import LandscapeView from '../views/LandscapeView.vue'
import ContactsView from '../views/ContactsView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
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
      component: ContactsView
    }
  ]
})

export default router
