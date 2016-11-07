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
  seek: 0,
  info_open: false,
  saiba_mais: false,
  popcorn: null,
  ev_attached: false,
  content_blocks: [],
  conteudo: null,
  cartela: null,
  cartela_open: null,
  link: null
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
    state.seek = 0
    state.info_open = false
    state.saiba_mais = false
    state.popcorn = null
    state.ev_attached = false
    state.content_blocks = []
    state.conteudo = null
    state.link = null
    state.cartela_open = null
    state.cartela = null
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

  [types.EVENT_SEEK] (state, { start }) {
    state.seek = start
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
      state.pause_state = false
      if (state.link) {
        state.link = null
      }
      if (state.conteudo) {
        state.conteudo = null
      }
    }
  },

  [types.SAIBA_MAIS] (state, { info }) {
    state.saiba_mais = info
  },

  [types.EVENTS_ATTACHED] (state) { 
    state.ev_attached = true
  },

  [types.ADD_EVENT] (state, { id }) {
    
    if (state.content_blocks.lenght !== 0) {
      state.content_blocks.splice(0)
    }
    addEvent(state, id)
  },

  [types.REMOVE_EVENT] (state, device) {
    if (!device) {
      state.content_blocks.splice(0)
    }
  },

  [types.ADD_CARTELA] (state, { id }) { 
    let node = state.cartelas.find(p => p.id === id)
    state.cartela = node
  },

  [types.REMOVE_CARTELA] (state) {
    state.cartela = null
  },

  [types.CARTELA_OPEN] (state, { id }) {
    let node = state.cartelas.find(p => p.id === id)
    state.cartela_open = node
    state.info_open = true
    if (state.playing) {
      state.pause_state = state.playing
      state.playing = false
    }
  },

  [types.CARTELA_CLOSE] (state) {
    state.cartela_open = null
  },

  [types.VIEW_LINK] (state, { link }) { 
    if (!state.info_open) {
      state.info_open = true
    } else {
      if (state.playing) {
        state.pause_state = state.playing
        state.playing = false
      }
    }
    state.link = link
  },

  [types.CLOSE_LINK] (state) {
    if (!state.conteudo) {
      state.info_open = false
    }
    state.link = null
  }

}

function addEvent (state, id) {
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

export default {
  state,
  mutations
}
