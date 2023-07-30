<script>

import { RegisterCollection } from '../api/RegisterCollection';

export default{
  meteor:{
    register(){
      return RegisterCollection.find({}).fetch()
    }
  }
}
// export default {
//   data() {
//     return {
//       user: null,
//     }
//   },
//   created() {
//     Tracker.autorun(()=>{
//       this.user = Meteor.user();
//       console.log(this.user);
//     }) 
//   },
// }
</script>

<template>
  <div class="p-8">
    
    <router-view />
  </div>
</template>
