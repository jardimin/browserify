<template>
  <div class="film" :style="{ backgroundImage: 'url(' + this.img + ')' }" style="background-size: contain;">
  </div>
</template>

<script>

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
      Trello.get(`/cards/${this.film.card}/attachments`, (data) => {
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
