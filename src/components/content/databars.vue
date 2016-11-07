<template>

  <div class="info-graf">
    <div v-for="(graf, index) in conteudo.graficos" class="mdl-grid">
      <div class="mdl-cell mdl-cell--12-col graf-text" v-html="text[index]" style="margin-bottom: 0;"></div>
      <div class="mdl-cell mdl-cell--12-col" :is="graf.tipo" :graf="graf"></div>
    </div>
  </div>

</template>

<script>
import marked from 'marked'

import Dashboard from './databars-dashboard.vue'

export default {
  name: 'content-databars',

  props: {
    conteudo: Object
  },

  computed: {
    text: function () {
      var ar = []
      for (var i = 0; i < this.conteudo.graficos.length; i++) {
        ar.push(marked(this.conteudo.graficos[i].texto))
      }
      return ar
    }
  },

  updated: function() {
    this.$nextTick( () => {
      componentHandler.upgradeDom()
    })
  },

  components: {
    Dashboard
  }

}
</script>

<style lang="scss">
.graf-text {
  p {
    margin-bottom: 0;
  }
}
</style>