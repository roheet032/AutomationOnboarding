<template>
<div class="tag-form">

    <modal v-if="modalVisible" name="addTagModal" :adaptive="true" width="300px" height="420px">
        <div class="form-overlay">
            <div class="form-container">
                <h2 class="form-title">New Tag</h2>
                <form @submit.prevent="submitForm">
                    <div class="form-group">
                        <label for="tagName">Tag Name:</label>
                        <input type="text" id="tagName" class="input-field" v-model="formData.tagName" required />
                    </div>
                    <div class="button-group">

                        <button class="add-button" type="submit">Add</button>
                        <button class="cancel-button" @click="cancelFormAndCloseModal">Cancel</button>

                    </div>
                </form>

            </div>
        </div>
    </modal>

</div>
</template>

<script>
export default {
    name: "TagForm",

    data() {
        return {
            modalVisible: false,
            formData: {
                tagName: "",  
            }
        };
    },
    methods: {
        showModal() {
            this.modalVisible = true; // Show the modal
        },
        closeModal() {
            this.modalVisible = false; // Close the modal
        },
        submitForm() {
            // Add your form submission logic here
            console.log("Form submitted:", this.formData);
            // Clear form fields after submission
            this.resetFormData();
        },
        cancelForm() {
            this.modalVisible = false; // Hide the modal
            this.resetFormData(); // Clear form fields on cancel
        },
        cancelFormAndCloseModal() {
            this.modalVisible = false; // Hide the modal
            this.$emit("close-modal"); // Emit event to close background blur
            this.resetFormData(); // Clear form fields on cancel
        },
        resetFormData() {
            this.formData.tagName = "";
      
        }
    }
};
</script>

<style scoped>
/*this form-overlay and form-container will show pop up form in center in all type of screen*/
.form-overlay {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 99;
}

.form-container {
    background-color: lightgray;
    border: 1px solid #ddd;
    border-radius: 8px;
    text-align: left;
    max-width: 400px;
    width: 100%;
    padding: 20px;
}

.form-title {
    font-size: 22px;
    margin-bottom: 15px;
    color: #333;

}

.input-field {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    transition: border-color 0.3s;
}

.input-field:focus {
    border-color: #007bff;
}

.button-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
}

.add-button,
.cancel-button {
    flex: 1;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s, color 0.3s;
}

.add-button {
    background-color: blue;
    color: white;
    margin-right: 15px;
    /* Adjust the spacing as needed */
}

.add-button:hover {
    background-color: #5345a0;
}

.cancel-button {
    background-color: red;
    color: white;
    margin-top: 10px;
}

.cancel-button:hover {
    background-color: darkred;
}
</style>
