<template>
  <div id="Reviews">
      <div class="card">
        <div class="card-content teal darken-1 white-text center-align">

        <span class="card-title">Parse Data from Booking.com</span>
        </div>
        <div class="card-content">
          <h3>Instructions</h3>
          <ul>
            <li>1. Run parse session to crawl booking.com for new info</li>
            <li>2. You will receive an email when the session has ended</li>
            <li>3. Get Data to save parsed info to database</li>
          </ul>
          <div v-if="parsingStartedAt">
            <p>Parsing started at: {{parsingStartedAt.toString()}}</p>
            <p>You will receive an email shortly</p>
          </div>
        </div>
        <div class="card-content">
          <p v-if="!parsedData">No data parsed</p>
        <div v-if="parsedData">
           <div class="row">
              <div class="col s12">
                <table class="table-responsive highlight">
           <thead><tr><th>Profile</th><th>Name</th><th>Country</th><th>Reviews</th><th>Posted At</th><th>Positive</th><th>Negative</th></tr></thead>
           <tbody>
               <tr v-for="r in parsedData" v-bind:key="r.username">
                    <td><img :src="r.profile"></td>
                    <td>{{r.name}}</td>
                    <td>{{r.country}}</td>
                    <td>{{r.reviewCount}}</td>
                    <td>{{r.dateOfReview}}</td>
                    <td>{{r.posReview}}</td>
                    <td>{{r.negReview}}</td>
               </tr>
            </tbody>
       </table>
              </div>
            </div>
        </div>
        </div>
        <div class="card-action center-align">
            <button class="btn waves-effect waves-light teal darken-1" type="submit" @click="runParseSession">Run Parse Session</button>
            <button class="btn waves-effect waves-light teal darken-1" type="submit" @click="getData">Get Data</button>
        </div>
    </div>
  </div>
</template>

<script>
const apiKey = "tU323y19tgeq"
const projectToken = "tv-mhT6bCWX1"
export default {
  name: 'Reviews',
  data () {
    return {
      parsedData:null,
      parsingStartedAt:null
    }
  },
  methods:{
    runParseSession(){
      //console.log(JSON.stringify('api_key': apiKey))
      //console.log(encodeURIComponent(JSON.stringify({'api_key': apiKey})))
      //const reqBody = encodeURIComponent(JSON.stringify({'api_key': apiKey}))
      const reqBody = "api_key="+apiKey+"&send_email=1"
      this.$http.post('https://cors-anywhere.herokuapp.com/https://www.parsehub.com/api/v2/projects/'+projectToken+'/run', 
      reqBody,
      {headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        //'Accept-Charset': 'utf-8',
        'X-Requested-With': 'XMLHttpRequest'
        }
      }).then(response => {
        this.parsingStartedAt = response.body.start_time
        console.log(response.body)
        
      }, response => {
        console.log(response)
        // error callback
      })
    },
    getData(){
      this.$http.get('https://cors-anywhere.herokuapp.com/https://www.parsehub.com/api/v2/projects/'+projectToken+'/last_ready_run/data',
      {params:  {'api_key': apiKey}},
      {headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Requested-With': 'XMLHttpRequest'
        }
      }).then(response => {
        console.log("data", response.body)
        this.parsedData = response.body.reviews;
        // success callback
      }, response => {
        console.log("res", response)
        // error callback
      });
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
