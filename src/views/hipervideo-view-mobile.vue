<template>
  <div class="hipervideo">

    <div v-if="headers" id="player" ref="player">

      <div id="screen">
        <video id="video_player" ref="engine" controls="">
          <source id="mp4" :src="headers.url + '_normal_baixa.mp4'" type="video/mp4">
        </video>
      </div>

    </div>
    <header id="header" v-show="video_load" class="mdl-layout__header" style="display: block;">
      <div aria-expanded="false" role="button" tabindex="0" class="mdl-layout__drawer-button" @click="openDrawer"><i class="material-icons">menu</i></div>
      <div class="mdl-grid">
        <div class="mdl-cell mdl-cell--1-col">
          <div class="event_left"><i class="material-icons">keyboard_arrow_left</i></div>
        </div>
        <div class="mdl-cell mdl-cell--2-col">
          <div class="event_up">Teste</div>
        </div>
        <div class="mdl-cell mdl-cell--1-col">
          <div class="event_right"><i class="material-icons">keyboard_arrow_right</i></div>
        </div>
      </div>
    </header>
    <main v-if="headers" class="mdl-layout__content">
      <div class="page-content">
        <div class="mdl-grid">
          <div class="mdl-cell mdl-cell--12-col">
            <div>{{headers.descricao}}</div>
          </div>
        </div>
      </div>
    </main>
    <div id="info" :style="{bottom: bottom_default + touch_slide + info_offset +'px'}" :class="[{touch: touch},{open: info_open}]">
      <div class="handle" @touchstart.prevent="touchStart" @touchend.prevent="touchEnd" @touchmove.prevent="touchMove" :class="{saiba: saiba_mais}">
        <i class="material-icons">keyboard_arrow_up</i>
        <transition name="saiba">
          <div v-if="saiba_mais" class="saiba-mais">SAIBA MAIS</div>
        </transition>
      </div>
      <div class="body"></div>
    </div>
    <transition name="fade">
      <div id="buffer" v-if="!video_load">
        <i class="fa fa-refresh fa-spin refresher" aria-hidden="true"></i>
      </div>
    </transition>

  </div>
</template>

<script>
import _ from 'underscore'

export default {
  props: {
    loaded: Boolean,
    connected: Boolean,
    hipervideos: Array,
    device: Boolean
  },

  data () {
    return {
      headers: null,
      plugins: null,
      eventos: null,
      cartelas: null,
      video_load: false,
      playing: false,
      touch: false,
      touch_point: 0,
      touch_slide: 0,
      touch_time: 0,
      bottom_default: -480,
      info_open: false,
      info_offset: 0,
      saiba_mais: false
    }
  },

  watch: {
    playing: function (val, oldVal) {
      if (val) {
        this.$refs.engine.play()
      } else {
        this.$refs.engine.pause()
      }
    }, 
    info_open: function (val, oldVal) {
      if (val) {
        this.info_offset = 480
        this.saiba_mais = false
      } else {
        this.info_offset = 0
      }
    }, 
    saiba_mais: function (val, oldVal) {
      if (val) {
        this.bottom_default = -460
      } else {
        setTimeout( () => {
          this.bottom_default = -480
        }, 300)
      }
    }
  },

  methods: {
    getData (desc) {
      return JSON.parse(desc)
    },
    getElement (data, element) {
      var c = _.pluck(data, "name")
      var ind = []
      var elements = []
      for (var i = 0; i < c.length; i++) {
        if (c[i].split("-")[0] === element) {
          ind.push(i)
        }
      }
      for (var i = 0; i < ind.length; i++) {
        var el = this.getData(data[ind[i]].desc)
        el.card = data[ind[i]].id
        el.id = parseInt(data[ind[i]].name.split("-")[1])
        elements.push(el)
      }
      return elements
    },
    openDrawer () {
      this.$parent.$parent.drawer = true
      console.log(this.$parent.drawer)
    },
    showMais () {
      this.saiba_mais = true
      setTimeout( () => {
        this.saiba_mais = false
      },5000)
    },
    touchStart (e) {
      this.touch = true
      this.touch_point = e.changedTouches[0].clientY
      this.touch_time = e.timeStamp
    },
    touchMove (e) {
      this.touch_slide = -(e.changedTouches[0].clientY - this.touch_point)
    },
    touchEnd (e) {
      this.touch = false
      if ( this.touch_slide > 100 ) {
        this.info_open = true
      } else if ( this.touch_slide < -100 ) {
        this.info_open = false
      } else if ( e.timeStamp - this.touch_time < 200 ) {
        this.info_open = !this.info_open
      }
      this.touch_point = 0
      this.touch_slide = 0
    }
  },

  created: function () {
    this.$nextTick( () => {
      Trello.get(`/lists/${this.$route.params.id}/cards`, (data) => {
        let head = _.findWhere(data, { "name": "headers" })
        this.headers = JSON.parse(head.desc)
        this.plugins = this.getElement(data, 'plugins')
        this.eventos = this.getElement(data, 'eventos')
        this.cartelas = this.getElement(data, 'cartelas')
      })
    })
  },

  mounted: function () {
    this.$nextTick( () => {
      
    })
  },

  updated: function() {
    this.$nextTick(function () {
      componentHandler.upgradeDom()
      if (!this.video_load) {
        this.$refs.engine.load()
        setTimeout( () => {
          this.showMais()
        }, 2000)
      }
    })

    this.$refs.engine.addEventListener('canplaythrough', (e) => {
      this.video_load = true
    })

  }

}
</script>

