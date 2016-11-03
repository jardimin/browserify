<template>

  <div v-if="hv.headers" id="player" ref="player">

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

  </div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'player',
  data () {
    return {
      timecode: 0,
      timecodeAntigo: 0
    }
  },

  computed: mapGetters([
    'hv',
    'playing',
    'video_load',
    'device',
    'acessibilidade',
    'qualidade'
  ]),

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

  updated: function() {
    this.$nextTick(function () {
      componentHandler.upgradeDom()
      if (!this.video_load) {
        this.$refs.engine.load()
      }
    })

    this.$refs.engine.addEventListener('canplaythrough', (e) => {
      this.videoLoad()
      this.$store.commit('ADD_EVENT', { id: 0 })
    })

    this.$refs.engine.addEventListener('loadeddata', (e) => {
      this.attachEvents()
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
</style>