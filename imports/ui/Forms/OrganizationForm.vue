<!-- ContactForm.vue -->
<template>
    <div class="contact-form">
      <modal  v-if="modalVisible" name="addContactModal" :adaptive="true" width="400px" height="280px">
        <h2>Organization</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="formData.name" required />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="formData.email" required />
        </div>
        <div class="form-group">
          <label for="message">Message:</label>
          <textarea id="message" v-model="formData.message" rows="4" required></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </modal>
      
    </div>
  </template>
  
  <script>
  export default {

    name:"OrganizationForm",
    
    data() {
      return {
        modalVisible: false,
        formData: {
          name: '',
          email: '',
          message: ''
        }
      };
    },
    methods: {
      showModal() {
      this.modalVisible = true; // Show the modal
    },
      submitForm() {
        // Add your form submission logic here
        console.log('Form submitted:', this.formData);
        // Clear form fields after submission
        this.formData.name = '';
        this.formData.email = '';
        this.formData.message = '';
      }
    }
  };
  </script>
  
  <style>
  .contact-form {
    max-width: 400px;
    margin: 0 auto;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input,
  textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  </style>