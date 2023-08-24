<template>
    <div class="contact-form">
       
        <modal v-if="modalVisible" name="addContactModal" :adaptive="true" width="300px" height="420px">
          <div class="form-overlay">
            <div class="form-container">
                <h2 class="form-title">{{ mode === 'edit' ? 'Edit Contact' : 'Add Contact' }}</h2>
                <form @submit.prevent="handleContact">
                    <div class="form-group">
                        <label for="fullName">Full Name:</label>
                        <input type="text" id="fullName" class="input-field" v-model="formData.fullName" required />
                    </div>
                    <div class="form-group">
                        <label for="email">Email:</label>
                        <input type="email" id="email" class="input-field" v-model="formData.email" required />
                    </div>
                    <div class="form-group">
                        <label for="address">Address:</label>
                        <input type="address" class="input-field" v-model="formData.address">
                    </div>
                    <div class="form-group">
                        <label for="phonenumber">Phone Number:</label>
                        <input type="text" id="phonenumber" class="input-field" v-model="formData.phonenumber" />
                    </div>
                    <div class="form-group">
                        <label for="tag">Tags:</label>
                        <input type="text" id="phonenumber" class="input-field" v-model="formData.tags" />
                    </div>
                    
                    <div class="button-group">
                        
                          <button  class="add-button" type="submit"> {{ mode === 'edit' ? 'Update' : 'Add' }}</button>
                        <button class="cancel-button" @click="cancelFormAndCloseModal">Cancel</button>
                        
                    </div>
                </form>
                
            </div>
            </div>
        </modal>
      
       
    </div>
</template>

<script> 
import {Meteor} from 'meteor/meteor'
import { ContactsCollection } from '../../api/Collection/ContactsCollection'
export default {
  name: "ContactForm",
  data() {
    return {
      mode: 'add',
      modalVisible: false,
      formData: {
        fullName: "",
        email: "",
        address: "",
        phonenumber: "",
        tags:""
        
      }
    };
  },
  methods: {
    showModal() {
      this.mode = 'add';
      this.modalVisible = true; // Show the modal
    },
    closeModal() {
      this.modalVisible = false; // Close the modal
    },
    populateForm(contact) {
        this.mode="edit";
        this.formData = { ...contact }; // Populate the form data with the contact's data
    },
    

    async handleContact() {
            const userId = Meteor.userId();
            try {
                if (this.mode === 'add') {
                    await Meteor.call('contacts.insert', { ...this.formData }, (error) => {
                        if (!error) {
                            this.$emit('contact-added');
                            alert('Contact Created Successfully');
                        }
                    });
                } else if (this.mode === 'edit') {
                    await Meteor.call('contacts.update', { ...this.formData }, (error) => {
                        if (!error) {
                            this.$emit('contact-updated'); // Emit event for successful update
                            alert('Contact Updated Successfully');
                        }
                    });
                }
            } catch (error) {
                alert(error.message);
            }
            this.closeModal();
        },
    // async submitForm() {
    //   await Meteor.call('contacts.insert', this.formData, (error) => {
    //     if (error) {
    //       console.error('Insert error:', error);
    //     } 
    //       else {
    //       this.$emit('contact-added'); 
    //       this.clearForm();
    //     }
    //   });
    //   this.closeModal()
    // },
    clearForm() {
      this.formData.fullName = "";
      this.formData.email = "";
      this.formData.address="";
      this.formData.phonenumber="";
      this.formData.tags="";
    },
    deleteContact(){
      if(this.contact._id){
        if (this.contact._id) {
        Meteor.call('contacts.remove', this.contact._id, (error) => {
          if (error) {
            console.error('Delete error:', error);
          }
        });
      }
    }
      
    },
    cancelFormAndCloseModal() {
      this.modalVisible = false; // Hide the modal
      this.$emit("close-modal"); // Emit event to close background blur
      this.resetFormData(); // Clear form fields on cancel
    },
 
  }
};
</script>

<style scoped>
/*this form-overlay and form-container will show pop up form in center in all type of screen*/
.form-overlay {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 99;
}

.form-container {
    background-color: lightgray;
    border: 1px solid #ddd;
    border-radius: 8px;
    text-align: left;
    max-width: 400px;
    width: 100%;
    padding: 20px;
}

/* .form-container {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: lightgray;
  text-align: left;
  position:fixed;
  top:70px;
  bottom: 150px;
  right:500px;
  z-index: 99;

} */

.form-title {
  font-size: 22px;
  margin-bottom: 15px;
  color: #333;

}

.input-field {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: border-color 0.3s;
}

.input-field:focus {
  border-color: #007bff;
}
.button-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
}

.add-button,
.cancel-button {
  flex:1;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s, color 0.3s;
}

.add-button {
  background-color: blue;
  color: white;
  margin-right: 15px; /* Adjust the spacing as needed */
}

.add-button:hover {
  background-color: #5345a0;
}

.cancel-button {
  background-color: red;
  color: white;
  margin-top:10px;
}

.cancel-button:hover {
  background-color: darkred;
}

</style>
