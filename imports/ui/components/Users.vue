<template>
<div>
    <Sidebar />
    <div class="container">
        <div class="main-content">
            <modal name="addContactModal" :adaptive="true" width="400px" height="280px">
                <div class="addContactModal">
                    <button class="add-user-button fixed-add-user-button" @click="openAddUserModal">Add Users</button>
                    <div class="table-container">
                        <table class="contact-table">
                        <thead>
                            <tr>
                                <th>Full Name</th>
                                <th>User Email</th>
                                <th>Organization</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(user, index) in users" :key="index">
                                <td>{{ user.profile.name }}</td>
                                <td>{{ user.emails[0].address }}</td>
                                <td>{{ user.profile.organizationName }}</td>
                                <td>{{ user.profile.role }}</td>
                                <td v-if="user.profile.role !=='KeelaAdmin'">
                                    <button class="edit-button"   @click="openEditUserModal(user)">Edit</button>
                                    <button class="delete-button"  @click="deleteUser(user._id)">Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                    
                    <UserForm @users-added="handleUserAdded" @users-updated="handleUserUpdated" ref="userForm" @close-modal="isModalOpen = false" />
                </div>
            </modal>
        </div>
    </div>

</div>
</template>

<script>
import Sidebar from "./../Sidebar.vue";
import UserForm from "./../Forms/UserForm.vue";
import {
    Meteor
} from "meteor/meteor";

export default {
    name: "Users",
    components: {
        Sidebar,
        UserForm
    },
    meteor: {
        $subscribe: {
            users: [],
        },
        users() {
            return Meteor.users.find().fetch();
        },

    },
    
    methods: {

        openAddUserModal() {
            this.isModalOpen = true;
            this.$refs.userForm.showModal(); 
            this.$refs.userForm.clearForm();
        },
        openEditUserModal(user) {
            this.isModalOpen = true;
            this.$refs.userForm.mode = 'edit'; 
            this.$refs.userForm.showModal(); 
            this.$refs.userForm.populateForm(user);
           

        },
        handleUserAdded() {
            this.isModalOpen = false; 
        },

        handleUserUpdated() {
            this.isModalOpen = false; 
            this.$refs.userForm.clearForm(); 

        },
       
        deleteUser(userId) {
            Meteor.call("deleteUser", userId, (error) => {
                if (error) {
                    console.error("Delete error:", error);
                }
            });
        },    
    },     
};
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  height: 200px;
  margin-left: 200px;
}


.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 10px;
  margin-top: 60px;
}


.contact-table-container {
  width: 100%;
  padding: 5px;
  text-align: center;
}


@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }

  .main-content {
    align-items: center;
    justify-content: flex-start;
  }

  .contact-table-container {
    padding: 10px;
  }
}


.contact-table {
  text-align: center;
  padding: 4px;
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  padding: 12px 15px;
  text-align: center;
  border: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
}


.contact-table th:first-child {
  text-align: center;
}


.contact-table tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}


button {
  padding: 8px 16px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  margin-right: 5px;
}


button.edit-button {
  background-color: rgb(18, 18, 178);
  color: white;
}


button.delete-button {
  background-color: #c01c11;
  color: white;
}


.add-user-button {
  background-color: #7745D6;
  color: white;
  margin-left:1000px;
  
}


button:hover {
  opacity: 0.8;
}

.add-button:hover {
  background-color: #622cc9;
}


.blur-background {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
}
.table-container {
  margin-top: 20px;
  max-height: calc(80vh - 50px);
  overflow-y: auto; 
  border: 1px solid #ddd;
}

</style>
