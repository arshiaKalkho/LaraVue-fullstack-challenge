<template lang="">
    <div class="container " style="width:100%">
        <h2 class="dark">Notes</h2>
        <form  @submit="onSubmit" class="d-grid">
            <div class="mb-3">
                <label for="title" class="form-label">Enter Title:</label>
                <input v-model="title" class="form-control" id="title" >
            </div>
            <div class="mb-3">
                <label for="content" class="form-label">Content: </label>
                <textarea   v-model="content" class="form-control"  rows="3"></textarea>
            </div>
            
            <div v-if="err" class=" rounded mb-3 alert alert-danger" role="alert">
               * {{err}}
            </div>
            <div v-if="success" class=" rounded mb-3 alert alert-success" role="alert">
                - {{success}}
            </div>
            <button type="submit" class=" mb-5 btn btn-primary">Add Note</button>
        </form>
        <div v-for="note in notes" :key="note.id">
            <div class="rounded-lg p-3 mb-2 border d-flex flex-column  justify-content-center align-items-center bg-light position-relative">
                
                <h5 class="card-title">{{note.title}}</h5>
                <p class="card-text">{{note.content}}</p>
                
                <i @click="deletePost(note.id)" class="fa-solid fa-trash-can fa-xs"  role="button"></i>
                
                <i @click="redirToEdit(note.id)" class="fa-solid fa-pencil fa-xs position-absolute" style="top:7px; right:7px" role="button"></i>
                
            </div>
        </div>
        
        
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    name:"notes",
    async mounted() {
        await this.$store.dispatch("notes/getNotes");
    },
    data(){
        return{
            title:"",
            content:"",
            err:"",
            success:""
        }
    },
    methods:{
        
        onSubmit(e) {
            
            e.preventDefault();
            if(this.title && this.content){
                this.$store.dispatch("notes/createNote",{'title':this.title, 'content':this.content });
                this.title = ""
                this.content =""
                this.err = ""
                this.success = `note created`
            }else
                this.err = "please fill both fields";
        },
        deletePost(id){
            this.$store.dispatch("notes/deleteNote",id)
            this.success = `note with id: ${id} deleted `
        },
        redirToEdit(id){
            this.$router.push(`/edit/${id}`);
        }
    },
    
    computed:mapGetters({notes:"notes/notes"}),
    metaInfo() {
        return { title: this.$t("note") };
    }
}
</script>
