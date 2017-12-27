<template>
  <div id="Posts">

    <form>
      <div class="row">
        <div class="col s12 m6">
          <div class="card blue-grey darken-1">
            <div class="card-content white-text">
              <div class="row">
                <div class="input-field col s12">
                  <input v-model="title" id="title" type="text" class="validate white-text" required>
                  <label for="title" class="white-text">Post Title</label>
                </div>
              </div>
              <div class="row">
                <div class="input-field col s12">
                  <textarea v-model="body" id="body" class="validate white-text" required></textarea>
                  <label for="body" class="white-text">Textarea</label>
                </div>
              </div>
            </div>
            <div class="card-action right-align">
              
              <button class="waves-effect waves-teal btn-flat pointer white-text" type="button" @click="cancelPost">Cancel</button>
              <button v-if="!editOn" class="waves-effect waves-light btn pointer" type="submit" @click="createPost">Post</button>
              <button v-if="editOn" class="waves-effect waves-light btn pointer" type="submit" @click="updatePost">Update</button>
            </div>
          </div>
        </div>
      </div>
      </form>
            <div class="row">
              <div class="col s12">
                <table class="table-responsive highlight">
           <thead><tr><th>CreatedAt</th><th>Title</th><th>Body</th><th>Options</th></tr></thead>
           <tbody>
               <tr v-for="post in posts" v-bind:key="post.id">
                    <td>{{post.createdAt.toString()}}</td>
                    <td>{{post.title}}</td>
                    <td>{{post.body}}</td>
                    <td><i class="fa fa-pencil pointer" @click="startEdit(post)"></i> <i class="fa fa-times pointer" ></i></td>
               </tr>
            </tbody>
       </table>
              </div>
            </div>
  </div>
</template>

<script>
import firebase from './firebaseInit'
import 'firebase/firestore'
const db = firebase.firestore()

export default {
  name: 'Posts',
  data () {
    return {
      posts:[],
      title: null,
      body: null,
      createdAt: null,
      docId:null,
      editOn:false
    }
  },
  methods:{
    createPost(){
      db.collection('posts').add({
        title: this.title,
        body: this.body,
        createdAt: new Date()
      })
      .then(docRef => console.log(docRef))
      .catch(error => console.log(err))
    },
    cancelPost(){
      this.title=null,
      this.body=null
    },
    startEdit(post){
      this.editOn=true
      this.title=post.title
      this.body=post.body
      this.createdAt=post.createdAt
      this.docId=post.id
    },
    updatePost(){
      const docRef = db.collection('posts').doc(this.docId)
      console.log(docRef)
      docRef.set({
          title: this.title,
          body: this.body,
          createdAt: this.createdAt,
          editedAt: new Date()
        })
        .then( (doc)=> {

            console.log("Document successfully written!", doc);
            this.cancelPost()
        })
        .catch(()=> {
            console.error("Error writing document: ", error);
      })
    }
  },
  created(){
    db.collection('posts').orderBy('createdAt').get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
              const data = {
                  'id': doc.id,
                  'title': doc.data().title,
                  'body':doc.data().body,
                  'createdAt':doc.data().createdAt
              }
              this.posts.push(data)
          })
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pointer{
  cursor:pointer;
}
</style>
