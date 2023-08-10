<template>
<div class="login-container" @submit.prevent="handleLogin">
    <div class="login-form">
        <img class="image" src="keelalogo.png" alt="">
        <form @submit.prevent="login">
            <div id="email1" class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="email" required />
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password" required />
            </div>
            <div class="form-group">
                <button type="submit" class="loginbtn" v-on:click="redirectToContact"><span class="material-symbols-outlined">login</span>Log In</button><br>
                <div class="register">Haven't Registered an Organization Yet? <br><button v-on:click="redirectToRegisterPage">Register Now</button></div>
            </div>
        </form>
    </div>
</div>
</template>

  
<script>
import { Meteor } from "meteor/meteor";

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

    redirectToContact() {
      this.$router.push('./contacts');
    },

    handleLogin(event) {
      event.preventDefault();
      // Call the Meteor.loginWithPassword method to handle user login
      Meteor.loginWithPassword(this.email, this.password, (error) => {
        if (error) {
          alert("Please Enter Valid Email and Password:", error);
        } else {
          this.$router.push("./contacts");
        }
      });
    },
    login() {
      const userData = {
        email: this.email,
        password: this.password,
      };
      // Here, you can implement your login logic using Meteor's authentication methods.
      // For simplicity, we'll just display the login credentials in the console.
      console.log('Login Attempt:');
      console.log('Email:', this.email);
      console.log('Password:', this.password);
    },
  },
};
// Call your login API or Meteor method here
</script>

  
<style>
.login-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

.login-form {
    background-color:#d1d5db;
    border-radius: 10px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    padding: 30px;
    width: 320px;
}

.login-form label {
    display: block;
    margin-bottom: 10px;
    font-weight: bold;
    color: #333;
}

.login-form input[type="email"],
.login-form input[type="password"] {
    width: 100%;
    padding: 12px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f5f5f5;
    color: #333;
    transition: border-color 0.3s ease;
}

.login-form input[type="email"]:focus,
.login-form input[type="password"]:focus {
    outline: none;
    border-color: #007bff;
}

.loginbtn{
    margin-top:20px;
    background-color: #7745D6
}
button {

    background-color: #7745D6;
    padding: 12px;
    font-size: 16px;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;
    transition: background-color 0.3s ease;
}


button:hover {
    background-color: #622cc9;
}

.register {
    color: #777;
    font-size: 14px;
    padding-top: 20px;
}

.register button {
    background-color: transparent;
    border: none;
    color: #7745D6;
    font-weight: bold;
    cursor: pointer;
}

/* Center the button in the form */
.form-group:last-child {
    text-align: center;
}

.image{
    margin-bottom: 20px;
    padding:4px;
}
#email1{
    margin-bottom: 10px;
}

.material-symbols-outlined{
  padding-right:2px;
  vertical-align: middle;
}
</style>