<style lang="scss">
#player {
  width: 100%;
  height: 202.5px;
  overflow: hidden;
  position: relative;
}
#video_player {
  width: 100%;
}
#screen {
  position: absolute;
}
.mdl-layout__header {
  .mdl-layout__drawer-button {
    @media screen and (max-width: 1024px) {
      margin: 4px;
      position: fixed;
      border-radius: 50%;
      transform: scale(.8);
    }
  }
}
#header {
  min-height: 56px;
  height: 56px;
  .mdl-cell--1-col {
    @media (max-width: 479px) {
      width: calc(10% - 16px);
    }
  }
  .mdl-cell--2-col {
    @media (max-width: 479px) {
      width: calc(80% - 16px);
    }
  }
  .event_up {
    text-align: center;
    font-size: 20px;
  }
}
#buffer {
  position: fixed;
  background: rgba(0, 0, 0, 1);
  height: 100%;
  width: 100%;
  top: 0;
  z-index: 5;
  left: 0;
  opacity: 1;
  &.fade-enter-active, &.fade-leave {
    opacity: 1;
    transition: opacity .5s ease .3s;
  }
  &.fade-leave-active, &.fade-enter {
    opacity: 0;
    transition: opacity .5s ease .3s;
  }
  .refresher {
    position: absolute;
    color: white;
    font-size: 50px !important;
    background: transparent;
    left: 45%;
    top: 40%;
  }
}
.video_load-enter-active, .video_load-leave {
  &.play {
    transition: opacity .5s, transform .5s;
    transform: scale(2);
    opacity: .5;
  }
  &.pause {
    transition: opacity .1s, transform .1s;
    transform: scale(1);
    opacity: .5;
  }
}
.video_load-leave-active, .video_load-enter {
  &.play {
    transition: opacity .1s, transform .1s;
    transform: scale(1);
    opacity: 0;
  }
  &.pause {
    transition: opacity .1s, transform .1s;
    transform: scale(1.1);
    opacity: 0;
  }  
}
.video_load-leave {
  &.play {
    transition: opacity 0s, transform 0s;
    transform: scale(1);
    opacity: .5;
  }
}
.video_load-leave-active {
  &.play {
    transition: opacity 0s, transform 0s;
    transform: scale(1);
    opacity: 0;
  }  
}
.video_load-enter-active {
  &.pause {
    transition: opacity .1s, transform .1s;
    transform: scale(1);
    opacity: .5;
  }  
}
.video_load-enter {
  &.pause {
    transition: opacity .1s, transform .1s;
    transform: scale(2);
    opacity: 0;
  }
}
#info {
  transition: bottom .2s;
  position: fixed;
  bottom: -480px;
  width: 100%;
  height: 100%;
  background: white;
  z-index: 3;
  &.touch {
    transition: none;
  }
  &.open {
    .material-icons {
      transform: rotate(180deg);
    }
  }
  .handle {
    height: 32px;
    width: 100%;
    box-shadow: 0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12),0 -3px 5px -1px rgba(0,0,0,.2);
    background: #D1C4E9;
    &.saiba {
      height: 45px;
    }
    .material-icons {
      transition: transform .3s;
      margin-left: 45%;
      font-size: 40px;
      margin-top: -3px;
    }
    .saiba-mais {
      height: 20px;
      width: 100%;
      font-size: 20px;
      text-align: center;
      margin-top: -12px;
      padding-top: 1px;
      font-weight: 900;
      background: red;
      color: white;
      transition: background .2s, font-size .3s ease .2s, padding-top .3s ease .2s;
      &.saiba-enter-active, &.saiba-leave.saiba-leave-active {
        background: red;
        font-size: 20px;
        padding-top: 1px; 
      }
      &.saiba-leave-active, &.saiba-enter {
        transition: background .2s ease .3s, font-size .3s, padding-top .3s;
        background: transparent;
        font-size: 0px;
        padding-top: 5px;
      }
    }
  }
}
</style>