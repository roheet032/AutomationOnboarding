<template>
<Sidebar />
<div class="container">
    <div class="main-content">
        <modal name="addContactModal" :adaptive="true" width="400px" height="280px">
            <div class="addContactModal">
                <button class="add-button" v-if="currentUser.role !== 'Coordinator'" @click="openAddContactModal">Add Contact</button>
                <div class="contact-table-container" :class="{ 'blur-background': isModalOpen }"></div>
                <div class="table-container">
                    <table class="contact-table">
                    <thead>
                        <tr>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Phone Number</th>
                            <th>Tags</th>
                            <th v-if="currentUser.role !== 'Coordinator'">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(contact, index) in contacts" :key="index">
                            <td>{{ contact.fullName }}</td>
                            <td>{{ contact.email }}</td>
                            <td>{{ contact.address }}</td>
                            <td>{{ contact.phonenumber }}</td>
                            <td>{{ contact.tags }}</td>
                            <td v-if="currentUser.role !== 'Coordinator'">
                                <button class="edit-button" v-if="currentUser.role !== 'Coordinator'"  @click="openEditContactModal(contact)">Edit</button>
                                <button class="delete-button" v-if="currentUser.role !== 'Coordinator'" @click="deleteContact(contact._id)">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                </div>
               
                <ContactForm  @contact-added="handleContactAdded" @contact-updated="handleContactUpdated" ref="contactForm" @close-modal="isModalOpen = false" />
            </div>
        </modal>
    </div>

</div>
</template>

<script>
import Sidebar from "./../Sidebar.vue";
import ContactForm from "./../Forms/ContactForm.vue";
import {
    Meteor
} from 'meteor/meteor';
import {
    ContactsCollection
} from '../../api/Collection/ContactsCollection'

export default {
    name: "Contacts",
    components: {
        Sidebar,
        ContactForm
    },
    data() {
        return {
            currentUser: null,
            isModalOpen: false
        };
    },
    meteor: {
        $subscribe: {
            contacts: []
        },
        contacts() {
        const user = Meteor.user();
        if (user && user.profile.organizationName) {
            return ContactsCollection.find({ organizationName: user.profile.organizationName }).fetch();
        }
        return [];
    } 
    },

    methods: {
    
        openAddContactModal() {
            this.isModalOpen = true;
            this.$refs.contactForm.showModal(); // Call showModal() method in ContactForm
            this.$refs.contactForm.clearForm();

        },
        openEditContactModal(contact) {
            this.isModalOpen = true;
            this.$refs.contactForm.mode = 'edit'; // Set mode to 'edit' in ContactForm
            this.$refs.contactForm.showModal(); // Call showModal() method in ContactForm
            this.$refs.contactForm.populateForm(contact);    
           

        },
        handleContactAdded() {
            this.isModalOpen = false; // Close the modal after inserting value in form
        },

        handleContactUpdated(){
            this.isModalOpen = false; // Close the modal
            this.$refs.contactForm.clearForm(); // Clear the form

        },
        deleteContact(contactId) {
            Meteor.call('contacts.remove', contactId, (error) => {
                if (error) {
                    console.error('Delete error:', error);
                }
            });
        },
        getUser() {
            const currentUser = Meteor.user();
            if (currentUser) {
                this.currentUser = {
                    role: currentUser.profile.role,
                    name: currentUser.profile.name
                };
            }
        },
        
    },
    created() {
        this.getUser();
      
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

/* Media query for smaller screens */
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


.add-button {
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
