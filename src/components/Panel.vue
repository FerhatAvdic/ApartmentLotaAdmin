<template>
  <div id="Panel">
    <Navbar />
     <div class="container" id="panel-children">
       <router-view></router-view>
     </div>
  </div>
</template>

<script>
import firebase from './firebaseInit'
import Navbar from './Navbar'
export default {
  name: 'Panel',
  components:{
    Navbar
  },
  data () {
    return {
      
    }
  },
  methods:{
      firebaseLogout(){
        firebase.auth().signOut().then(()=> {
        // Sign-out successful.
        }).catch(function(error) {
        // An error happened.
        });
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#Panel, #panel-children{
    height:100%;
}

</style>
