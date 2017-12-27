import Vue from 'vue'
import Router from 'vue-router'
import VueJWT from 'vuejs-jwt'
import firebase from '@/components/firebaseInit'
import secretKey from '@/components/secretKey'
import Panel from '@/components/Panel'
import Dashboard from '@/components/Dashboard'
import Reviews from '@/components/Reviews'
import Gallery from '@/components/Gallery'
import Posts from '@/components/Posts'
import Login from '@/components/Login'

Vue.use(Router)
Vue.use(VueJWT)

const router = new Router({
  routes: [
    {
      path: '/',
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
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!firebase.auth().currentUser)
      if(to.path !== '/')
         router.push('/')
      else
         next()
  else {
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
      const payload = Vue.$jwt.decode(idToken, secretKey)
      const currentTime = parseInt(new Date().getTime() / 1000)
      if(payload.exp > currentTime)
        next()
      else
        router.push('/')
      }).catch(function(error) {
        // Handle error
      });
      
  }
})

export default router
