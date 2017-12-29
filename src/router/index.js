import Vue from 'vue'
import Router from 'vue-router'
import firebase from '@/components/firebaseInit'
import Panel from '@/components/Panel'
import Dashboard from '@/components/Dashboard'
import Reviews from '@/components/Reviews'
import Gallery from '@/components/Gallery'
import Posts from '@/components/Posts'
import Login from '@/components/Login'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/panel',
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/panel',
      component: Panel,
      children: [
        {
          path: '/',
          component: Dashboard
        },
        {
            path: '/reviews',
            component: Reviews
        },
        {
            path: '/gallery',
            component: Gallery
        },
        {
            path: '/posts',
            component: Posts
        }
      ],
      meta:{
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to,from,next)=>{
  const currentUser = firebase.auth().currentUser
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if(requiresAuth && !currentUser) next('login')
  else if (!requiresAuth && currentUser) next('panel')
  else next()
})

export default router
