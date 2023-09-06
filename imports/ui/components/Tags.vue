<template>
<div>
    <Sidebar />

    <div class="container">
        <div class="main-content">
        <modal name="addContactModal" :adaptive="true" width="400px" height="280px">
            <div class="addContactModal">
                <button class="add-button" @click="openAddTagModal">Create Tag</button>
                <div class="tag-container">
                    <table class="contact-table">
                    <thead>
                        <tr>
                            <th>Tag Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(tag, index) in tags" :key="index">
                            <td>{{ tag.tagName }}</td>
                            
                            <td>
                                <button class="edit-button" @click="openEditTagModal(tag)">Edit</button>
                                <button class="delete-button" @click="deleteTag(tag._id)">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table></div>
                
                <TagForm @tags-added="handleTagsAdded" @tags-updated="handleTagsUpdated"  ref="tagForm"  @close-modal="isModalOpen = false" />
            </div>
        </modal>
    </div>
    </div>

</div>
</template>

    
<script>
import Sidebar from "./../Sidebar.vue";
import TagForm from "./../Forms/TagForm.vue";
import { Meteor } from 'meteor/meteor';
import { TagsCollection } from "../../api/Collection/TagsCollection";

export default {
    name: "Tags",
    components: {
        Sidebar,
        TagForm
    },
    data() {
        return {
            currentUser: null,
            isModalOpen: false
        };
    },
    meteor: {
        $subscribe: {
            tags: []
        },
        tags() {
        const user = Meteor.user();
        if (user && user.profile.organizationName) {
            return TagsCollection.find({ organizationName: user.profile.organizationName }).fetch();
        }
        return [];
    }
    },
    methods: {
        openAddTagModal() {
            this.isModalOpen = true;
            this.$refs.tagForm.showModal(); // Call showModal() method in TagForm
            this.$refs.tagForm.clearForm();

           
        },
        openEditTagModal(tag) {
            this.isModalOpen = true;
            this.$refs.tagForm.mode = 'edit'; // Set mode to 'edit' in TagForm
            this.$refs.tagForm.showModal(); // Call showModal() method in TagForm
            this.$refs.tagForm.populateForm(tag);
            //put database data into form 

        },
        handleTagsAdded() {
            this.isModalOpen = false; // Close the modal after inserting value in form
        },
        handleTagsUpdated(){
            this.isModalOpen = false; 
            this.$refs.tagForm.clearForm();
        },
       
        deleteTag(tagId) {
            Meteor.call('tags.remove', tagId, (error) => {
                if (error) {
                    console.error('Delete error:', error);
                }
            });
        },
        getUser() {
            const currentUser = Meteor.user();
            if (currentUser) {
                this.currentUser = {
                    profile: currentUser.profile
                };
            }
        },
        created() {
        this.getUser();
    },

    }
};
</script>

    
<style scoped>


.tag-container {
  margin-top: 50px; 
  max-height: calc(80vh - 50px); 
  overflow-y: auto;
  border: 1px solid #ddd; 
}
.container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between; 
    height: 300px;
    margin-left:200px;
  
}

.main-content {
    display: flex;
    flex-direction: column;
    align-items: center; 
    justify-content: center; 
    flex: 1; 
    padding: 10px; 
    margin:60px;

}


.contact-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

th,
td {
    padding: 12px 15px;
    text-align: center;
    border: 1px solid #ddd;
}

th {
    background-color: #f2f2f2;
}

button {
    padding: 6px 12px;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    margin-right: 5px;
}

button.edit-button {
    background-color: blue;
    color: white;
}

button.delete-button {
    background-color: #f44336;
    color: white;
}

.add-button {
    float: right;
    margin-top: -50px;
    margin-bottom: 5px;
    background-color: #7745D6;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 6px 12px;
    cursor: pointer;
}

@media (max-width: 768px) {
    .container {
        flex-direction: column; 
    }

    .main-content {
        position: relative;
        top: 0;
        right: 0;
    }
}
</style>
