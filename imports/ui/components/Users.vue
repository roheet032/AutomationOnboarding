<template>
<div>
    <Sidebar />
    <div class="main-content">
        <modal name="addContactModal" :adaptive="true" width="400px" height="280px">
            <div class="addContactModal">
                <button class="add-button" @click="openAddContactModal">Add Users</button>
                <table class="contact-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Phone Number</th>
    
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(contact, index) in contacts" :key="index">
                            <td>{{ contact.name }}</td>
                            <td>{{ contact.email }}</td>
                            <td>{{ contact.address }}</td>
                            <td>{{ contact.phonenum }}</td>
                            <td>{{ contact.role }}</td>
                            <td>
                                <button class="edit-button" @click="editContact(index)">Edit</button>
                                <button class="delete-button" @click="deleteContact(index)">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <ContactForm ref="contactForm" />
            </div>
        </modal>
    </div>
</div>
</template>

  
<script>
import Sidebar from "./../Sidebar.vue";
import ContactForm from "./../Forms/ContactForm.vue";

export default {
    name: "Contacts",
    components: {
        Sidebar,
        ContactForm
    },
    data() {
        return {
            contacts: [{
                    name: "Rohit",
                    email: "rohit@gmail.com",
                    address:"Madhyapur Thimi-7, Nagadesh",
                    phonenum: 9851224455,
                  
                    role: "Admin"
                }
                // Add more contact objects as needed
            ]
        };
    },
    methods: {
        openAddContactModal() {
            this.$refs.contactForm.showModal(); // Call showModal() method in ContactForm
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

  
<style>
.main-content {
    position: absolute;
    right: 200px;
    top: 50px;
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
    background-color: #2196f3;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 6px 12px;
    cursor: pointer;
}
</style>
