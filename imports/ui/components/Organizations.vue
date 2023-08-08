<template>

  <Sidebar />
  

<div class="main-content" >

  
        <h2>This is my Organization page</h2>
        <p>I want to write things to this organizations</p>
        
        

</div>

        
 
 
</template>
<script>

import Sidebar from "./../Sidebar.vue";
export default{
 
  components:{
   Sidebar
  }
}
</script>
<style>

/* <!--this css style will make the main content between sidebar and navbar--> */
.main-content{
  position: fixed; 
  right:500px;
  top:50px; 


  
}
</style>