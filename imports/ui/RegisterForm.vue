<template>
<div class="register-container">
    <div class="image-container">
        <img class="image1" src="keelalogo.png" alt="">
    </div>

    <div class="form-container">
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
            <div class="form-group">
                <label for="role">Role</label>
                <div class="input-field">
                    <select v-model="role" required>
                        <option v-for="roleOption in roles" :key="roleOption" :value="roleOption">
                            {{ roleOption }}
                        </option>
                    </select>
                </div>
            </div>
            <button class="registerbtn" type="submit">Register</button>
        </form>
    </div>
</div>
</template>

  
<script>
import {
    Meteor
} from "meteor/meteor";
import {
    RegisterCollection
} from "../api/Collection/RegisterCollection";


export default {
    created() {
    // Subscribe to the 'userData' publication
    this.userDataSubscription = Meteor.subscribe('userData');
  },

  destroyed() {
    // Stop the subscription when the component is destroyed
    this.userDataSubscription.stop();
  },
    data() {
        return {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: "",
            roles: ["Admin", "Coordinator", "KeelaAdmin"],
        };
    },

    methods: {
    submitForm() {
        if (this.password !== this.confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        const userData = {
            name: this.name,
            email: this.email,
            password: this.password,
            role: this.role,
        };

        // Call your registration API or Meteor method here
        Meteor.call("users.register", userData, (error, userId) => {
            if (error) {
                alert("Email already exists");
            } else {
                // Assign the selected role to the registered user
                RegisterCollection.update(userId, { $set: { role: this.role } });

                alert("Account created successfully!!!");
                this.$router.push('/login');
                // Manually redirect to the login page using window.location
                // window.location.href = '/login'; // Replace with the actual login route
            }
        });

        // Insert user data into the RegisterCollection
        RegisterCollection.insert(userData);
    },
},

};
</script>

  
<style scoped>
.register-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f7f7f7;
}

.image-container {
    text-align: center;
    padding-right: 20px;
}

.image1 {
    max-width: 100%;
    height: auto;
}

.form-container {
    max-width: 400px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

.form-group {
    margin-bottom: 20px;
}

label {
    font-weight: bold;
}

input[type="text"],
input[type="email"],
input[type="password"],
select {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.registerbtn {
    background-color: #7745d6;
    color: #fff;
    padding: 12px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    width: 100%;
    transition: background-color 0.3s ease;
}

.registerbtn:hover {
    background-color: #622cc9;
}

.input-field {
    position: relative;
}

.select-icon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
}
</style>
