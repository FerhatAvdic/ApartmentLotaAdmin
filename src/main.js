// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from './components/firebaseInit'
import VueResource from 'vue-resource'
import VueClipboard from 'vue-clipboard2'
 
Vue.use(VueClipboard)

Vue.config.productionTip = false
Vue.use(VueResource)

const gooogleApiUrl = "https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com"


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
        /*this.$http.get(gooogleApiUrl).then(response => {
          //get max-age from cache control in header
          const maxAgeStr = response.headers.get('cache-control').split(', ').filter(s => s.includes('max-age'))[0]
          const maxAge = parseInt(maxAgeStr.substring(maxAgeStr.indexOf('=') + 1))
          console.log(maxAge)
          localStorage.setItem('maxAge', maxAge)
      
        }, response => {
          // error callback
        })*/
  },
  template: '<App/>',
  components: { App }
})
