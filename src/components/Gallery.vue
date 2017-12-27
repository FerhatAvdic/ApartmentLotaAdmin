<template>
  <div id="Gallery">
        <div class="row">
            <div class="col m6 s12">
                <div class="card blue-grey darken-1">
                    <div class="card-content white-text">
                        <span class="card-title">News Feed</span>
                        <input type="file" multiple accept="image/*" @change="processFiles($event)">
                    </div>
                    <div class="card-action">
                        <button @click="uploadPhotos('posts/')" class="waves-effect waves-light btn">Upload</button>
                    </div>
                </div>
                <table class="table-responsive highlight">
           <thead><tr><th>Name</th><th>Path</th><th>Preview</th><th>Options</th></tr></thead>
           <tbody>
               <tr v-for="photo in postPhotos" v-bind:key="photo.url">
                    <td>{{photo.name}}</td>
                    <td>{{photo.path}}</td>
                    <td><img :src="photo.url" class="preview"></td>
                    <td><i class="fa fa-times pointer" @click="deletePhoto(photo)"></i></td>
               </tr>
            </tbody>
       </table>
                
            </div>
            <div class="col m6 s12">
                 <div class="card blue-grey darken-1">
                    <div class="card-content white-text">
                        <span class="card-title">Homepage</span>
                        <input type="file" multiple accept="image/*" @change="processFiles($event)">
                    </div>
                    <div class="card-action">
                        <button @click="uploadPhotos('home/')" class="waves-effect waves-light btn">Upload</button>
                    </div>
                </div>
                <table class="table-responsive highlight">
           <thead><tr><th>Name</th><th>Path</th><th>Preview</th><th>Options</th></tr></thead>
           <tbody>
               <tr v-for="photo in homePhotos" v-bind:key="photo.url">
                    <td>{{photo.name}}</td>
                    <td>{{photo.path}}</td>
                    <td><img :src="photo.url" class="preview"></td>
                    <td><i class="fa fa-times pointer" @click="deletePhoto(photo)"></i></td>
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
const storageRef = firebase.storage().ref()
const imagesRef = storageRef.child('home')

export default {
  name: 'Gallery',
  data () {
    return {
      photosToUpload: [],
      homePhotos: [],
      postPhotos:[]
    }
  },
  methods:{
    processFiles(event) {
        this.photosToUpload = event.target.files
    },
    uploadPhotos(ref){
        Array.from(this.photosToUpload).forEach(photo => { 
            var uploadTask = storageRef.child(ref + photo.name).put(photo);
            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            uploadTask.on('state_changed', function(snapshot){
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            
            }, function(error) {
            // Handle unsuccessful uploads
            }, function() {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            var downloadURL = uploadTask.snapshot.downloadURL;
            // Add a new document with a generated id.
            var photoObj ={
                url: downloadURL,
                path: ref + photo.name,
                name: photo.name
            }
            switch(ref)
            {
                case 'home/':
                    db.collection("homePhotos").add(photoObj)
                        .then(function(docRef) {
                            console.log("Document written with ID: ", docRef.id);
                        })
                        .catch(function(error) {
                            console.error("Error adding document: ", error);
                    })
                break;
                case 'posts/':
                    db.collection("postPhotos").add(photoObj)
                        .then(function(docRef) {
                            console.log("Document written with ID: ", docRef.id);
                        })
                        .catch(function(error) {
                            console.error("Error adding document: ", error);
                    })
                break;
                default: break;
            }
            
            })
         })
    },
    deletePhoto(photo){
        if(confirm('Are you sure?')){
            var desertRef = storageRef.child(photo.path);
            // Delete the file
            desertRef.delete().then(function() {
                
            // File deleted successfully
            db.collection('homePhotos').where('url','==',photo.url).get()
                .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    doc.ref.delete().catch(error=>{
                        console.log("error",error)
                    })
                })
            })
            }).catch(function(error) {
            // Uh-oh, an error occurred!
            });
            
        }
        
    }
    },
    created: function () {
        db.collection("homePhotos").get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        this.homePhotos.push(doc.data())
                        console.log("photos",doc.data())
                    });
        });
        db.collection("postPhotos").get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        this.postPhotos.push(doc.data())
                        console.log("photos",doc.data())
                    });
        });
    }  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .preview{
        max-width:50px;
        max-height:50px;
    }
    .pointer{
        cursor: pointer;
    }
</style>
