<template>

  <div id="info" :style="{bottom: bottom_default + touch_slide + info_offset +'px'}" :class="[{touch: touch},{open: info_open}]">
    <div class="handle" @touchstart.prevent="touchStart" @touchend.prevent="touchEnd" @touchmove.prevent="touchMove" :class="{saiba: saiba_mais}">
      <i class="material-icons open-key">keyboard_arrow_up</i>
      <transition name="saiba">
        <div v-if="saiba_mais" class="saiba-mais">SAIBA MAIS</div>
      </transition>
    </div>

    <conteudo></conteudo>
    
    <cartela v-if="!info_body"></cartela>

    <transition name="link-fade">
      <linkframe v-if="link"></linkframe>
    </transition>

  </div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import Conteudo from './hv-info-body.vue'
import Cartela from './hv-info-cartela.vue'
import Linkframe from './hv-info-link.vue'

export default {
  name: 'hv-info',
  data () {
    return {
      info_body: true,
      touch: false,
      touch_point: 0,
      touch_slide: 0,
      touch_time: 0,
      bottom_default: -window.innerHeight + 48,
      info_offset: 0
    }
  },

  computed: mapGetters([
    'hv',
    'info_open',
    'saiba_mais',
    'content_blocks',
    'conteudo',
    'link',
    'cartela_open'
  ]),

  watch: {
    saiba_mais: function (val, oldVal) {
      if (val) {
        this.bottom_default = -window.innerHeight + 68
      } else {
        setTimeout( () => {
          this.bottom_default = -window.innerHeight + 48
        }, 300)
      }
    },
    info_open: function (val, oldVal) {
      if (val) {
        this.info_offset = window.innerHeight - 48
        if (this.saiba_mais) {
          this.$store.commit('SAIBA_MAIS', false)
        }
      } else {
        if (this.cartela_open) {
          this.$store.dispatch('closeCartela')
        }
        this.info_body = true
        this.info_offset = 0
      }
    },
    cartela_open: function (val, oldVal) {
      if (val) {
        this.info_body = false
      } else {
        this.info_body = true
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
    this.$nextTick( () => {
      componentHandler.upgradeDom()
    })
  },

  components: {
    Conteudo,
    Linkframe,
    Cartela
  }

}
</script>

<style lang="scss">
#info {
  transition: bottom .5s ease;
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
    height: 46px;
    width: 100%;
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 -3px 5px -1px rgba(0, 0, 0, 0.2);
    border-top: 1px solid rgba(0,0,0,.4);
    border-bottom: 1px solid rgba(0,0,0,.4);
    background-color: white;
    &.saiba {
      height: 45px;
    }
    .material-icons {
      transition: transform .3s;
      margin-left: 45%;
      color: rgb(103,58,183);
      font-size: 40px;
      margin-top: 3px;
    }
    .saiba-mais {
      height: 20px;
      width: 100%;
      font-size: 20px;
      text-align: center;
      margin-top: -3px;
      padding-top: 1px;
      font-weight: 900;
      background: rgb(103,58,183);
      color: white;
      transition: background .2s, font-size .3s ease .2s, padding-top .3s ease .2s;
      &.saiba-enter-active, &.saiba-leave.saiba-leave-active {
        background: rgb(103,58,183);
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
.link-fade-enter-active, .link-fade-leave.link-fade-leave-active {
  transition: opacity .3s;
  opacity: 0;
}
.link-fade-leave-active, .link-fade-enter {
  transition: opacity .3s;
  opacity: 1;
}
</style>