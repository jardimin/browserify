<template>
  <div class="desc">
    <transition :name="direcao">
      <div v-if="on" v-html="descricao">{{ descricao }}</div>
    </transition>
  </div>
</template>

<script>
import marked from 'marked'
import _ from 'underscore'

export default {
  name: 'home-body-desc',
  props: {
    films: Array,
    atual: Object,
    id: String,
    direcao: String
  },

  data () {
    return {
      descricao: marked(this.atual.descricao),
      on: true
    }
  },

  watch: {
    id: function (val, oldVal) {
      setTimeout( () => {
        this.on = false
      },50)
      setTimeout( () => {
        this.on = true
        this.descricao = marked(this.atual.descricao)
      },200)
    }
  },

  filters: {
    marked: function(value) {
      return marked(value)
    }
  },

  methods: {
    
  },

  mounted: function() {
    this.$nextTick( () => {

    })
  },

  updated: function() {
    this.$nextTick( () => {
      componentHandler.upgradeDom()
    })
  }

}
</script>

<style lang="scss">
$time: .3s;

.left-enter-active, .left-leave {
  transition: transform $time;
  transform: translateX(0px);
}
.left-enter {
  transition: transform $time;
  transform: translateX(360px);
}
.left-leave-active{
  transition: transform $time;
  transform: translateX(-360px);
}

.right-enter-active, .right-leave {
  transition: transform $time;
  transform: translateX(0px);
}
.right-enter {
  transition: transform $time;
  transform: translateX(-360px);
}
.right-leave-active{
  transition: transform $time;
  transform: translateX(360px);
}
</style>
