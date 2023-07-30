<!-- components/Register.vue -->
<template>
    
    <div class="register-container">
        <img class="image1" src="keelalogo.png" alt="">
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="name">Full Name:</label>
          <input v-model="name" type="text" id="name" required>
        </div>
        <div class="form-group">
          <label for="email">Email Address:</label>
          <input v-model="email" type="email" id="email" required>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input v-model="password" type="password" id="password" required>
        </div>
        <div class="form-group">
          <label for="confirm-password">Confirm Password:</label>
          <input v-model="confirmPassword" type="password" id="confirm-password" required>
        </div>
        <button type="submit" class="registerbtn">Register</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      };
    },
    methods: {
      submitForm() {
        // Implement your registration logic here
        const userData = {
          name: this.name,
          email: this.email,
          password: this.password,
        };
        // Call your registration API or Meteor method here
        // For example:
        // Meteor.call('registerUser', userData, (error) => {
        //   if (error) {
        //     console.error(error);
        //   } else {
        //     // Redirect to the dashboard or login page upon successful registration
        //   }
        // });
      },
    },
  };
  </script>
  
  <style scoped>
  .register-container {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  .image1{
    width:400px;
    margin-right:100px;
  }

  form{
    margin-right:250px;
    
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 8px;
  }
  
  input[type="text"],
  input[type="email"],
  input[type="password"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
  }
  
  .registerbtn {
    background-color: #7745D6;
    color: #fff;
    padding: 15px 20px;
    margin-left:10px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    width: 100%;
  }
  
  .registerbtn:hover {
    background-color: #622cc9;
  }
  </style>
  