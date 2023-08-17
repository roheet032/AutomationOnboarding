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
                        <tr v-for="(contact, index) in contacts" :key="index">
                            <td>{{ contact.orgname }}</td>
                            <td>{{ contact.orgemail }}</td>
                            <td>{{ contact.orgaddress }}</td>
                            <td>{{ contact.phonenum }}</td>
                            <td>
                                <button class="edit-button" @click="editContact(index)">Edit</button>
                                <button class="delete-button" @click="deleteContact(index)">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <OrganizationForm ref="organizationForm" @close-modal="isModalOpen = false" />
            </div>
        </modal>
    </div></div>
</div>
</template>

  
<script>
import Sidebar from "./../Sidebar.vue";
import OrganizationForm from "./../Forms/OrganizationForm.vue";

export default {
    name: "Contacts",
    components: {
        Sidebar,
        OrganizationForm
        
    },
    data() {
        return {
            contacts: [{
                    orgname: "Abc Org",
                    orgemail: "abcorg@gmail.com",
                    orgaddress:"Madhyapur",
                    phonenum:9851224455,
                }
                // Add more contact objects as needed
            ]
        };
    },
    methods: {
        openAddOrganizationModal() {
            this.$refs.organizationForm.showModal(); // Call showModal() method in ContactForm
        },
        editContact(index) {
            // Implement your edit logic here
            console.log("Edit contact at index:", index);
        },
        deleteContact(index) {
            // Implement your delete logic here
            this.contacts.splice(index, 1);
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
