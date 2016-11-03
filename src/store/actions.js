import * as types from './mutation-types'
import md5 from 'blueimp-md5'
import _ from 'underscore'

export const connectUser = ({ commit, state }) => {
  if (state.user.connected) {
    commit(types.DISCONECT)
  } else {
    commit(types.CONNECTING)
    let opt = {
      type: "popup",
      name: "hipevideo",
      persist: false,
      scope:  { read: true, write: true, account: true },
      expiration: "1hour",
      success: () => {
        Trello.get("/search", {query: "HP_myData"}, (data) => {
          if (data.boards.length === 0) {
            Trello.post("/boards", {
              name: "HP_myData",
              defaultLists: false,
              prefs_permissionLevel: "public",
              prefs_comments: "public"
            }, (data) => {
              let id = data.id
              commit(types.USER_BOARD, { id }) 
            })
          } else {
            let id = data.boards[0].id
            commit(types.USER_BOARD, { id })
            Trello.get("/boards/"+id+"/members", (data) => {
              let nome = data[0].username
              commit(types.USER_NAME, { nome })
              Trello.get("/members/"+nome+"/email", (data) => {
                let email = data._value
                let img = "https://www.gravatar.com/avatar/"+md5(data._value)+"?s=250"
                commit(types.USER_EMAIL, { email })
                commit(types.USER_IMG, { img })
                commit(types.CONNECT)
                commit(types.CONNECTING)
              })
            })              
          }
        })
      }
    }
    Trello.authorize(opt)
  }
}

export const isDevice = ({ commit }) => {
  if (navigator.userAgent.match(/Tablet|iPad/i)) {
    commit(types.IS_DEVICE)
  } else if(navigator.userAgent.match(/IEMobile|Windows Phone|Lumia|Android|webOS|iPhone|iPod|Blackberry|PlayBook|BB10|Mobile Safari|Opera Mini|\bCrMo\/|Opera Mobi/i) ) {
    commit(types.IS_DEVICE)
  }
}

export const getHipervideos = ({ commit, state }) => {
  Trello.get(`/boards/${state.global.board}/lists`, (data) => {
    for (var i = 0; i < data.length; i++) {
      let h = data[i].id
      commit(types.HIPER_PUSH, { h })
    }
    componentHandler.upgradeDom()
    commit(types.IS_LOADED)
  })
}

const getData = ( desc ) => {
  return JSON.parse(desc)
}

const getElement = ( data, element ) => {
  var c = _.pluck(data, "name")
  var ind = []
  var elements = []
  for (var i = 0; i < c.length; i++) {
    if (c[i].split("-")[0] === element) {
      ind.push(i)
    }
  }
  for (var i = 0; i < ind.length; i++) {
    var el = getData(data[ind[i]].desc)
    el.card = data[ind[i]].id
    el.id = parseInt(data[ind[i]].name.split("-")[1])
    elements.push(el)
  }
  return elements
}

export const getHeaders = ({ commit }, data) => {
  let elements = JSON.parse(data)
  let element = 'headers'
  commit(types.ADD_ELEMENTS, { elements, element })
}

export const getEventos = ({ commit }, data ) => {
  let element = 'eventos'
  let elements = getElement(data, element)
  commit(types.ADD_ELEMENTS, { elements, element })
}

export const getCartelas = ({ commit }, data ) => {
  let element = 'cartelas'
  let elements = getElement(data, element)
  commit(types.ADD_ELEMENTS, { elements, element })
}

export const getPlugins = ({ commit }, data ) => {
  let element = 'plugins'
  let elements = getElement(data, element)
  commit(types.ADD_ELEMENTS, { elements, element })
}

export const resetHiper = ({ commit }) => {
  commit(types.RESET_HIPER)
}

export const openDrawer = ({ commit, state }) => {
  if (state.global.drawer) {
    commit(types.CLOSE_DRAWER)
  } else {
    commit(types.OPEN_DRAWER)
  }
}

export const changeQual = ({ commit, state }, qual) => {
  if (state.global.qualidade !== parseInt(qual)) {
    commit(types.CHANGE_QUAL, {qual})
  }
}

export const changeAcess = ({ commit, state }, acess) => {
  if (state.global.qualidade !== parseInt(acess)) {
    commit(types.CHANGE_ACESS, {acess})
  }
}

export const play = ({ commit }) => {
  let s = true
  commit(types.MEDIA_PLAY, { s })
}

export const pause = ({ commit }) => {
  let s = false
  commit(types.MEDIA_PLAY, { s })
}

export const videoLoad = ({ commit }) => {
  commit(types.MEDIA_LOAD)
}

export const openInfo = ({ commit }, info ) => {
  commit(types.INFO_OPEN , { info })
}

export const showMais = ({ commit }) => {
  let info = true
  commit(types.SAIBA_MAIS , { info })
  setTimeout( () => {
    info = false
    commit(types.SAIBA_MAIS , { info })
  },3000)
}

export const attachEvents = ({ commit, state }) => {
  let popcorn = Popcorn("#video_player")

  let timecodes = []
  for (var i = 0; i < state.hv.eventos.length; i++) {
    var a = state.hv.eventos[i].timecode
    a.id = state.hv.eventos[i].id
    timecodes.push(a)
  }

  timecodes.map(function(event){
    popcorn.code({
      start: event.start,
      end: event.end,
      onStart: function() {
        commit(types.ADD_EVENT , { id: event.id })
      },
      onEnd: function() {
        commit(types.REMOVE_EVENT, { device: state.global.device})
      }
    });
    return event
  });
}