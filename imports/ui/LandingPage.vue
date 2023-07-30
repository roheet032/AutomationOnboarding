<template>
    <div class="landing-page">
      <div class="sidebar">
        <img src="keelalogo.png" alt="Keela Logo" class="logo">
        <a href="#">Contacts</a>
        <a href="#">Organizations</a>
        <a href="#">Tags</a>
        <button v-if="userIsLoggedIn" @click="handleLogout" class="logout-btn">Logout</button>
      </div>
  
      <div class="main-content">
        <section id="contacts">
          <h2><marquee>Welcome to the Keela Landing Page <img class="keela-img" src="keela.png" alt=""></marquee></h2>
          <!-- Your specific content for the Contacts section goes here -->
        </section>
      </div>
    </div>
  </template>
  
  <script>
  import { Meteor } from 'meteor/meteor';
  
  export default {
    data() {
      return {
        userIsLoggedIn: false,
      };
    },
  
    methods: {
      handleLogout() {
        Meteor.logout((error) => {
          if (error) {
            alert("User cannot logout!!!");
          } else {
            this.$router.push('/');
          }
        });
      },
  
      updateUserLoggedInStatus() {
        // Check if the user is logged in
        this.userIsLoggedIn = !!Meteor.userId();
      },
  
      onUserAuthenticated() {
        // Called when the user is authenticated (login successful)
        this.updateUserLoggedInStatus();
      },
    },
  
    created() {
      // Subscribe to the 'userData' publication
      this.userDataSubscription = Meteor.subscribe('userData');
      this.updateUserLoggedInStatus();
    },
  
    destroyed() {
      // Stop the subscription when the component is destroyed
      this.userDataSubscription.stop();
    },
  };
  </script>
  
  <style>
  /* Main container styles */
  .landing-page {
    display: flex;
    height: 100vh;
  }
  
  /* Sidebar styles */
  .sidebar {
    width: 200px;
    background-color: #333;
    color: #fff;
    padding-top: 20px;
  }
  
  .sidebar a {
    display: block;
    color: #fff;
    text-decoration: none;
    padding: 8px 16px;
  }
  
  .sidebar a:hover {
    background-color: #622cc9;
  }
  
  /* Logo styles */
  .logo {
    width: 150px;
    margin-left: 10px;
    margin-bottom: 20px;
  }
  
  /* Logout button styles */
  .logout-btn {
    width: 100px;
  position: absolute; /* Position the logout button absolutely within the sidebar */
  bottom: 20px; /* Set the distance from the bottom of the sidebar */
  left: 20px; /* Set the distance from the left of the sidebar */
  background-color: #7745d6;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  }
  
  .logout-btn:hover {
    background-color: #622cc9;
  }
  
  /* Main content styles */
  .main-content {
    flex: 1;
    padding: 20px;
    background-color: #f0f0f0;
  }
  
  /* Section styles */
  section {
    margin-bottom: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    background-color: #fff;
  }
  
  /* Marquee styles */
  marquee {
    margin-top: 20px;
  }
  
  /* Keela logo image styles */
  .keela-img {
    width: 50px;
    vertical-align: middle;
    margin-left: 10px;
  }
  
  /* Additional styles for better layout */
  h2 {
    margin: 0;
    font-size: 24px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
  }
  
  img.img1 {
    margin-top: 20px;
    width: 50px;
  }
  
  /* Center the logout button */
  .sidebar .logout-btn {
    display: block;
    margin: 20px auto;
  }
  </style>
  