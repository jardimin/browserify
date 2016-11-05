<template>

  <div class="info-texto">
    <div id="text-content" v-html="text">
    </div>
  </div>

</template>

<script>
import marked from 'marked'

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

  watch: {
    
  },

  methods: {
    
  },

  mounted: function () {
    this.$nextTick( function () {
      this.text = marked(this.conteudo.texto)
      setTimeout( () => {
        $('#text-content a').on('click', function(e) {
          e.preventDefault()
          console.log(e)
        })
      }, 100)
    })
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
.info-texto {
  padding: 15px;
  width: 96%;
}
</style>