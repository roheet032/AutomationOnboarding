<!-- imports/ui/Homepage.vue -->
<template>
  <div class="homepage">
    <div class="background-image">
      <div class="marquee">
        <span><marquee>Welcome to Keela!</marquee> </span>
       
      </div>
      <!-- Insert the login button here -->
      <button @click="redirectToLogin" class="login-button">Login</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    redirectToLogin() {
      // Redirect to the login page when the login button is clicked
      this.$router.push('/login');
    },
  },
};
</script>

<style>
/* Add your styles for the homepage here */

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden; /* Hide vertical scroll bars */
}

.homepage {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh; /* Use min-height instead of height */
  background-size: cover;
  background-position: center;
  overflow: auto; /* Enable scrolling for the .homepage div */
}



.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('keelabackground.png'); /* Replace with your image path */
  background-size: cover;
  background-position: center;
}

h1 {
  background-color: #7745D6;
  font-size: 32px;
  color: Blue;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
  margin-bottom: 20px;
}

.login-button {
  position: absolute;
  bottom: 20px; /* Adjust the distance from the bottom as needed */
  left: 50%;
  margin-bottom:110px;
  transform: translateX(-50%);
  padding: 12px 24px;
  font-size: 18px;
  background-color: blue;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: #0056b3;
}
</style>


