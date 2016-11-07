<template>
  <div class="hip_wrap" style="height: 100%;">
    <div :is="device ? 'mobile' : 'desktop' " :loaded="loaded" :connected="user.connected" :hipervideos="hipervideos" :device="device" ref="hv"></div>
  </div>
</template>

<script>

import Desktop from './hipervideo-view-desktop.vue'
import Mobile from './hipervideo-view-mobile.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'hipervideo',
  computed: mapGetters([
    'user',
    'loaded',
    'hipervideos',
    'device'
  ]),

  methods: mapActions([
    'getHeaders',
    'getEventos',
    'getCartelas',
    'getPlugins',
  ]),

  created: function () {
    this.$nextTick( () => {
      Trello.get(`/lists/${this.$route.params.id}/cards`, (data) => {
        let head = data.find(p => p.name === "headers")
        this.getHeaders(head.desc)
        this.getEventos(data)
        this.getCartelas(data)
        this.getPlugins(data)
      })
    })
  },

  components: {
    Mobile,
    Desktop
  }

}
</script>

<style lang="scss">
.hip_wrap {
  overflow: hidden;
}
</style>