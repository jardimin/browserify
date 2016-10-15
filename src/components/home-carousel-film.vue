<template>
  <div class="film" :style="{ backgroundImage: 'url(' + this.img + ')' }" style="background-size: contain;">
  </div>
</template>

<script>
import Trello from 'node-trello'
const t = new Trello("47ba9fe4f814b2a8ebaaa862a6c86a74")

export default {
  props: {
    film: Object
  },

  data () {
    return {
      img: ''
    }
  },

  watch: {

  },

  methods: {
    
  },

  created: function() {
    this.$nextTick( () => {
      t.get(`/1/cards/${this.film.card}/attachments`, (err, data) => {
        if (err) throw err;
        this.img = data[1].url
      });
    })
  },

  updated: function() {
    this.$nextTick(function () {
      componentHandler.upgradeDom()
    })
  }

}
</script>

<style lang="scss">

</style>
