<template>
  <div id="drawer">
    <div class="mdl-layout__drawer" :class="{'is-visible': drawer}">
      <div class="mdl-grid" style="padding: 0;">
        <div class="mdl-cell mdl-cell--12-col" style="margin: 0;">
          
            <componet :is="view"></componet>

        </div>
      </div>
    </div>
    <div class="mdl-layout__obfuscator" :class="{'is-visible': drawer}" @click="openDrawer"></div>

  </div>
</template>

<script>
import Trello from 'node-trello'
const t = new Trello("47ba9fe4f814b2a8ebaaa862a6c86a74");
import Home from './home-drawer.vue'
import Hipervideo from './hipervideo-drawer.vue'

export default {
  props: {
    drawer: Boolean,
    view: String
  },

  data () {
    return {
      
    }
  },

  created: function() {
    this.$nextTick( () => {
      
      
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

</style>
