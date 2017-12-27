<template>
  <div id="Panel">
    <nav class=" teal darken-1">
      <div class="container">
        <div class="nav-wrapper">
          <router-link to="/panel" class="brand-logo">
            Apartment Lota
          </router-link>
        <ul class="right hide-on-med-and-down">
          <li><router-link to="/reviews">Reviews</router-link></li>
          <li><router-link to="/gallery">Gallery</router-link></li>
          <li><router-link to="/posts">Posts</router-link></li>
          <li><button class="btn waves-effect waves-light white teal-text" type="submit" @click="firebaseLogout" name="action">Logout</button></li>
        </ul>
      </div>
      </div>
    </nav>
     <div class="container" id="panel-children">
       <router-view></router-view>
     </div>
  </div>
</template>

<script>
import firebase from './firebaseInit'
export default {
  name: 'Panel',
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
