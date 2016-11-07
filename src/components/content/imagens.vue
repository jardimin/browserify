<template>

  <div class="mdl-grid" id="video_list">
    <div v-for="img in images" class="mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet">
      <a :href="img" target="_blank" :title="img" style="text-decoration: none; text-align: center;">
        <div class="mdl-card mdl-shadow--2dp single-card">
          <img :alt="img" :src="img" style="width: 100%;">
        </div>
      </a>
    </div>
  </div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'content-imagen',

  data () {
    return {
      images: []
    }
  },

  computed: mapGetters([
    'content_blocks'
  ]),

  created: function () {
    this.$nextTick( () => {
      Trello.get("/cards/"+this.content_blocks[0].card+"/attachments", (attach) => {
        for (var i = attach.length - 1; i >= 0; i--) {
          this.images.push(attach[i].url)
        };
      })
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

</style>