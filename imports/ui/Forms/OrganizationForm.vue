<template>
<div class="organization-form">

    <modal v-if="modalVisible" name="addOrganizationModal" :adaptive="true" width="300px" height="420px">
        <div class="form-overlay">
            <div class="form-container">
                <h2 class="form-title">{{ mode === 'edit' ? 'Edit Organization' : 'Add Organization' }}</h2>
                <form @submit.prevent="handleOrganization">
                    <div class="form-group">
                        <label for="name">Organization Name:</label>
                        <input type="text" id="fullName" class="input-field" v-model="formData.name" required />
                    </div>
                    <div class="form-group">
                        <label for="email">Organization Email:</label>
                        <input type="email" id="email" class="input-field" v-model="formData.email" required />
                    </div>
                    <div class="form-group">
                        <label for="address">Organization Address:</label>
                        <input type="address" id="address" class="input-field" v-model="formData.address" required />
                    </div>
                    <div class="form-group">
                        <label for="phonenumber">Phone Number:</label>
                        <input type="phonenumber" id="phonenumber" class="input-field" v-model="formData.phonenumber" />
                    </div>
                    <div class="button-group">

                        <!-- <button class="add-button" type="submit">Add</button> -->
                        <button  class="add-button" type="submit"> {{ mode === 'edit' ? 'Update' : 'Add' }}</button>
                        <button class="cancel-button" @click="cancelFormAndCloseModal">Cancel</button>
                        <!-- <button class="create-button" @click="createOrganization">{{ mode === 'edit' ? 'Update Organization' : 'Add Organization' }}</button> -->

                    </div>
                </form>

            </div>
        </div>
    </modal>

</div>
</template>

  
<script>
import { Meteor } from 'meteor/meteor';
export default {

    name: "OrganizationForm",

    data() {
        return {
            mode:"add",
            modalVisible: false,
            formData: {
                name: '',
                email: '',
                address: '',
                phonenumber: ''
            }
        };
    },
    methods: {
        showModal() {
            this.mode='add',
            this.modalVisible = true; 
        },
        closeModal() {
            this.modalVisible = false; 
        },
        populateForm(organization) {
        this.mode="edit";
        this.formData = { ...organization }; 
    },
    async handleOrganization() {
            const userId = Meteor.userId();
            try {
                if (this.mode === 'add') {
                    await Meteor.call('organizations.insert', { ...this.formData }, (error) => {
                        if (!error) {
                            this.$emit('organization-added');
                            alert('Organization Created Successfully');
                        }
                    });
                } else if (this.mode === 'edit') {
                    await Meteor.call('organizations.update', { ...this.formData }, (error) => {
                        if (!error) {
                            this.$emit('organization-updated'); // Emit event for successful update
                            alert('Contact Updated Successfully');
                        }
                    });
                }
            } catch (error) {
                alert(error.message);
            }
            this.closeModal();
        },
    clearForm() {
      this.formData.name = "";
      this.formData.email = "";
      this.formData.address="";
      this.formData.phonenumber="";
    },
    deleteContact(){
      if(this.organization._id){
        if (this.organization._id) {
        Meteor.call('organizations.remove', this.organization._id, (error) => {
          if (error) {
            console.error('Delete error:', error);
          }
        });
      }
    }
      
    },
    cancelFormAndCloseModal() {
      this.modalVisible = false; 
      this.$emit("close-modal"); 
      this.resetFormData(); 
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

.create-button {
    flex: 1;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s, color 0.3s;
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
  margin-right: 15px; 
}

.add-button:hover {
  background-color: #5345a0;
}

.cancel-button {
  background-color: red;
  color: white;
  margin-top:0.5x;
}

.cancel-button:hover {
  background-color: darkred;
}
</style>
