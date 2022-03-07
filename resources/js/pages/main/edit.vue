<template lang="">
    <div>
        <div class="container " style="width:100%">
            <form  @submit="onSubmit" class="d-grid">
            <div class="mb-3">
                <label for="title" class="form-label">Enter Title:</label>
                <input v-model="title" class="form-control" id="title" >
            </div>
            <div class="mb-3">
                <label for="content" class="form-label">Content: </label>
                <textarea v-model="content" class="form-control"  rows="3"></textarea>
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
import {mapGetters} from 'vuex';
export default {
    name:"edit",
    props:{
        idToEdit:{required:true}
    },
    async mounted() {
        await this.$store.dispatch("notes/getNotes");
        let note = notes.find(element => element.id === this.idToEdit)
        this.title = note.title;
        this.content = note.content;
        this.id = note.id;
    },
    computed:mapGetters({notes:"notes/notes"}),
    data(){
        return{
            title:"",
            content:"",
            id:"",
            err:""
        }
    },
    methods:{
        onSubmit(e) {
            
            e.preventDefault();
            if(this.title && this.content){
                this.$store.dispatch("notes/updateNote",{'title':this.title, 'content':this.content, 'id':this.idToEdit });
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
