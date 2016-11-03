<template>

  <div class="body">
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--fixed-tabs">
      <header class="mdl-layout__header context-bg">
        <div class="mdl-layout__header-row">
          <!-- Add spacer, to align navigation to the right -->
          <div class="mdl-layout-spacer"></div>
          <!-- Navigation. We hide it in small screens. -->
          <nav class="mdl-navigation mdl-layout--large-screen-only">
            <a class="" style="color: rgb(66,66,66);" href="#"><i style="font-size: 35px; float: right; color: white;" class="material-icons">close</i></a>
          </nav>

        </div>
        <div class="mdl-layout__tab-bar info-nav">
          <a v-for="(cont, key) in conteudo" href="" class="mdl-layout__tab" :class="{'is-active': key === tab }" @click.prevent="changeTab(key)">
            <span><i class="material-icons" style="position: absolute; left: 0; top: 12px;">{{icon[key]}}</i></span>
          </a>
        </div>
      </header>
      <main class="mdl-layout__content" id="content_main" style="height: 100%;">
        <div class="page-content" style="height: 100%;">
          <div class="mdl-grid" style="height: 100%; padding: 0;">
            <div class="mdl-cell mdl-cell--12-col" style="height: 100%; margin: 0;">
              <div id="conteudo_info" style="padding:0;height: 100%;">

                <div transition="fade" ></div>

              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>

</template>

<script>
import marked from 'marked'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'hv-body',
  data () {
    return {
      tab: 'texto',
      icon: {
        texto: 'format_align_left',
        links: 'link',
        videos: 'video_library',
        imagens: 'photo_library',
        mapa: 'map',
        graficos: 'pie_chart',
        comentarios: 'forum'
      }
    }
  },

  computed: mapGetters([
    'conteudo'
  ]),

  watch: {
    
  },

  methods: {
    changeTab (key) {
      this.tab = key
    }
  },

  updated: function() {
    this.$nextTick(function () {
      componentHandler.upgradeDom()
    })
  },

  components: {
    
  }

}
</script>

<style lang="scss">
.info-nav {
  .mdl-layout__tab {
    @media screen and (max-width: 1024px) {
      padding: 4px 0;
    }
  }
  .material-icons {
    margin-left: 35%;
    margin-top: 5px;
  }
}
</style>