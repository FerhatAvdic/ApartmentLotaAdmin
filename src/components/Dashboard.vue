<template>
  <div id="Dashboard" class="valign-wrapper center-align">
      <div class="full-width text-teal"><h2>Welcome to Admin Panel</h2></div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data () {
    return {
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#Dashboard{
  height: calc(100vh - 65px);
}
.full-width{
  width:100%;
}
.text-teal{
  color: teal;
  text-shadow: 2px 2px 2px rgba(0,0,0,0.2);
}
</style>
