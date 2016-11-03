import * as types from '../mutation-types'

// initial state
const state = {
  headers: null,
  plugins: null,
  eventos: null,
  cartelas: null,
  playing: false,
  video_load: false,
  pause_state: false,
  info_open: false,
  saiba_mais: false,
  popcorn: null,
  content_blocks: [],
  conteudo: null
}

// mutations
const mutations = {
  [types.ADD_ELEMENTS] (state, { elements, element }) {
    state[element] = elements
  },

  [types.RESET_HIPER] (state) {
    state.headers = null
    state.plugins = null
    state.eventos = null
    state.cartelas = null
    state.playing = false
    state.video_load = false
    state.pause_state = false
    state.info_open = false
    state.saiba_mais = false
    state.popcorn = null
    state.content_blocks = []
    state.conteudo = null
  },

  [types.OPEN_DRAWER] (state) {
    state.pause_state = state.playing
    state.playing = false
  },

  [types.CLOSE_DRAWER] (state) {
    state.playing = state.pause_state
  },

  [types.MEDIA_PLAY] (state, { s }) {
    state.playing = s
  },

  [types.MEDIA_LOAD] (state) {
    state.video_load = false
  },

  [types.MEDIA_LOADED] (state) {
    state.video_load = true
  },

  [types.INFO_OPEN] (state, { info }) {
    state.info_open = info
    if (info) {
      state.pause_state = state.playing
      state.playing = false
      let id = state.content_blocks[0].id
      let node = state.eventos.find(p => p.id === id)
      state.conteudo = node.conteudo
    } else {
      state.playing = state.pause_state
    }
  },

  [types.SAIBA_MAIS] (state, { info }) {
    state.saiba_mais = info
  },

  [types.ADD_EVENT] (state, { id }) { 
    state.saiba_mais = false
    addEvent(state, id)
  },

  [types.REMOVE_EVENT] (state, device) {
    if (!device) {
      removeEvent(state)
    }
  }

}

function addEvent (state, id) {
  if (state.content_blocks.lenght !== 0) {
    state.content_blocks.shift()
  }
  let node = state.eventos.find(p => p.id === id)
  state.content_blocks.unshift({
    id: node.id,
    card: node.card,
    title: node.title,
    type: node.component.type,
    start: node.timecode.start,
    end: node.timecode.end,
    fields: node.component.fields
  })
}

function removeEvent (state) {
  state.content_blocks.shift()
}

export default {
  state,
  mutations
}
