<template>
<div class="user-form">

    <modal v-if="modalVisible" name="addUserModal" :adaptive="true" width="300px" height="420px">
        <div class="form-overlay">
            <div class="form-container">
                <h2 class="form-title">{{ mode === 'edit' ? 'Edit User' : 'Add User' }}</h2>
                <form @submit.prevent="handleUser">
                    <div class="form-group">
                        <label for="name">Full Name:</label>
                        <input type="text" id="name" class="input-field" v-model="formData.name" required />
                    </div>
                    <div v-if="mode !== 'edit'" class="form-group">
                        <label for="email">User Email:</label>
                        <input type="email" id="email" class="input-field" v-model="formData.email" required />
                    </div>
                    <div v-if="mode !== 'edit'" class="form-group">
                        <label for="password">User Password:</label>
                        <input type="password" id="password" class="input-field" v-model="formData.password" required />
                    </div>
                    <div v-if="mode !== 'edit' " class="form-group">
                        <label for="organization">Organization:</label>
                        <select id="organization" class="input-field" v-model="formData.organizationName">

                            <option v-for="org in organizations" :key="org._id" :value="org.name">{{ org.name }}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="role">Role:</label>
                        <select id="role" class="input-field" v-model="formData.role">

                            <option v-for="role in roles" :key="role" :value="role">{{ role }}</option>
                        </select>
                    </div>

                    <div class="button-group">

                        <button class="add-button" type="submit">{{ mode === 'edit' ? 'Update' : 'Add' }}</button>
                        <button class="cancel-button" @click="cancelFormAndCloseModal">Cancel</button>

                    </div>
                </form>

            </div>
        </div>
    </modal>

</div>
</template>

<script>
import {
    Meteor
} from "meteor/meteor"
import { OrganizationsCollection } from '../../api/Collection/OrganizationsCollection'
export default {
    name: "UserForm",
    data() {
        return {
            mode: 'add',
            modalVisible: false,
            formData: {
                name: "",
                email: "",
                password: "",
                organizationName: "",
                role: ""
            },
            currentUser:Meteor.user(),   //define current user
            roles: ["Admin", "Coordinator"]
        };
    },
    
    meteor: {
        $subscribe: {
            users: [],
            organizations: [],
        },
        organizations(){
            if(!Meteor.user()){
                return [];

            }
            const organizations=OrganizationsCollection.find().fetch();
            console.log(organizations)
            return organizations
        }
    },
    methods: {
    showModal() {
      this.modalVisible = true;
    },
    closeModal() {
      this.modalVisible = false;
    },
    populateForm(user) {
      this.mode = "edit";
      this.formData = {
        _id: user._id,
        name: user.profile.name,
        role: user.profile.role,
      };
    },
    async handleUser() {
      try {
        if (this.mode === "add") {
            

             // Check if a user with the same email already exists
            const userExists = Meteor.users.findOne({ 'emails.address': this.formData.email });

            if (userExists) {
            alert("A user with this email already exists.");
            return;
            }
            //this is for selecting organization if organization is KeelaAdmin all organization will display and if user is of specific org it will only display specific orgname
            let selectedOrganization
            if(this.currentUser.profile.role==='KeelaAdmin'){
                selectedOrganization = this.organizations.find(
            (org) => org.name === this.formData.organizationName
          );}
          else{
            selectedOrganization = this.organizations.find(
            (org) => org.name === this.currentUser.profile.organizationName
          );
          }
             

          if (!selectedOrganization) {
            alert("Invalid organization name");
            return;
          }
          this.formData.organizationId=selectedOrganization._id;// Set organization ID

          await Meteor.call("users.insert", this.formData);
          this.$emit("users-added");
          alert("User Created Successfully");
        } else if (this.mode === "edit") {
            await Meteor.call('users.update', {
         _id: this.formData._id,
        profile: {
          name: this.formData.name,
          role: this.formData.role,
          organizationId:this.formData.organizationId,
          organizationName: this.formData.organizationName
        },
    });
          this.$emit("users-updated");
          alert("User Updated Successfully");
        }
      } catch (error) {
        alert(error.message);
      }
      this.closeModal();
    },
    clearForm() {
      this.formData.name = "";
      this.formData.email = "";
      this.formData.password = "";
      this.formData.organizationName = "";
      this.formData.role = "";
    },

    cancelFormAndCloseModal() {
      this.modalVisible = false;
      this.$emit("close-modal");
      this.clearForm();
    }
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
  overflow: auto;
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

.add-button,
.cancel-button {
    flex: 1;
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
    margin-top: 0.5px;
}

.cancel-button:hover {
    background-color: darkred;
}
</style>
