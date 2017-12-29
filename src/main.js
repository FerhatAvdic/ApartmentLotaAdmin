// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from './components/firebaseInit'
import VueResource from 'vue-resource'
import materialize from 'materialize-css'
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(materialize)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  created(){
    //On logout/token expired go to login page
        firebase.auth().onAuthStateChanged((user)=> {
            if (user) {
              
            } else {
              router.push('/')
            }
        })
  },
  template: '<App/>',
  components: { App }
})
