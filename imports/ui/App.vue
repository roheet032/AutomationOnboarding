
<template>
  <div>
    
    
    <router-view />
  </div>
</template>


<script>
import { createHydrationRenderer, onMounted } from 'vue'
import { initFlowbite } from 'flowbite'
import { RegisterCollection } from '../api/Collection/RegisterCollection';

export default{

  setup()
  { onMounted(() => {
    initFlowbite();
  })},
 
  meteor:{
    register(){
      return RegisterCollection.find({}).fetch()
    }
  }
}
</script>
<style scoped>
</style>

