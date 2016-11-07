<template>

  <transition name="info-nav-grow">
    <div v-if="cartela_open" class="info-body" id="cartela">
      <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--fixed-tabs">
        <header class="mdl-layout__header context-bg info-menu">
          <div class="mdl-layout__tab-bar info-nav">
            <a href="" class="mdl-layout__tab is-active" @click.prevent="changeTab()">
              <span style="font-size: 30px;">{{cartela_open.title}}</span>
            </a>
          </div>
        </header>
        <main class="mdl-layout__content" id="content_main" ref="content_main" style="height: 300px;">
          <div class="page-content" style="height: 100%;">
            <div class="mdl-grid" style="height: 100%; padding: 0;">
              <div class="mdl-cell mdl-cell--12-col" style="height: 100%; margin: 0; width: 100%;">
                <div id="conteudo_info" style="padding: 0 15px;height: 100%;">

                  <h3 class="cartela-nome">{{cartela_open.funcao}}</h3>
                  <img class="cartela-img" :src="cartela_open.img">

                  <div v-html="resumo"></div>

                </div>
              </div>
            </div>
          </div>
        </main>

      </div>
    </div>
  </transition>

</template>

<script>
import marked from 'marked'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'hv-cartela',
  data () {
    return {
      resumo: ''
    }
  },

  computed: mapGetters([
    'cartela_open'
  ]),

  watch: {
    
  },

  methods: {
    changeTab () {
      
    }
  },

  created: function() {
    this.$nextTick( () => {
      this.resumo = marked(this.cartela_open.desc)
    })
  }

}
</script>

<style lang="scss">
.cartela-nome {
  text-align: center;
  font-size: 25px;
  margin-top: 5px;
}
.cartela-img {
  width: 75%;
  margin-left: 13%;
  border-radius: 50%;
  margin-bottom: 25px;
}
#cartela.info-body {
  .mdl-layout {
    height: calc(100% - 48px);
  }
}
</style>