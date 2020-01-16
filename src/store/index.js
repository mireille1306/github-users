import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    api: {
      users: 'http://localhost:8080/users?location=amsterdam',
      user: 'http://localhost:8080/user?name='
    },
    loading: true,
    error: false,
    errorMessage: '',
    users: [],
    singleUser: {},
    singleUsersCache: {},
    query: ''
  },

  mutations: {
    setLoading (state, value) {
      state.loading = value;
    },

    setAllUsers (state, value) {
      state.users = value;
    },

    setSingleUser (state, data) {
      state.singleUser = data;
    },

    saveSingleUsers (state, data) {
      state.singleUsersCache[data.userName] = data.data;
    },

    clearSingleUser (state) {
      state.singleUser = {};
    },

    setError (state, data) {
      state.error = data.status !== 200;
      state.errorMessage = data.data;
    },

    setQuery (state, value) {
      state.query = value;
    }
  },

  actions: {
    getAllUsers (store) {
      if (!store.state.users.length) {
        Axios.get(store.state.api.users).then(response => {
          store.commit('setAllUsers', response.data.items);
          store.commit('setLoading', false);
        }).catch(error => {
          store.commit('setError', error.response);
          store.commit('setLoading', false);
        })
      }
    },

    getSingleUser (store, userName) {
      if (!store.state.singleUsersCache[userName]) {
        store.commit('setLoading', true);
        Axios.get(store.state.api.user + userName).then(response => {
          store.commit('setSingleUser', response.data);
          store.commit('saveSingleUsers', {
            userName: userName,
            data: response.data
          })
          store.commit('setLoading', false);
        }).catch(error => {
          store.commit('setError', error.response);
          store.commit('setLoading', false);
        })
      } else {
        store.commit('setSingleUser', store.state.singleUsersCache[userName]);
      }
    }
  },

  modules: {}
})