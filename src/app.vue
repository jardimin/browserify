<template>
  <div id="app" allowfullscreen="true">

    <transition name="fade">
      <div v-if="!loaded" class="loader">
        <div class="mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active"></div>
      </div>
    </transition>

     <transition name="fade">
      <drawer :view="view"></drawer>
    </transition>

    <transition :name="view === 'home' ? 'fade' : 'hiper'" mode="out-in">
      <router-view v-if="loaded" class="view" ref="view"></router-view>
    </transition>
    
  </div>
</template>

<script>
import Drawer from './components/drawer.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/')[1]
      const fromDepth = from.path.split('/')[1]
      if (toDepth !== fromDepth) {
        this.view = toDepth
        if (fromDepth === 'hipervideo') {
          this.resetHiper()
        }
      }
    }
  },

  data () {
    return {
      view: ''
    }
  },

  computed: mapGetters([
    'user',
    'loaded'
  ]),

  methods: mapActions([
    'connectUser',
    'isDevice',
    'getHipervideos',
    'openDrawer',
    'changeQual',
    'changeAcess',
    'resetHiper'
  ]),
  getCookie (cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';')
    for(var i=0; i<ca.length; i++) {
      var c = ca[i]
      while (c.charAt(0)==' ') c = c.substring(1)
      if (c.indexOf(name) == 0) return c.substring(name.length,c.length)
    }
    return ""
  },
  cookieQualidade () {
    switch(this.getCookie('qualidade')) {
      case '':
        document.cookie = "qualidade=0"
        break
      case '2':
        this.changeQual(2)
        break
      case '1':
        this.changeQual(1)
        break
      case '0':
        this.changeQual(0)
        break
    }
  },
  cookieAcess () {
    switch(this.getCookie('acessibilidade')) {
      case '':
        document.cookie = "acessibilidade=normal"
        break
      case 'libras':
        this.changeAcess('libras')
        break
      case 'audio':
        this.changeAcess('audio')
        break
      case 'normal':
        this.changeAcess('normal')
        break
    }
  },

  created: function() {
    this.$nextTick( () => {
      this.isDevice()
      this.view = this.$route.path.split('/')[1]
      this.getHipervideos()
    })
  },

  mounted: function () {
    this.$nextTick( () => {

      this.cookieQualidade

      this.cookieAcess

    })
  },

  updated: function() {
    this.$nextTick(function () {
      componentHandler.upgradeDom()
    })
  },

  components: {
    Drawer
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

.hiper-enter-active, .hiper-leave {
  transition: opacity 1s;
  opacity: 1;
  #carousel-home {
    transition: height $time ease .4s;
    @media screen and (min-width: 1024px) {
      transition: opacity $time !important;
      opacity: 1 !important;
    }
  }
  header#header {
    transition: width .3s, margin-left .2s ease .3s;
    width: 100%;
    margin-left: 0;
    @media screen and (min-width: 1024px) {
      transition: width .5s, left .3s ease .6s !important;
      width: 48% !important;
      margin-left: 0 !important;
      left: 0 !important;
    }
  }
  main {
    transition: opacity .2s;
    opacity: 1;
  }
}
.hiper-leave-active, .hiper-enter {
  transition: opacity 1s;
  opacity: 1;
  #carousel-home {
    transition: height $time ease .4s;
    height: 0;
    @media screen and (min-width: 1024px) {
      transition: opacity $time;
      opacity: 0;
      height: 100%;
    }
  }
  header#header {
    transition: width .3s, margin-left .2s ease .3s;
    width: 59px;
    margin-left: -60px;
    @media screen and (min-width: 1024px) {
      transition: width .5s, left .3s ease .6s;
      width: 75px;
      left: -75px;
      margin-left: 0px;
    }
  }
  main {
    transition: opacity .2s;
    opacity: 0;
  }
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
