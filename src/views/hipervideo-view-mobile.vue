<template>
  <div class="hipervideo">

    <player></player>

    <header id="header" v-show="video_load" class="mdl-layout__header" style="display: block;">
      <div aria-expanded="false" role="button" tabindex="0" class="mdl-layout__drawer-button" @click="openDrawer"><i class="material-icons">menu</i></div>
      <div class="mdl-grid">
        <div class="mdl-cell mdl-cell--1-col">
          <div v-if="index > 0" class="event_left" @click="downEvent"><i class="material-icons">keyboard_arrow_left</i></div>
        </div>
        <div class="mdl-cell mdl-cell--2-col">
          <transition name="fade" mode="out-in">
            <div v-for="cont in content_blocks" class="event_up">{{cont.title}}</div>
          </transition>
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
            <transition name="body-fade" mode="out-in">
              <div v-for="cont in content_blocks" v-html="textMarked"></div>
            </transition>
            
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
      textMarked: ''
    }
  },

  computed: mapGetters([
    'hv',
    'drawer',
    'video_load',
    'content_blocks',
    'eventsLenght'
  ]),

  watch: {
    content_blocks: function (val, oldVal) {
      if (val.lenght !== 0) {
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
      this.$store.commit('ADD_EVENT', { id: this.index + 1 })
    },
    downEvent () {
      this.$store.commit('ADD_EVENT', { id: this.index - 1 })
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

<style lang="scss">
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
</style>