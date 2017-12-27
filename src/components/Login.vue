<template>
  <div id="Login" class="valign-wrapper">
    <div class="container">
         <div class="row">
            <div class="col m4 offset-m4 s12" >
                <form @submit.prevent="firebaseLogin">
                    <div class="card">
                        <div class="card-content teal darken-1 white-text center-align">

                        <span class="card-title">Apartment Lota Admin</span>
                        </div>
                        <div class="card-content">
                        
                        <div class="row">
                            <div class="input-field col m10 offset-m1 s12">
                                <input v-model="email" id="email" type="email" class="validate" required>
                                <label for="email">Email</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col m10 offset-m1 s12">
                                <input v-model="password" id="password" type="password" class="validate" required>
                                <label for="password">Password</label>
                            </div>
                        </div>
                        </div>
                        <div class="card-action center-align">
                            <button class="btn waves-effect waves-light teal darken-1" type="submit" name="action">Login</button>
                        </div>
                    </div>
                </form>
               
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import firebase from './firebaseInit'
import router from '../router'
export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
      logged:null,
      user: null
    };
  },
  methods:{
      
      firebaseLogin(){
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then((user)=>{
            
            router.push('/panel')
        })
        .catch((error)=> {
                // Handle Errors here.
                var errorCode = error.code
                var errorMessage = error.message
                // ...
                console.log("error code:", errorCode, "error message", errorMessage)
        });
      }
      
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#Login{
    height:100%;
}

/* label focus color */
 .input-field input:focus + label {
   color: #00897b !important;
 }
 /* label underline focus color */
 .row .input-field input:focus {
   border-bottom: 1px solid #00897b !important;
   box-shadow: 0 1px 0 0 #00897b !important
 }

</style>
