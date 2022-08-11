import { createStore } from 'vuex'

export default createStore({
  state: {
    lat: undefined,
    history: undefined
  },
  getters: {
    getLat: (state) => state.lat,
    getHistory: (state) => state.history
  },
  mutations: {
    SET_LAT(state, payload) {
      state.lat = payload
    },
    SET_HISTORY(state, payload) {
      state.history = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
