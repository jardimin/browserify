import * as types from '../mutation-types'

// initial state
const state = {
  board: 'O62BDMJt',
  trelloId: '47ba9fe4f814b2a8ebaaa862a6c86a74',
  hipervideos: [],
  loaded: false,
  drawer: false,
  device: false,
  qualidade: 0,
  acessibilidade: 'normal'
}

// mutations
const mutations = {
  [types.IS_DEVICE] (state) {
    state.device = true
  },

  [types.IS_LOADED] (state) {
    state.loaded = true
  },

  [types.OPEN_DRAWER] (state) {
    state.drawer = true
  },

  [types.CLOSE_DRAWER] (state) {
    state.drawer = false
  },

  [types.CHANGE_QUAL] (state, { qual }) {
    state.qualidade = qual
    document.cookie = "qualidade=" + qual
  },

  [types.CHANGE_ACESS] (state, { acess }) {
    state.acessibilidade = acess
    document.cookie = "acessibilidade=" + acess
  },

  [types.HIPER_PUSH] (state, { h }) {
    state.hipervideos.push(h)
  }
}

export default {
  state,
  mutations
}
