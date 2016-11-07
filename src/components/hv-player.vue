<template>

  <div v-if="hv.headers" id="player" ref="player" :style="{height: height + 'px'}">

    <div id="screen">
      <video id="video_player" ref="engine" controls="">
        <source id="mp4" :src="hv.headers.url + '_' + acessibilidade + '_' + qualidade + '.mp4'" type="video/mp4">
      </video>
    </div>

    <div v-if="!device" id="status" :class="{hide: playing}">
      <transition name="video_load">
        <i v-if="playing" class="play material-icons" key="play">play_arrow</i>
        <i v-else class="pause material-icons" key="pause">pause</i>
      </transition>
    </div>

    <div v-if="!device" id="video_controls">
      <div id="timeline" :class="{seeking: seeking}">
        <div id="back"></div>
        <div id="fill" :style="{width: progress + '%'}"></div>
        <div id="handle" :style="{left: progress + '%'}"></div>
      </div>
      <div id="ctrl_buttons">
        <div id="ctrl_left"></div>
        <div id="ctrl_right"></div>
      </div>
    </div>

    <transition name="cartela">
      <div v-if="cartela" id="cartela_wraper" @click="openCartela(cartela.id)">
        <p id="cartela_nome">{{cartela.title}}</p>
      </div>
    </transition>

  </div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'player',
  data () {
    return {
      height: 0,
      timecode: 0,
      timecodeAntigo: 0
    }
  },

  computed: {
    hv () {
      return this.$store.getters.hv
    },
    playing () {
      return this.$store.getters.playing
    },
    video_load () {
      return this.$store.getters.video_load
    },
    device () {
      return this.$store.getters.device
    },
    ev_attached () {
      return this.$store.getters.ev_attached
    },
    acessibilidade () {
      return this.$store.getters.acessibilidade
    },
    content_blocks () {
      return this.$store.getters.content_blocks
    },
    cartela () {
      return this.$store.getters.cartela
    },
    seek () {
      return this.$store.getters.seek
    },
    qualidade () {
      if (this.$store.getters.qualidade === 0) {
        return 'baixa'
      } else if (this.$store.getters.qualidade === 1) {
        return 'media'
      } if (this.$store.getters.qualidade === 2) {
        return 'alta'
      }
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
    acessibilidade: function (val, oldVal) {
      this.updateVideo()
    },
    qualidade: function (val, oldVal) {
      this.updateVideo()
    },
    seek: function (val, oldVal) {
      console.log(val)
      this.$refs.engine.currentTime = val
      this.play()
    }
  },

  methods: {
    play () {
      this.$store.dispatch('play')
    },
    pause () {
      this.$store.dispatch('pause')
    },
    videoLoad () {
      this.$store.dispatch('videoLoad')
    },
    attachEvents () {
      this.$store.dispatch('attachEvents')
    },
    attachCartelas () {
      this.$store.dispatch('attachCartelas')
    },
    openCartela (id) {
      this.$store.dispatch('openCartela', id)
    },
    updateVideo () {
      this.$store.commit('MEDIA_LOAD')
      this.timecode = this.$refs.engine.currentTime
      this.$refs.engine.load()
      this.continuarTemp()
    },
    continuarTemp () {
      this.$refs.engine.currentTime = this.timecode
    }
  },

  created: function () {
    this.$nextTick( () => {
      this.height = (window.innerWidth*9)/16
    })
  },

  updated: function() {
    this.$nextTick( () => {
      componentHandler.upgradeDom()
      if (!this.video_load) {
        this.$refs.engine.load()
      }
    })

    this.$refs.engine.addEventListener('canplaythrough', (e) => {
      this.videoLoad()
      if (this.content_blocks.length === 0) {
        this.$store.commit('ADD_EVENT', { id: 0 })
      }
    })

    this.$refs.engine.addEventListener('loadeddata', (e) => {
      if (!this.ev_attached) {
        this.attachEvents()
        this.attachCartelas()
      }
    })

    this.$refs.engine.addEventListener('play', (e) => {
      this.play()
    })

    this.$refs.engine.addEventListener('pause', (e) => {
      this.pause()
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
#cartela_wraper {
  transition: bottom .4s ease;
  position: absolute;
  bottom: 0;
  left: 0;
  color: white;
  width: 100%;
  height: 45px;
  background: #673ab7;
  &.cartela-enter-active, &.cartela-leave.cartela-leave-active {
    bottom: 0;
  }
  &.cartela-leave-active, &.cartela-enter {
    bottom: -45px;
  }
  #cartela_nome {
    margin-bottom: 0;
    margin-top: 10px;
    text-align: center;
    font-size: 20px;
  }
}
</style>