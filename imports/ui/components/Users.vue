<template>
<div>
    <Sidebar />
    <div class="container">
        <div class="main-content">
            <modal name="addContactModal" :adaptive="true" width="400px" height="280px">
                <div class="addContactModal">
                    <button class="add-button fixed-add-button" @click="openAddUserModal">Add Users</button>
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

        canEditDeleteUser(user) {
        // Check if the logged-in user is KeelaAdmin, and if they are, return false
        if (this.currentUser.role === 'KeelaAdmin') {
            return false;
        }
        // Otherwise, allow editing and deletion for other users
        return true;
    },

        openAddUserModal() {
            this.isModalOpen = true;
            this.$refs.userForm.showModal(); // Call showModal() method in ContactForm
            this.$refs.userForm.clearForm();
        },
        openEditUserModal(user) {
            this.isModalOpen = true;
            this.$refs.userForm.mode = 'edit'; // Set mode to 'edit' in ContactForm
            this.$refs.userForm.showModal(); // Call showModal() method in ContactForm
            this.$refs.userForm.populateForm(user);
            //put database data into form 

        },
        handleUserAdded() {
            this.isModalOpen = false; // Close the modal after inserting value in form
        },

        handleUserUpdated() {
            this.isModalOpen = false; // Close the modal
            this.$refs.userForm.clearForm(); // Clear the form

        },
       
        deleteUser(userId) {
            Meteor.call("deleteUser", userId, (error) => {
                if (error) {
                    console.error("Delete error:", error);
                }
            });
        },
        // getUser() {
        //     const currentUser = Meteor.user();
        //     if (currentUser) {
        //         this.currentUser = {
        //             // org: currentUser.profile.organizationName,
        //             role: currentUser.profile.role,
        //             // id: currentUser._id,
        //             name: currentUser.profile.name,
        //             // organizationId: currentUser.profile.organizationId.name
        //         };
        //     }
        // },
        
    },
    // created() {
    //     this.getUser();
      
    // },
        
};
</script>

<style scoped>
.fixed-add-button {
  position: fixed;
  top: 50px;
  right:300px;
  background-color: #7745D6;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  z-index: 1; /* Ensure it's above the scrollable content */
}

.table-container {
  margin-top: 50px; /* Add margin to separate the button and table */
  max-height: calc(80vh - 50px); /* Adjust the maximum height based on the desired spacing */
  overflow-y: auto;
  border: 1px solid #ddd; /* Add a border for separation */
}

.container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    /* Center horizontally */
    height: 300px;
    margin-left: 200px;
    /* Ensure full viewport height */
}

.main-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    /* Center horizontally */
    justify-content: center;
    /* Center vertically */
    flex: 1;
    /* Take up remaining height */
    padding: 10px;
    /* Add padding for spacing */
    margin:60px;

}

.contact-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

th,
td {
    padding: 12px 15px;
    text-align: center;
    border: 1px solid #ddd;
}

th {
    background-color: #f2f2f2;
}

button {
    padding: 6px 12px;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    margin-right: 5px;
}

button.edit-button {
    background-color: blue;
    color: white;
}

button.delete-button {
    background-color: #f44336;
    color: white;
}

.add-button {
    float: right;
    margin-top: 15px;
    margin-bottom: 5px;
    background-color: #7745D6;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 6px 12px;
    cursor: pointer;
}

@media (max-width: 768px) {
    .container {
        flex-direction: column;
        /* Stack sidebar and main content on small screens */
    }

    .main-content {
        position: relative;
        top: 0;
        right: 0;
    }
}
</style>
