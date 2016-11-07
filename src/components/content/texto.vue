<template>

  <div class="info-texto">
    <div id="text-content" v-html="text">
    </div>
  </div>

</template>

<script>
import marked from 'marked'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'content-texto',

  props: {
    conteudo: Object
  },

  data () {
    return {
      text: ''
    }
  },

  methods: mapActions([
    'openLink'
  ]),

  mounted: function () {
    this.$nextTick( () => {
      this.text = marked(this.conteudo.texto)
      setTimeout( () => {
        $('#text-content a').on('click', (e) => {
          e.preventDefault()
          this.openLink(e.currentTarget.href)
        })
      }, 100)
    })
  },

  updated: function() {
    this.$nextTick( () => {
      componentHandler.upgradeDom()
    })
  },

  components: {
    
  }

}
</script>

<style lang="scss">
.info-texto {
  padding: 15px;
  box-sizing: border-box;
  width: 96%;
}
</style>