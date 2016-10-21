<template>
  <div class="hipervideo">

    <div v-if="headers" id="player" ref="player">

      <div id="screen">
        <video id="video_player" ref="engine" controls="">
          <source id="mp4" :src="headers.url + '_normal_baixa.mp4'" type="video/mp4">
        </video>
      </div>

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
      playing: false
    }
  },

  watch: {
    playing: function (val, oldVal) {
      if (val) {
        this.$refs.engine.play()
      } else {
        this.$refs.engine.pause()
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
#status {
  width: 100%;
  height: 100%;
  position: absolute;
  background: rgba(0,0,0,.3);
  z-index: 0;
  opacity: 1;
  transition: opacity .5s;
  &.hide {
    opacity: 0;
  }
  .play_pause {
    color: white;
    font-size: 65px;
    top: 33%;
    position: absolute;
    left: 40%;
    opacity: .5;
  }
  .play {
    @extend .play_pause;
    opacity: 1;
  }
  .pause {
    @extend .play_pause;
  }
  .loader {
    @extend .play_pause;
    left: 43%;
    font-size: 55px;
  }
}
#video_player {
  width: 100%;
}
#screen {
  position: absolute;
}
#video_controls {
  width: 100%;
  height: 100%;
  position: absolute;
}
#timeline {
  width: 100%;
  height: 100%;
  position: absolute;
  &.seeking {
    #back {
      border-bottom: 6px solid black;
      height: 98%;
      background: rgba(0, 0, 0, 0.1);
    }
    #fill {
      border-bottom: 6px solid red;
      height: 98%;
      background: rgba(0, 0, 0, 0.1);
    }
    #handle {
      transform: scale(1);
    }
  }
}
#back {
  transition: border-bottom .3s, height .3s, background .3s;
  position: absolute;
  width: 100%;
  border-bottom: 3px solid black;
  height: 99%;
  background: rgba(0, 0, 0, 0);
}
#fill {
  transition: border-bottom .3s, height .3s, background .3s;
  position: absolute;
  background: rgba(0, 0, 0, 0);
  border-bottom: 3px solid red;
  height: 99%;}
#handle {
  transition: transform .3s;
  transform: scale(0);
  position: fixed;
  left: 49%;
  color: transparent;
  font-size: 25px;
  top: 37.5%;
  background: red;
  height: 15px;
  width: 15px;
  border-radius: 50%;
}
#buffer {
  position: fixed;
  background: rgba(0, 0, 0, 1);
  height: 100%;
  width: 100%;
  top: 0;
  z-index: 1;
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
</style>