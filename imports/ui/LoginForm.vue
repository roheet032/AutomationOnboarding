
<template>
    <div class="login-container">
      <div class="login-form">
        <img class="image" src="keelalogo.png" alt="">
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="email" required />
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" required />
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary">Login</button><br>
            <div class="register">Haven't Register Organization Yet?? <br><button v-on:click="redirectToRegisterPage" >Register Now</button></div>
          </div>
          
        </form>
       
      </div>
      
      
    </div>
    
  </template>
  
  <script>
    
  export default {
    data() {
      return {
        email: '',
        password: '',
      };
    },

    methods: {
        redirectToRegisterPage() {
      this.$router.push('./register');
    },
      login() {
        // Here, you can implement your login logic using Meteor's authentication methods.
        // For simplicity, we'll just display the login credentials in the console.
        console.log('Login Attempt:');
        console.log('Email:', this.email);
        console.log('Password:', this.password);
      },
    },
  };
  </script>
  
  <style>
   
  
  .login-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height:100vh;
    
  }
  
  .login-form {
    background-color:#f9f9f9 ;
    border-radius: 10px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    padding: 30px;
    width: 320px;
  }

  .register{
    
    color:red;
    padding-left:25px;
    
    
  }
  
  .image {
    color:#f5f5f5;
    text-align: center;
    width:320px;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom:20px;
    padding-right:20px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    color: #666;
  }
  
  input[type="email"],
  input[type="password"] {
    width: 100%;
    padding: 12px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
    color: #333;
    transition: border-color 0.3s ease;
  }
  
  input[type="email"]:focus,
  input[type="password"]:focus {
    outline: none;
    border-color: #007bff;
  }
  
  button {
    background-color: #7745D6;
    padding: 12px;
    font-size: 16px;
    color:white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #622cc9;
  }
  
  .btn{
    background-color: #7745D6;
    margin-left:15px;
    margin-bottom:25px;
   
  }
  
  /* Center the button in the form */
  .form-group:last-child {
    text-align: center;
  }
  </style>