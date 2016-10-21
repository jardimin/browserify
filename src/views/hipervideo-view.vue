<template>
  <div class="hip_wrap">
    <div :is="device ? 'mobile' : 'desktop' " :loaded="loaded" :connected="connected" :hipervideos="hipervideos" :device="device"></div>
  </div>
</template>

<script>
import _ from 'underscore'

import Desktop from './hipervideo-view-desktop.vue'
import Mobile from './hipervideo-view-mobile.vue'

export default {
  props: {
    loaded: Boolean,
    connected: Boolean,
    hipervideos: Array,
    device: Boolean
  },

  components: {
    Mobile,
    Desktop
  }

}
</script>

<style lang="scss">

</style>