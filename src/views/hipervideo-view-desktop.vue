<template>
  <div class="hipervideo">

    <div v-if="hv.headers" id="player" @touchstart="touchStart" @touchend="touchEnd" @touchmove="touchMove" ref="player">

      <div id="screen">
        <video id="video_player" ref="engine">
          <source id="mp4" :src="hv.headers.url + '_mobile.m4v'" type="video/mp4">
        </video>
      </div>

      <div id="status" :class="{hide: playing}">
        <transition name="video_load">
          <i v-if="playing" class="play material-icons" key="play">play_arrow</i>
          <i v-else class="pause material-icons" key="pause">pause</i>
        </transition>
      </div>

      <div id="video_controls">
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
    <transition name="fade">
      <div id="buffer" v-if="!video_load">
        <i class="fa fa-refresh fa-spin refresher" aria-hidden="true"></i>
      </div>
    </transition>

  </div>
</template>

<script>
import _ from 'underscore'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'hv-desk',
  data () {
    return {
      video_load: false,
      playing: false,
      seeking: false,
      vol_change: false,
      touch: 0,
      touch_pointY: 0,
      touch_pointX: 0,
      touch_offset: null,
      duration: 0,
      progress: 0
    }
  },

  computed: mapGetters([
    'hv'
  ]),

  watch: {
    playing: function (val, oldVal) {
      if (val) {
        this.$refs.engine.play()
      } else {
        this.$refs.engine.pause()
      }
    },
    seeking: function (val, oldVal) {
      if (val) {
        console.log('destroy timeupdate')
        this.playing = false
        this.$refs.engine.removeEventListener('timeupdate', (e) => {
          this.progress = (this.$refs.engine.currentTime * 100) / this.duration
        })
      } else {
        console.log('create timeupdate')
        this.$refs.engine.addEventListener('timeupdate', (e) => {
          this.progress = (this.$refs.engine.currentTime * 100) / this.duration
        })
      }
    },
    progress: function (val, oldVal) {
      if (this.seeking) {
        this.$refs.engine.currentTime = (val * this.duration) / 100
      }
    }
  },

  methods: {
    seek (seek) {
      this.progress = (seek * 100) / window.innerWidth
    },
    touchStart (e) {
      this.touch = e.timeStamp
      this.touch_pointX = e.changedTouches[0].clientX
      this.touch_pointY = e.changedTouches[0].clientY
      this.time_offset = setTimeout( () => {
        if (this.touch_pointX < window.innerWidth - 60) {
          this.seeking = true
          console.log('seek')
        }
      },250)
    },
    touchMove (e) {
      if (this.seeking) {
        this.seek(e.changedTouches[0].clientX)
      }
    },
    touchEnd (e) {
      let time_offset = e.timeStamp - this.touch
      if (time_offset < 200) {
        console.log('pause play')
        this.playing = !this.playing
        clearTimeout(this.time_offset)
      } else if (this.seeking) {
        console.log('seek end')
        this.seeking = false
        this.playing = true
        clearTimeout(this.time_offset)
      } else if (!this.seeking) {
        console.log('not seeking')
        clearTimeout(this.time_offset)
      } else {
        console.log('else')
      }
    }
  },

  created: function () {
    this.$nextTick( () => {
      
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
      this.duration = this.$refs.engine.duration
    })

    this.$refs.engine.addEventListener('timeupdate', (e) => {
      this.progress = (this.$refs.engine.currentTime * 100) / this.duration
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