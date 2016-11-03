<template>
  <div id="carousel-home">
    <div class="arrow-left" @click="slideLeft">
      <i class="material-icons">chevron_left</i>
    </div>
    <div class="arrow-right" @click="slideRight">
      <i class="material-icons">chevron_right</i>
    </div>
    <div class="film-wrap" >
      <transition-group name="swipe-left" mode="out-in">
        <film v-for="film in carousel" :film="film" :key="film.id" ></film>
      </transition-group>
    </div>
  </div>
</template>

<script>
import _ from 'underscore'

import Film from '../components/home-carousel-film.vue'

export default {
  name: 'carousel-desk',
  props: {
    films: Array,
    ready: Boolean
  },

  data () {
    return {
      length: this.films.length,
      index: 0,
      carousel: []
    }
  },

  watch: {
    ready: function (val, oldVal) {
      this.carousel.push(this.films[this.index])
      this.$emit('slide')
    }
  },

  methods: {
    slideLeft () {
      var temp = this.carousel.pop()
      if (this.index === 0) {
        this.index = this.films.length - 1
      } else {
        this.index = this.index - 1
      }
      setTimeout( () => {
        this.$emit('left')
        this.$emit('slide')
        this.carousel.push(this.films[this.index])
      }, 600)
    },
    slideRight () {
      var temp = this.carousel.pop()
      if (this.index === this.films.length - 1) {
        this.index = 0
      } else {
        this.index = this.index + 1
      }
      setTimeout( () => {
        this.carousel.unshift(this.films[this.index])
        this.$emit('right')
        this.$emit('slide')
      },600)
    }
    
  },

  updated: function() {
    this.$nextTick(function () {
      componentHandler.upgradeDom()
    })
  },

  components: {
    Film
  }

}
</script>

<style lang="scss">

$swipe-left-time: .5s;
#carousel-home {
  @media screen and (min-width: 1024px) {
    height: 100%;
    position: absolute;
  }
  .material-icons {
    @media screen and (min-width: 1024px) {
      font-size: 90px;
    }
  }
  .arrow {
    @media screen and (min-width: 1024px) {
      bottom: 0;
      width: 60px;
      z-index: 2;
      .material-icons {
        font-size: 90px;
      }
    }
  }
  .arrow-left {
    @extend .arrow;
    @media screen and (min-width: 1024px) {
      height: 50%;
      background: rgba(0,0,0,0);
      .material-icons {
        margin-top: 205%;
        margin-left: -18px;
      }
    }
  }
  .arrow-right {
    @extend .arrow;
    @media screen and (min-width: 1024px) {
      background: rgba(0, 0, 0, 0.8);
      .material-icons {
        margin-top: 446%;
        margin-left: -10px;
      }
    }
    @media screen and (min-width: 1600px) {
      .material-icons {
        margin-top: 720%;
      }
    }
  }
  .film-wrap {
    @media screen and (min-width: 1024px) {
      height: 100%;
      width: 100%;
      margin-left: 0 !important;
    }
  }
  .film {
    @media screen and (min-width: 1024px) {
      width: 100%;
      background-size: 100% !important;
      position: absolute;
    }
    &.swipe-left-enter-active, &.swipe-left-leave {
      @media screen and (min-width: 1024px) {
        transition: opacity $swipe-left-time !important;
        width: 100% !important;
      }
    }
    &.swipe-left-enter, &.swipe-left-leave-active {
      @media screen and (min-width: 1024px) {
        transition: opacity $swipe-left-time;
        width: 100%;
      }
    }
  }
}

</style>
