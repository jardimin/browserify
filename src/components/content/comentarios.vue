<template>

  <div id="comentarios" :style="{bottom: bottom_default + touch_slide + info_offset +'px'}" :class="[{touch: touch},{open: open}]">
    <div class="handle" @touchstart.prevent="touchStart" @touchend.prevent="touchEnd" @touchmove.prevent="touchMove">
      <i class="material-icons open-key2">keyboard_arrow_up</i>
      <p>Comentarios</p>
    </div>

    <comment-body></comment-body>

  </div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CommentBody from './comentarios-body.vue'

export default {
  name: 'hv-comentarios',
  data () {
    return {
      open: false,
      touch: false,
      touch_point: 0,
      touch_slide: 0,
      touch_time: 0,
      bottom_default: -window.innerHeight + 96,
      info_offset: 0
    }
  },

  computed: mapGetters([
    'content_blocks'
  ]),

  watch: {
    open: function (val, oldVal) {
      if (val) {
        this.info_offset = window.innerHeight - 150
      } else {
        this.info_offset = 0
      }
    }
  },

  methods: {
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
        this.open = true
      } else if ( this.touch_slide < -100 ) {
        this.open = false
      } else if ( e.timeStamp - this.touch_time < 200 ) {
        this.open = !this.open
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
    CommentBody
  }

}
</script>

<style lang="scss">
#comentarios {
  transition: bottom .5s ease;
  position: absolute;
  bottom: -480px;
  width: 100%;
  height: 100%;
  background: white;
  z-index: 3;
  &.touch {
    transition: none;
  }
  &.open {
    .material-icons.open-key2 {
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
    p {
      margin-top: 13px;
      float: left;
      font-size: 20px;
      color: #673ab7;
    }
    .material-icons {
      transition: transform .3s;
      margin-left: 5px;
      color: #673ab7;
      font-size: 27px;
      margin-right: 5px;
      float: left;
      margin-top: 11px;
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