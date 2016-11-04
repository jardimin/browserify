<template>
  <div class="hipervideo">

    <player></player>

    <header id="header" v-show="video_load" class="mdl-layout__header" style="display: block;">
      <div aria-expanded="false" role="button" tabindex="0" class="mdl-layout__drawer-button" @click="openDrawer"><i class="material-icons menu">menu</i></div>
      <div class="mdl-grid menu">
        <div class="mdl-cell mdl-cell--1-col">
          <div v-if="index > 0" class="event_left" @click="downEvent"><i class="material-icons">keyboard_arrow_left</i></div>
        </div>
        <div class="mdl-cell mdl-cell--2-col">
          <transition-group :name="'event-slide-'+slide">
            <div v-if="content_blocks.length > 0" v-for="(cont, index) in content_blocks" class="event_up" :key="index">{{cont.title}}</div>
          </transition-group>
        </div>
        <div class="mdl-cell mdl-cell--1-col">
          <div v-if="video_load && index < eventsLenght - 1" class="event_right" @click="upEvent"><i class="material-icons">keyboard_arrow_right</i></div>
        </div>
      </div>
    </header>
    <main v-if="hv.headers" class="mdl-layout__content video">
      <div class="page-content">
        <div class="mdl-grid">
          <div class="mdl-cell mdl-cell--12-col">
            <transition-group name="body-fade" mode="out-in">
              <div v-if="content_blocks.length > 0" v-for="(cont, index) in content_blocks" :key="index" v-html="textMarked"></div>
            </transition-group>
            
          </div>
        </div>
      </div>
    </main>

    <info></info>

    <transition name="fade">
      <div id="buffer" v-if="!video_load">
        <i class="fa fa-refresh fa-spin refresher" aria-hidden="true"></i>
      </div>
    </transition>

  </div>
</template>

<script>
import _ from 'underscore'
import marked from 'marked'
import { mapGetters, mapActions } from 'vuex'

import Player from '../components/hv-player.vue'
import Info from '../components/hv-info-mobile.vue'

export default {
  name: 'hv-mobile',
  data () {
    return {
      index: 0,
      events_pass: 0,
      textMarked: '',
      slide: 'right'
    }
  },

  computed: mapGetters([
    'hv',
    'drawer',
    'video_load',
    'device',
    'content_blocks',
    'eventsLenght'
  ]),

  watch: {
    content_blocks: function (val, oldVal) {
      console.log(val.length)
      if (val.length > 0) {
        this.index = val[0].id
        this.textMarked = marked(val[0].fields.excerpt)
        if (this.events_pass < 2) {
          this.events_pass++
          setTimeout( () => {
            this.showMais()
          }, 1000)
        }
      }
    }

  },

  methods: {
    openDrawer () {
      this.$store.dispatch('openDrawer')
    },
    showMais () {
      this.$store.dispatch('showMais')
    },
    upEvent () {
      this.slide = 'right'
      this.$store.dispatch('eventSlide', this.index + 1 )
    },
    downEvent () {
      this.slide = 'left'
      this.$store.dispatch('eventSlide', this.index - 1 )
    }
  },

  updated: function() {
    this.$nextTick(function () {
      componentHandler.upgradeDom()
    })
  },

  components: {
    Player,
    Info
  },

  filters: {
    mark: (w) => marked(w)
  }

}
</script>

<style lang="scss" scoped>
.mdl-layout__content {
  &.video {
    height: 220px;
  }
}
.mdl-layout__header {
  .mdl-layout__drawer-button {
    @media screen and (max-width: 1024px) {
      margin: 4px;
      position: fixed;
      border-radius: 50%;
      background: white;
      box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);
      transform: scale(0.8);
    }
  }
}
#header {
  min-height: 50px;
  height: 50px;
  display: block;
  box-shadow: none;
  border-bottom: 1px solid rgb(103,58,183);
  background: white;
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
  .event {
    position: absolute;
    z-index: 5;
  }
  .event_right {
    @extend .event;
  }
  .event_left {
    @extend .event;
  }
  .event_up {
    text-align: center;
    font-size: 23px;
    position: absolute;
    width: 100%;
    left: 0%;
    color: #673ab7;
    font-weight: 500;
    margin-top: 5px;
    transition: left .2s ease;
    &.event-slide-right-enter-active {
      left: 0%;
    }
    &.event-slide-right-enter {
      left: -100%;
    }
    &.event-slide-right-leave {
      left: 0%;
    }
    &.event-slide-right-leave-active {
      left: 100%;
    }
    &.event-slide-left-enter-active {
      left: 0%;
    }
    &.event-slide-left-enter {
      left: 100%;
    }
    &.event-slide-left-leave {
      left: 0%;
    }
    &.event-slide-left-leave-active {
      left: -100%;
    }
  }
  .material-icons {
    &.menu {
      color: rgb(103,58,183);
    }
  }
  .mdl-grid {
    &.menu {
      position: absolute;
      width: 100%;
      left: 0;
      background: #ffffff;
      border-top: 1px solid white;
      padding: 2px;
      .mdl-cell--1-col {
        margin: 9px 8px 5px 8px;
      }
      .material-icons {
        color: rgb(103,58,183);
      }
    }
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
</style>