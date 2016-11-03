import * as types from '../mutation-types'

// initial state
const state = {
  connected: false,
  connecting: false,
  user_board: '',
  nome: '',
  email: '',
  img: ''
}

// mutations
const mutations = {
  [types.CONNECT] (state) {
    state.connected = true
  },

  [types.CONNECTING] (state) {
    state.connecting = !state.connecting
  },

  [types.USER_BOARD] (state, { id }) {
    state.user_board = id
  },

  [types.USER_NAME] (state, { nome }) {
    state.nome = nome
  },

  [types.USER_EMAIL] (state, { email }) {
    state.email = email
  },

  [types.USER_IMG] (state, { img }) {
    state.img = img
  },

  [types.DISCONECT] (state) {
    state.connected = false
    state.user_board = ''
    state.nome = ''
    state.email = ''
    state.img = ''
  }
}

export default {
  state,
  mutations
}
