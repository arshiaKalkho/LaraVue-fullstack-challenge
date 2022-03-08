<template lang="">
    <div>
        <div class="container " style="width:100%">
            <form  @submit="onSubmit" class="d-grid">
            <div class="mb-3">
                <label for="title" class="form-label">Enter Title:</label>
                <input v-model="note.title" class="form-control" id="title" >
            </div>
            <div class="mb-3">
                <label for="content" class="form-label">Content: </label>
                <textarea v-model="note.content" class="form-control"  rows="3"></textarea>
            </div>
            
            <div v-if="err" class=" rounded mb-3 alert alert-danger" role="alert">
               * {{err}}
            </div>
            <button type="submit" class=" mb-5 btn btn-primary">Edit </button>
        </form>
        </div>
    </div>
</template>
<script>
import axios from "axios"
export default {
    name:"edit",
    props:{
        idToEdit:{required:true}
    },
    async mounted() {
        await this.$store.dispatch("notes/getNotes");
        
    }, 
    async created(){
        await this.getNote()
    },
    
    data(){
        return{
            note:{
                title:"loading...",
                content:"loading...",
                id:this.idToEdit
            },
            err:""
        }
    },
    methods:{
        async getNote(){
            axios.get(`/api/note/${this.idToEdit}`).then(res => {
            
            this.note.title = res.data?.note?.title;
            this.note.content = res.data?.note?.content
            
            if(!res.data.note)
                this.err = " the chosen record doesn't exist!"
        });
        },
        onSubmit(e) {
            
            e.preventDefault();
            if(this.note.title || this.note.content){
                this.$store.dispatch("notes/updateNote",{
                    'title':this.note.title,
                    'content':this.note.content,
                    'id':this.idToEdit, 
                    });
                this.$router.push('/notes');
            }else
                this.err = "please fill both fields";
        },
    },
    metaInfo() {
        return { title: this.$t("edit") };
    }
}
</script>
