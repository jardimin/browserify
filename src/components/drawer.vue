<template>
  <div id="drawer">
    <div class="mdl-layout__drawer" :class="{'is-visible': drawer}">
      <div class="mdl-grid" style="padding: 0;">

        <div class="mdl-cell mdl-cell--12-col" >
          <span @click="auth" class="mdl-chip mdl-chip--contact">
            <transition>
              <span v-if="!connected" class="mdl-chip__contact mdl-color--deep-purple mdl-color-text--white">
                <transition>
                  <i v-if="!connecting" class="fa fa-trello" aria-hidden="true"></i>
                  <i v-else class="fa fa-cog fa-spin" aria-hidden="true"></i>
                </transition>
              </span>
              <img v-else :src="user.img" class="mdl-chip__contact">
            </transition>
            
            <transition name="fade">
              <span v-if="!connected && !connecting" class="mdl-chip__text">Conecte-se</span>
              <span v-if="!connected && connecting" class="mdl-chip__text">Conectando...</span>
              <span v-if="connected && !connecting" class="mdl-chip__text">{{user.nome[0].toUpperCase() + user.nome.slice(1)}}</span>
            </transition>
          </span>
        </div>

        <div class="mdl-cell mdl-cell--12-col">
          
            <componet :is="view"></componet>

        </div>
        
      </div>
    </div>
    <div class="mdl-layout__obfuscator" :class="{'is-visible': drawer}" @click="openDrawer"></div>

  </div>
</template>

<script>
import Home from './home-drawer.vue'
import Hipervideo from './hipervideo-drawer.vue'

export default {
  props: {
    drawer: Boolean,
    connected: Boolean,
    view: String
  },

  data () {
    return {
      user: null,
      connecting: false
    }
  },

  watch: {
    connected: function (val, oldVal) {
      if (val) {
        this.connecting = false
      }
    }
  },

  created: function() {
    this.$nextTick( () => {
      this.user = this.$root.$children[0].$refs.user._data
    })
  },

  updated: function() {
    this.$nextTick(function () {
      componentHandler.upgradeDom()
    })
  },

  methods: {
    openDrawer () {
      this.$emit('open-drawer')
    },
    connectTrello () {
      this.connecting = true
      this.$root.$children[0].$refs.user.connect()
    },
    disconnect () {
      this.$emit('trello-disconnect')
    },
    auth () {
      if (this.connected) {
        this.disconnect()
      } else {
        this.connectTrello()
      }
    }
  },

  components: {
    Home,
    Hipervideo
  }

}
</script>

<style lang="scss">
$time: .5s;

.teste {
  width: 100%;
  height: 150px;
  background: green;
}
.loader {
  position: fixed;
  width: 100%;
  height: 100%;
  padding-top: 20%;
  padding-left: 49%;
  background: white;
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

#drawer {
  .mdl-chip {
    height: 45px;
    width: 95%;
    border-radius: 28px;
    cursor: pointer;
  }
  .mdl-chip__contact {
    height: 45px;
    width: 45px;
    border-radius: 35px;
    .fa {
      margin-top: 13px;
    }
  }
  .mdl-chip__text {
    font-size: 18px;
  }
}

</style>
