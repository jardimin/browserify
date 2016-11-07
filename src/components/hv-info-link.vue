<template>

  <div id="link-body">
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--fixed-tabs">
      <header class="mdl-layout__header link-menu">
        <div class="mdl-layout__header-row">
          <!-- Add spacer, to align navigation to the right -->
          <div class="mdl-layout-spacer"></div>
          <!-- Navigation. We hide it in small screens. -->
          <nav class="mdl-navigation mdl-layout--large-screen-only">
            <div class="new-tab">
              <a :href="link" target="_blank" class="mdl-button mdl-js-button" >
                <i class="material-icons">launch</i>
                Abrir em uma nova aba
              </a>
            </div>
            <div @click="closeLink"><i style="font-size: 35px; float: right; color: white; margin-top: 10px;" class="material-icons">close</i></div>
          </nav>

        </div>
      </header>
      <main class="mdl-layout__content" id="content_main" ref="content_main" style="height: 100%;">
        <div class="page-content" style="height: 100%;">
          <transition name="iframe_loader">
            <div v-if="!iframe_loaded" id="iframe_buffer" style="">
              <i class="fa fa-refresh fa-spin" aria-hidden="true"></i>
            </div>
          </transition>
          <iframe :src="link" style="width: 100%; height: 100%; background: white;" @load="iframeLoaded"></iframe>
        </div>
      </main>
    </div>
  </div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'hv-link',
  data () {
    return {
      iframe_loaded: false
    }
  },

  computed: mapGetters([
    'link'
  ]),

  methods: {
    closeLink () {
      this.$store.dispatch('closeLink')
    },
    iframeLoaded () {
      setTimeout( () => {
        this.iframe_loaded = true
      }, 1000)
    }
  },

  updated: function() {
    this.$nextTick( () => {
      componentHandler.upgradeDom()
    })
  }

}
</script>

<style lang="scss">
#link-body {
  opacity: 1;
  transition: opacity .3s;
  .mdl-layout__header-row {
    display: block;
    padding-left: 16px;
  }
  .mdl-navigation {
    display: block;
    z-index: 16;
    width: 100%;
  }
  #iframe_buffer {
    transition: opacity .5s;
    width: 100%; 
    height: 100%; 
    background: white;
    position: absolute;
    opacity: 1;
    &.iframe_loader-enter-active, &.iframe_loader-leave.iframe_loader-leave-active {
      opacity: 1;
    }
    &.iframe_loader-leave-active, &.iframe_loader-enter {
      opacity: 0;
    }
    .fa {
      color: rgb(103,58,183);
      font-size: 50px;
      margin-left: 45%;
      margin-top: 42%;
    }
  }
  .new-tab {
    float: left;
    padding-top: 10px;
    a {
      font-size: 15px;
      color: white;
    }
    .material-icons {
      font-size: 30px;
    }
  }
}
</style>