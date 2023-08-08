<!-- <template>
<Sidebar />
<div class="main-content">I will write my tag content here

</div>

</template>

<script>
import Sidebar from "./../Sidebar.vue"
export default {
    name: "Tags",

    components: {
        Sidebar
    },

};
</script>

<style>

</style> -->
<template>
    <Sidebar />
    <div class="main-content">
        <div>
            <button class="button" @click="showModal = true">
                Add Tags
            </button>
            <transition name="fade" appear>
                <div class="modal-overlay" v-if="showModal" @click="showModal = false"></div>
            </transition>
            <transition name="slide" appear>
                <div class="modal" v-if="showModal">

                    <form>
                        <h2>Add Tags</h2>
                        <label for="fullName">Tag Name:</label>
                        <input type="text" id="fullName" required><br>

                        <button class="button-save" @click="showModal = true">
                            Save
                        </button><br>
                        <button class="button-cancel" @click="showModal = false">
                            Cancel
                        </button>
                    </form>

                </div>
            </transition>
        </div>
        
         
    </div>
</template>

<script>
import Sidebar from "./../Sidebar.vue"
export default {
    name: "Tags",

    components: {
        Sidebar
    },
    data(){   return {
   showModal: false,
  }}

}
</script>
<style>
* {
 margin: 0;
 padding: 0;
 box-sizing: border-box;
}

.main-content{
  position: absolute; 
  right:200px;
  top:100px; 

}

.button {
 appearance: none;
 outline: none;
 border: none;
 background: none;
 cursor: pointer;

 display: inline-block;
 padding: 15px 25px;
 background-image: linear-gradient(to right, #CC2E5D, #FF5858);
 border-radius: 8px;

 color: #FFF;
 font-size: 18px;
 font-weight: 700;

 box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
 transition: 0.4s ease-out;

}

.modal-overlay {
 position: absolute;
 top: 0;
 left: 0;
 right: 0;
 bottom: 0;
 z-index: 1;
 background-color: rgba(0, 0, 0, 0.3);
 position: absolute; 
 right:150px;

}

.modal {
 position: fixed;
 top: 50%;
 left: 50%;
 transform: translate(-50%, -50%);
 z-index: 1;

 width: 100%;
 max-width: 400px;
 background-color: #FFF;
 border-radius: 16px;
 padding: 100px;

}

.fade-enter-active,
.fade-leave-active {
 transition: opacity .5s;
}

.fade-enter,
.fade-leave-to {
 opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
 transition: transform .5s;
}

.slide-enter,
.slide-leave-to {
 transform: translateY(-50%) translateX(100vw);
}
.button-save{
    margin:10px;

    color:white;
    cursor: pointer;

 display: inline-block;
 padding: 10px 10px;
 background-image: linear-gradient(to right,blue, lightblue);
 border-radius: 8px;

 color: #FFF;
 font-size: 18px;
 font-weight: 50;

 box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
 transition: 0.4s ease-out;
}

.button-cancel{
    margin:10px;
    background-color: red;
    color:white;
    cursor: pointer;

 display: inline-block;
 padding: 10px 10px;
 background-image: linear-gradient(to right, rgb(197, 35, 35),rgb(226, 64, 64) );
 border-radius: 8px;

 color: #FFF;
 font-size: 18px;
 font-weight: 700;

 box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
 transition: 0.4s ease-out;
}

form {
    width: 400px;
    margin: 50px auto;
    padding: 20px;
    background-color: #ffffff;
    border: 2px solid #ccc; 
    border-radius: 10px; 
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  }
  h2 {
    font-size: 24px;
    margin-bottom: 20px;
    color:purple;
  }

  input[type="text"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }


</style>
