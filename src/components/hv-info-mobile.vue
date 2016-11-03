<template>

  <div id="info" :style="{bottom: bottom_default + touch_slide + info_offset +'px'}" :class="[{touch: touch},{open: info_open}]">
    <div class="handle" @touchstart.prevent="touchStart" @touchend.prevent="touchEnd" @touchmove.prevent="touchMove" :class="{saiba: saiba_mais}">
      <i class="material-icons open-key">keyboard_arrow_up</i>
      <transition name="saiba">
        <div v-if="saiba_mais" class="saiba-mais">SAIBA MAIS</div>
      </transition>
    </div>

    <corpo></corpo>

  </div>

</template>

<script>
import _ from 'underscore'
import marked from 'marked'
import { mapGetters, mapActions } from 'vuex'

import Corpo from './hv-info-body.vue'

export default {
  name: 'hv-info',
  data () {
    return {
      touch: false,
      touch_point: 0,
      touch_slide: 0,
      touch_time: 0,
      bottom_default: -480,
      info_offset: 0
    }
  },

  computed: mapGetters([
    'hv',
    'info_open',
    'saiba_mais',
    'content_blocks'
  ]),

  watch: {
    info_open: function (val, oldVal) {
      if (val) {
        this.info_offset = 480
        if (this.saiba_mais) {
          this.$store.commit('SAIBA_MAIS', false)
        }
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
    openInfo (info) {
      this.$store.dispatch('openInfo', info)
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
        this.openInfo(true)
      } else if ( this.touch_slide < -100 ) {
        this.openInfo(false)
      } else if ( e.timeStamp - this.touch_time < 200 ) {
        this.openInfo(!this.info_open)
      }
      this.touch_point = 0
      this.touch_slide = 0
    }
  },

  updated: function() {
    this.$nextTick(function () {
      componentHandler.upgradeDom()
    })
  },

  components: {
    Corpo
  }

}
</script>

<style lang="scss">
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
    .material-icons.open-key {
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
  .mdl-layout__header-row {
    display: none;
  }
}
</style>