<template>
  <div id="Panel">
    <Navbar />
       <router-view></router-view>
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
     
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#Panel{
    height:100%;
    
}

</style>
