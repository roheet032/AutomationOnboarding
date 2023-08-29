<template>
<div>
    <Sidebar />
    
    <div class="container">
        <div class="main-content">
        <modal name="addContactModal" :adaptive="true" width="400px" height="280px">
            <div class="addContactModal">
                <button class="add-button" @click="openAddOrganizationModal">Add Organizations</button>
                <table class="contact-table">
                    <thead>
                        <tr>
                            <th>Organization Name</th>
                            <th>Organization Email</th>
                            <th>Organization Address</th>
                            <th>Phone Number</th>
                            
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(organization, index) in organizations" :key="index">
                            <td>{{ organization.name }}</td>
                            <td>{{ organization.email }}</td>
                            <td>{{ organization.address }}</td>
                            <td>{{ organization.phonenumber }}</td>
                            <td>
                                <button class="edit-button" @click="openEditOrganizationModal(organization)">Edit</button>
                                <button class="delete-button" @click="deleteOrganization(organization._id)">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <OrganizationForm @organizations-added="handleOrganizationsAdded"  @organizations-updated="handleOrganizationsUpdated" ref="organizationForm" @close-modal="isModalOpen = false" />
            </div>
        </modal>
    </div></div>
</div>
</template>

  
<script>
import Sidebar from "./../Sidebar.vue";
import OrganizationForm from "./../Forms/OrganizationForm.vue";
import {
    Meteor
} from 'meteor/meteor';
import {
    OrganizationsCollection
} from '../../api/Collection/OrganizationsCollection'

export default {
    name: "Organizations",
    components: {
        Sidebar,
        OrganizationForm
        
    },
    
    meteor: {
        $subscribe: {
            organizations: []
        },
        organizations() {
            return OrganizationsCollection.find().fetch();
        }
    },
    methods: {
        openAddOrganizationModal() {
            this.isModalOpen = true;
            this.$refs.organizationForm.showModal(); // Call showModal() method in ContactForm
            this.$refs.organizationForm.clearForm();
        },

        handleOrganizationsAdded() {
            this.isModalOpen = false; // Close the modal after inserting value in form
        },

        handleOrganizationsUpdated(){
            this.isModalOpen = false; // Close the modal
            this.$refs.organizationForm.clearForm(); // Clear the form
        },
        openEditOrganizationModal(contact) {
            this.isModalOpen = true;
            this.$refs.organizationForm.mode = 'edit'; // Set mode to 'edit' in ContactForm
            this.$refs.organizationForm.showModal(); // Call showModal() method in ContactForm
            this.$refs.organizationForm.populateForm(contact);
            //put database data into form 

        },
        deleteOrganization(organizationId) {
            Meteor.call('organizations.remove', organizationId, (error) => {
                if (error) {
                    console.error('Delete error:', error);
                }
            });
        }
    }
};
</script>

  
<style scoped>
.container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between; /* Center horizontally */
    height: 300px;
    margin-left:200px;
     /* Ensure full viewport height */
}

.main-content {
    display: flex;
    flex-direction: column;
    align-items: center; /* Center horizontally */
    justify-content: center; /* Center vertically */
    flex: 1; /* Take up remaining height */
    padding: 10px; /* Add padding for spacing */
    margin-top:60px;

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
    background-color:#7745D6;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 6px 12px;
    cursor: pointer;
}

@media (max-width: 768px) {
    .container {
        flex-direction: column; /* Stack sidebar and main content on small screens */
    }

    .main-content {
        position: relative;
        top: 0;
        right: 0;
    }
}
</style>
