<template>
  <div id="Gallery">
        <div class="row">
            <div class="col m6 s12">
                <div class="card blue-grey darken-1">
                    <form>
                        <div class="card-content white-text">
                        <span class="card-title">Select Photo Folder</span>
                        <div class="row">
                            <div class="browser-default col s12">
                                <select v-model="selectedPath" required>
                                    <option value="" disabled selected>Choose your option</option>
                                    <option value="homePhotos">Homepage</option>
                                    <option value="postPhotos">News Feed</option>
                                </select>
                            </div>
                        </div>
                        <div class="file-field input-field">
                            <div class="btn">
                                <span>File</span>
                                <input type="file" multiple accept="image/*" @change="processFiles($event)" required>
                            </div>
                            <div class="file-path-wrapper">
                                <input class="file-path validate white-text" type="text">
                            </div>
                        </div>
                    </div>
                    <div class="card-action">
                        <button type="submit" @click="uploadPhotos()" class="waves-effect waves-light btn">Upload</button>
                    </div>
                    </form>
                </div>
                
            </div>
        </div>
            
        <div class="row">
            <h3>News Feed</h3>
            <div class="col s12">
                    <div class="card">
                        <table class="table-responsive highlight">
                        <thead>
                            <tr><th>Name</th><th>Path</th><th>Preview</th><th>Options</th></tr>
                        </thead>
                        <tbody>
                            <tr v-for="photo in postPhotos" v-bind:key="photo.url">
                                <td>{{photo.name}}</td>
                                <td>{{photo.path}}</td>
                                <td><img :src="photo.url" class="preview"></td>
                                <td><i class="fa fa-times pointer" @click="deletePhoto(photo, 'postPhotos')"></i></td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
            </div>
        </div>
        <div class="row">
        <h3>Homepage</h3>
            <div class="col s12">
                <div class="card">
                    <table class="table-responsive highlight">
                    <thead>
                        <tr><th>Name</th><th>Path</th><th>Preview</th><th>Options</th></tr>
                    </thead>
                    <tbody>
                        <tr v-for="photo in homePhotos" v-bind:key="photo.url">
                                <td>{{photo.name}}</td>
                                <td>{{photo.path}}</td>
                                <td><img :src="photo.url" class="preview"></td>
                                <td><i class="fa fa-times pointer" @click="deletePhoto(photo, 'homePhotos')"></i></td>
                        </tr>
                        </tbody>
                </table>
                </div>
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
      postPhotos:[],
      selectedPath: ""
    }
  },
  methods:{
    listPhotos(){
        this.homePhotos=[]
        this.postPhotos=[]
        db.collection("homePhotos").get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        const homePhoto = {
                            'id': doc.id,
                            'name': doc.data().name,
                            'path':doc.data().path,
                            'url':doc.data().url
                        }
                        this.homePhotos.push(homePhoto)
                        console.log("photos", homePhoto)
                    });
        });
        db.collection("postPhotos").get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        const postPhoto = {
                            'id': doc.id,
                            'name': doc.data().name,
                            'path':doc.data().path,
                            'url':doc.data().url
                        }
                        this.postPhotos.push(postPhoto)
                        console.log("photos", postPhoto)
                    });
        });  
    },
    processFiles(event) {
        this.photosToUpload = event.target.files
    },
    uploadPhotos(){
        const ref = this.selectedPath
        Array.from(this.photosToUpload).forEach(photo => { 
            var uploadTask = storageRef.child(ref +"/"+ photo.name).put(photo);
            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            uploadTask.on('state_changed', function(snapshot){
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            
            }, error => {
            // Handle unsuccessful uploads
            }, () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            var downloadURL = uploadTask.snapshot.downloadURL;
            // Add a new document with a generated id.
            var photoObj ={
                url: downloadURL,
                path: ref + "/" + photo.name,
                name: photo.name
            }
            db.collection(ref).add(photoObj)
                    .then(docRef=> {
                        this.listPhotos()
                        console.log("Document written with ID: ", docRef.id);
                    })
                    .catch(error=> {
                        console.error("Error adding document: ", error);
                })
            })
         })
    },
    deletePhoto(photo, collection){
        if(confirm('Are you sure?')){
            var desertRef = storageRef.child(photo.path);
            // Delete the file
            desertRef.delete().then(function() {
            // File deleted successfully
            }).catch(function(error) {
            // Uh-oh, an error occurred!
            })
            db.collection(collection).doc(photo.id).delete()
                .then(data => {
                    this.listPhotos()
                    console.log("Document successfully deleted!");
                }).catch(error => {
                    console.error("Error removing document: ", error);
            })
        }
        
    }
    },
    created(){
        this.listPhotos()
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
    select{
        display:block;
    }
</style>
