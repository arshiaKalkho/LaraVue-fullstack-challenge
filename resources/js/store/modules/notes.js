import axios from "axios";

export const state = {
    notes: []
}

export const mutations = {
    setNotes(state, payload){
        state.notes = payload.data;
        state.userID = payload.user;
    },
    deleteNote(state, id){
        state.notes = state.notes.filter(el => el.id != id);
    }
}
export const getters ={
    notes: state => state.notes,
    noteById: (state) =>//not used
        (id) =>{
            console.log("called ")
            return state.notes.forEach(el => {
                if(el.id == id)
                    return el
            })
            
        }
}

export const actions ={
    async createNote({ dispatch }, payload) {
        await axios.post('/api/create', payload);
        dispatch('getNotes')
    },

    async getNotes({ commit }) {        
        axios.get('/api/notes').then(res => {
            commit("setNotes", res);
        });
    },

    async updateNote({ dispatch }, payload) {
        
        await axios.put(`/api/update/${payload.id}`,{
                'title':payload.title,
                'content':payload.content,
                'id':payload.id 
        } ,{
                headers:{
                    _method : "PUT",
                    //_Token : payload.xsrftkn//spoofing put request because of laravel,it requires xsrftkn from cookies which is passed along from edit componenet
                }
            }
            )
        dispatch('getNotes')
    },

    async deleteNote({ commit }, payload) {
        axios.delete(`/api/delete/${payload}`).then(res => {
            commit("deleteNote", payload);
        });
    }
}


