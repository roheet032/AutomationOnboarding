<template>
<Sidebar />
<div class="controls">

    <div class="main-content">
        <modal name="addContactModal" :adaptive="true" width="400px" height="280px">
            <div class="addContactModal">
                <h2>This is Contact main content page</h2>
                <button class="add-button" @click="openAddContactModal">Add Contact</button>
                <table>
                    <thead>
                        <tr>
                            <th>FullName</th>
                            <th>Email</th>
                            <th>Organization</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(contact, index) in contacts" :key="index">
                            <td>{{ contact.fullName }}</td>
                            <td>{{ contact.email }}</td>
                            <td>{{ contact.organization }}</td>
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

import ContactForm from "./../ContactForm.vue"

export default {

    name: "Contacts",

    components: {

        Sidebar,
        ContactForm
    },

    data() {
        return {
            contacts: [{
                    fullName: 'John Doe',
                    email: 'john@example.com',
                    organization: 'ABC Corp',
                    role: 'Manager'
                },
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
            console.log('Edit contact at index:', index);
        },
        deleteContact(index) {
            // Implement your delete logic here
            this.contacts.splice(index, 1);
        }
    },
    methods: {

    }
};
</script>

<style>
.main-content {
    position: absolute;
    right: 200px;
    top: 50px;
}

table {
    width: 50%;
    border-collapse: collapse;
    margin-top: 65px;
    padding: 50px;
}

th,
td {
    padding: 10px;
    text-align: center;
}

th {
    background-color: #f2f2f2;
}

button {
    padding: 5px 10px;
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
    background-color: #2196F3;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 5px 10px;
    cursor: pointer;
}
</style>
