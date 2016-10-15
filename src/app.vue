<template>
  <div id="app">

    <transition name="fade">
      <div v-if="!loaded" class="loader">
        <div class="mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active"></div>
      </div>
    </transition>

     <transition name="fade">
      <drawer :drawer="drawer" :connected="connected" :view="view" v-on:open-drawer="openDrawer"></drawer>
    </transition>

    <transition name="fade">
      <router-view v-if="loaded" :hipervideos="hipervideos" :loaded="loaded" :device="device" class="view" v-on:open-drawer="openDrawer"></router-view>
    </transition>

    <user :board="board" :trelloId="trelloId" v-on:connected="connect" ref="user"></user>
    
  </div>
</template>

<script>
import Drawer from './components/drawer.vue'
import User from './components/user.vue'

export default {
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/')[1]
      const fromDepth = from.path.split('/')[1]
      if (toDepth !== fromDepth) {
        this.view = toDepth
      }
    }
  },

  data () {
    return {
      board: 'O62BDMJt',
      trelloId: '47ba9fe4f814b2a8ebaaa862a6c86a74',
      userToken: null,
      hipervideos: [],
      view: '',
      connected: false,
      loaded: false,
      drawer: false,
      device: false
    }
  },

  methods: {
    openDrawer () {
      this.drawer = !this.drawer
    },
    connect () {
      this.connected = true
    }
  },

  created: function() {
    this.$nextTick( () => {
      if (navigator.userAgent.match(/Tablet|iPad/i))
      {
          this.device = true
      } else if(navigator.userAgent.match(/IEMobile|Windows Phone|Lumia|Android|webOS|iPhone|iPod|Blackberry|PlayBook|BB10|Mobile Safari|Opera Mini|\bCrMo\/|Opera Mobi/i) )
      {
          this.device = true
      } else {
          this.device = false
      }

      this.view = this.$route.path.split('/')[1]
      Trello.get(`/boards/${this.board}/lists`, (data) => {
        for (var i = 0; i < data.length; i++) {
          this.hipervideos.push(data[i].id)
        }
        componentHandler.upgradeDom()
        this.loaded = true
      });
      
    })
  },

  updated: function() {
    this.$nextTick(function () {
      componentHandler.upgradeDom()
    })
  },

  components: {
    Drawer,
    User
  }

}
</script>

<style lang="scss">
$time: .5s;

p {
  font-size: 16px;
}

.loader {
  position: fixed;
  width: 100%;
  height: 100%;
  padding-top: 20%;
  padding-left: 49%;
  background: white;
  @media screen and (max-width: 1024px) {
    padding-top: 63% !important;
    padding-left: 45% !important;
  }
}
.fade-enter-active, .fade-leave {
  transition: opacity $time;
  opacity: 1;
}
.fade-leave-active, .fade-enter {
  transition: opacity $time;
  opacity: 0;
}

.slide-enter-active, .slide-leave {
  transition: transform $time, opacity $time;
  transform: translateX(0);
  opacity: 1;
}
.slide-enter {
  transition: transform $time, opacity $time;
  transform: translateX(-20px);
  opacity: 0;
}
.slide-leave-active {
  @extend .slide-enter;
  transform: translateX(20px);
}

</style>
