import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import axios from "../axios-auth.js";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usersList: [],
    items_per_page: 0
  },

  getters: {
    getUsersList(state) {
        return state.usersList
    },
    getItemsPerPage(state)
    {
      return state.items_per_page
    }
  },

  mutations: {
    setUsersList(state, users) {
      state.usersList = users
    },
    setItemsPerPage(state, ammount) {
      state.items_per_page = ammount
    },
    deleteUserById(state, id)
    {
      var removeIndex = state.usersList.map(item => item.id).indexOf(id)
      ~removeIndex && state.usersList.splice(removeIndex, 1)
    },
    editUserDataById(state, userData)
    {
      var editIndex = state.usersList.map(item => item.id).indexOf(userData.id)
      state.usersList[editIndex].email = userData.email
      state.usersList[editIndex].first_name = userData.firstName
      state.usersList[editIndex].last_name = userData.lastName
    },
    createUser(state, userData)
    {
      const maxUserId = state.usersList.reduce(
        (max, character) => (character.id > max ? character.id : max),
        state.usersList[0].id
      )
      userData.id = maxUserId + 1;     

      state.usersList.push(userData)
    }
  },

  actions: {
    setUsersList({ commit }, users) {
      commit('setUsersList', users)
    },
    deleteUserById({ commit }, id) {
      commit('deleteUserById', id)
    },
    editUserDataById({ commit }, userData)
    {
      commit('editUserDataById', userData)
    },
    createUser({ commit }, userData)
    {
      commit('createUser', userData)
    },
    searchUsers( {dispatch} ) {
      if (this.state.usersList.length == 0)
        dispatch('getUsersFromApi')
    },
    getUsersFromApi({ commit }) {
       axios.get('/users')
       .then(function(response) {
          if (response.data!=null)
          {            
            commit('setUsersList', response.data.data)
            commit('setItemsPerPage', response.data.per_page)
          }
        })
       .catch(function(error){
          console.log(error)               
      })
    },
    loadUsers( {commit}, data) {
      commit('setUsersList', data.data)
      commit('setItemsPerPage', data.per_page)
    }
  },

  plugins: [createPersistedState()]
})
