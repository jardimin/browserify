<template>
  <div id="carousel-home">
    <div class="arrow-left" @click="slideLeft">
      <i class="material-icons">chevron_left</i>
    </div>
    <div class="arrow-right" @click="slideRight">
      <i class="material-icons">chevron_right</i>
    </div>
    <div :style="{ marginLeft: margin_default + touch_slide + 'px'}" :class="{active: touch}" class="film-wrap" @touchstart="touchStart" @touchend="touchEnd" @touchmove="touchMove" >
      <transition-group name="swipe-left">
        <film v-for="film in carousel" :film="film" :key="film.id" ></film>
      </transition-group>
    </div>
  </div>
</template>

<script>
import _ from 'underscore'

import Film from '../components/home-carousel-film.vue'

export default {
  props: {
    films: Array,
    ready: Boolean
  },

  data () {
    return {
      offset: 0,
      touch: false,
      touch_point: 0,
      touch_slide: 0,
      margin_default: -524,
      carousel: []
    }
  },

  watch: {
    ready: function (val, oldVal) {
      this.carousel.push(this.films[1])
      this.carousel.push(this.films[2])
      this.carousel.push(this.films[0])
      this.carousel.push(this.films[1])
      this.carousel.push(this.films[2])
      this.carousel.push(this.films[0])

      this.$emit('slide')
    }
  },

  methods: {
    slideLeft () {
      var temp = this.carousel.shift()
      this.$emit('left')
      this.$emit('slide')
      setTimeout( () => {
        this.carousel.push(temp)
      },500)
    },
    slideRight () {
      var temp = this.carousel.pop()
      setTimeout( () => {
        this.carousel.unshift(temp)
        this.$emit('right')
        this.$emit('slide')
      },1)
    },
    touchStart (e) {
      this.touch = true
      this.touch_point = e.changedTouches[0].clientX
    },
    touchMove (e) {
      this.touch_slide = e.changedTouches[0].clientX - this.touch_point
    },
    touchEnd (e) {
      this.touch = false
      if ( this.touch_slide > 100 ) {
        this.slideRight()
      } else if ( this.touch_slide < -100 ) {
        this.slideLeft()
      }
      this.touch_point = 0
      this.touch_slide = 0
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
  width: 100%;
  height: 157.5px;
  background: rgba(0,0,0,.8);
  position: relative;
  overflow: hidden;
  .material-icons {
    font-size: 60px;
    margin-top: 134%;
    margin-left: -10px;
    transition: transform .2s;
  }
  .arrow {
    background: rgba(0,0,0,.2);
    width: 40px;
    height: 100%;
    position: absolute;
    cursor: pointer;
    color: white;
    z-index: 1;
    &:hover {
      .material-icons {
        transform: scale(1.1);
      }
    }
  }
  .arrow-left {
    @extend .arrow;
    left: 0;
  }
  .arrow-right {
    @extend .arrow;
    right: 0;
  }
  .film-wrap {
    height: 157.5px;
    width: 1500px;
    margin-left: -242px;
    transition: margin-left $swipe-left-time;
    &.active {
      transition: none;
    }
  }
  .film {
    height: 100%;
    width: 280px;
    float: left;
    border-right: 1px solid black;
    border-left: 1px solid black;
    background-size: contain;
    position: relative;
    &.swipe-left-enter-active, &.swipe-left-leave {
      transition: width $swipe-left-time;
      width: 280px;
      overflow: hidden;
    }
    &.swipe-left-enter, &.swipe-left-leave-active {
      transition: width $swipe-left-time;
      overflow: hidden;
      width: 0px;
    }
  }
}

</style>
