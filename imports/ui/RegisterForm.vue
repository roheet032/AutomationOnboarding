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
export default {

    data() {
        return {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: "",
            organizationId:"",
            roles: ["KeelaAdmin"],
            
        };
        
    },

    methods: {
        submitForm() {
            if (this.password !== this.confirmPassword) {
                alert("Passwords do not match.");
                return;
            }

            const userData = {

                email: this.email,
                password: this.password,
                profile: {
                    role: this.role,
                    name: this.name,
                    organizationId:this.organizationId
                },

            };

            Accounts.createUser(userData, (error) => {
                if (error) {
                    console.log(error.reason);
                    alert("User creation failed: " + error.reason);     //show error message if email is already exist

                } else {
                    console.log(userData)
                    alert('User created successfully');
                    this.$router.push({
                        name: 'login'
                    });
                }
            });
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
