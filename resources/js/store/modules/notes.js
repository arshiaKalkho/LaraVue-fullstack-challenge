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
    notes: state => state.notes
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
        
        await axios.put(`/api/update/${payload.id}`,
            payload ,{
                headers:{
                    _method : "PUT",
                    _Token : this.$cookies.get("XSRF-TOKEN")
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


