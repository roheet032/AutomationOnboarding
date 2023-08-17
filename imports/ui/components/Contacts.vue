<template>

    <Sidebar />
    <div class="container">
    <div class="main-content">
        <modal name="addContactModal" :adaptive="true" width="400px" height="280px">
            <div class="addContactModal">
                <button class="add-button" @click="openAddContactModal">Add Contact</button>
                <div class="contact-table-container" :class="{ 'blur-background': isModalOpen }"></div>
                <table class="contact-table">
                    <thead>
                        <tr>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Phone Number</th>
                            <th>Tags</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(contact, index) in contacts" :key="index">
                            <td>{{ contact.fullName }}</td>
                            <td>{{ contact.email }}</td>
                            <td>{{ contact.address }}</td>
                            <td>{{ contact.phonenumber }}</td>
                            <td>{{ contact.tags }}</td>
                            <td>
                                <button class="edit-button" @click="editContact(index)">Edit</button>
                                <button class="delete-button" @click="deleteContact(index)">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <ContactForm ref="contactForm"  @close-modal="isModalOpen = false"/>
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
                    fullName: "Rohit Johnson",
                    email: "rjohn@example.com",
                    address: "Kathmandu",
                    phonenumber: "9851224455",
                    tags: "RD Tag"
                }
                // Add more contact objects as needed
            ],
            isModalOpen:false,
        };
    },
    methods: {
        openAddContactModal() {
            this.isModalOpen=true;
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

.contact-table-container {
    width: 100%;
    padding: 20px;
    text-align: center; /* Center table content */
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
/* .main-content {
    position: absolute;
    right: 200px;
    top: 50px;
    
} */

.contact-table {
    text-align: center;
    padding:4px;
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
    background-color: rgb(18, 18, 178);
    color: white;
}

button.delete-button {
    background-color: #c01c11;
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

 .add-contact:hover{
    background-color: #622cc9;
    cursor: pointer;
 }
.blur-background {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Adjust opacity as needed */
  backdrop-filter: blur(5px); /* Adjust the blur intensity as needed */
}

</style>
