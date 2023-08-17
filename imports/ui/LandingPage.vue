<template>
<div>

    <div class="topnav">
        <div class="logo">
            <img src="keelalogo.png" alt="Keela Logo">
        </div>

        <div class="right-btn">
            <span class="mr-10">Welcome to Keela</span>
            <button @click="handleLogout" class="btn-logout">Logout</button>
        </div>
    </div>

    <div class="sidebar">

        <ul>
            <li v-if="currentUser.role === 'KeelaAdmin'">
                <router-link to="/organizations"><span class="material-symbols-outlined">corporate_fare</span>Organizations</router-link>
            </li>
            <li>
                <router-link to="/contacts"> <span class="material-symbols-outlined">contacts</span>Contacts</router-link>
            </li>
            <li >
                <router-link to="/tags"><span class="material-symbols-outlined">tag</span>Tags</router-link>
            </li>
            <li v-if="currentUser.role !== 'Coordinator'">
                <router-link to="/users"><span class="material-symbols-outlined">group</span>Users</router-link>
            </li>
        </ul>
    </div>
    <div class="main-content">
        <img src="keeladash.jpg" alt="Keela Dashboard Image" class="dashboard-image">
    </div>

</div>
</template>

<script>
import {
    Meteor
} from 'meteor/meteor';

export default {
    name: "LandingPage",
    data() {
        return {
            fullname: "",
      
        };
    },

    methods: {
        handleLogout() {
            Meteor.logout((error) => {
                if (error) {
                    alert("User cannot logout!!!");
                } else {
                    this.$router.push('/login');
                }
            });
        },
        getUser() {
            const currentUser = Meteor.user();
            if (currentUser) {
                this.currentUser = {
                    // org: currentUser.profile.organizationName,
                    role: currentUser.profile.role,
                    // id: currentUser._id,
                    // orgId: currentUser.profile.organizationId
                };
            }
        },

        // updateUserLoggedInStatus() {
        //     // Check if the user is logged in
        //     this.userIsLoggedIn = !!Meteor.userId();
        // },

   
    },

    created() {
        this.getUser();
        // // Fetch user data and update userRole
        // this.onUserAuthenticated();

        // // Subscribe to the 'userData' publication
        // this.userDataSubscription = Meteor.subscribe('users');
        // this.updateUserLoggedInStatus();
    },

    // created() {
    //     // Subscribe to the 'userData' publication
    //     this.userDataSubscription = Meteor.subscribe('userData');
    //     this.updateUserLoggedInStatus();
    // },

    // destroyed() {
    //     // Stop the subscription when the component is destroyed
    //     this.userDataSubscription.stop();
    // },

    

};
</script>

<style scoped>
* {
    padding: 0;
    margin: 0;
    list-style: none;
    text-decoration: none;
}
.main-content {
    display: flex;
    justify-content: center; /* Center horizontally */
    align-items: center; /* Center vertically */
    flex: 1; /* Take up remaining height */
    padding: 10px; /* Add padding for spacing */
}

.dashboard-image {
    max-width: 100hh; 
    height: 100vh;
    margin-left:300px/* Ensure the image doesn't exceed its container */
}
.sidebar {
    position: fixed;
    /* left: -250px; */
    left: 0;
    width: 250px;
    height: 100%;
    background: #042331;
    transition: all .5s ease;
    margin-top: 46px;
}

.sidebar header {
    font-size: 22px;
    color: white;
    line-height: 70px;
    text-align: center;
    background: #063146;
    user-select: none;
}

.sidebar ul a {
    display: block;
    height: 100%;
    width: 100%;
    line-height: 65px;
    font-size: 20px;
    color: white;
    padding-left: 40px;
    box-sizing: border-box;
    border-bottom: 1px solid black;
    border-top: 1px solid rgba(189, 10, 10, 0.1);
    transition: .4s;
}

ul li:hover a {
    padding-left: 50px;
}

.sidebar ul a i {
    margin-right: 16px;
}

#check {
    display: none;
}

.logo {
    width: 140px;
}

label #btn,
label #cancel {
    position: absolute;
    background: #042331;
    border-radius: 3px;
    cursor: pointer;
}

label #btn {
    left: 40px;
    top: 25px;
    font-size: 35px;
    color: white;
    padding: 6px 12px;
    transition: all .5s;
}

label #cancel {
    z-index: 1111;
    left: -195px;
    top: 17px;
    font-size: 30px;
    color: #0a5275;
    padding: 4px 9px;
    transition: all .5s ease;
}

#check:checked~.sidebar {
    left: 0;
}

#check:checked~label #btn {
    left: 250px;
    opacity: 0;
    pointer-events: none;
}

#check:checked~label #cancel {
    left: 195px;
}

#check:checked~section {
    margin-left: 250px;
}

.topnav {
    overflow: hidden;
    position: fixed;
    top: 0;
    width: calc(100%);
    display: flex;
    justify-content: space-between;
    background: #063146;
    text-align: center;
    padding: 4px;
}

/* Style the links inside the navigation bar */
.topnav a {
    float: left;
    color: #f2f2f2;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;

}

/* Change the color of links on hover */
.topnav a:hover {
    color: black;
    background: grey;
}

/* Add a color to the active/current link */
.topnav a.active {
    background-color: #04AA6D;
    color: white;
}

.mr-10 {
    margin-right: 10px;
    color: white
}

.btn-logout {
    padding: 10px 15px;
    border-radius: 8px;
    border: none;
    color: #fff;
    background: #7745D6;
    font-size: 12px;
    font-weight: bold;
}
</style>
