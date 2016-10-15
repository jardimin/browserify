<template>
  <div id="carousel-home">
    <div class="arrow-left" @click="slideLeft">
      <i class="material-icons">chevron_left</i>
    </div>
    <div class="arrow-right" @click="slideRight">
      <i class="material-icons">chevron_right</i>
    </div>
    <div :style="{ marginLeft: margin_default + touch_slide + 'px'}" :class="{active: touch}" class="film-wrap" @touchstart.passive="touchStart" @touchend.passive="touchEnd" @touchmove.passive="touchMove" >
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
    ready: Boolean,
    device: Boolean
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
      if (this.device) {
        this.carousel.push(this.films[1])
        this.carousel.push(this.films[2])
        this.carousel.push(this.films[0])
        this.carousel.push(this.films[1])
        this.carousel.push(this.films[2])
        this.carousel.push(this.films[0])
      } else {
        this.carousel.push(this.films[0])
        this.carousel.push(this.films[1])
        this.carousel.push(this.films[2])
      }
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
      },this.device ? 1 : 500)
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
  @media screen and (min-width: 1024px) {
    height: 100%;
    position: absolute;
  }
  .material-icons {
    font-size: 60px;
    margin-top: 134%;
    margin-left: -10px;
    transition: transform .2s;
    @media screen and (min-width: 1024px) {
      font-size: 90px;
    }
  }
  .arrow {
    background: rgba(0,0,0,.2);
    width: 40px;
    height: 100%;
    position: absolute;
    cursor: pointer;
    color: white;
    &:hover {
      .material-icons {
        transform: scale(1.1);
      }
    }
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
    left: 0;
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
    right: 0;
    @media screen and (min-width: 1024px) {
      background: rgba(0, 0, 0, 0.8);
      .material-icons {
        margin-top: 446%;
        margin-left: -10px;
      }
    }
  }
  .film-wrap {
    height: 157.5px;
    width: 1500px;
    margin-left: -242px;
    transition: margin-left $swipe-left-time;
    &.active {
      transition: none;
    }
    @media screen and (min-width: 1024px) {
      height: 100%;
      width: 100%;
      margin-left: 0 !important;
    }
  }
  .film {
    height: 100%;
    width: 280px;
    float: left;
    border-right: 1px solid black;
    border-left: 1px solid black;
    background-size: contain;
    @media screen and (min-width: 1024px) {
      width: 100%;
      background-size: 100% !important;
    }
    &.swipe-left-enter-active, &.swipe-left-leave {
      transition: width $swipe-left-time;
      width: 280px;
      overflow: hidden;
      @media screen and (min-width: 1024px) {
        transition: opacity $swipe-left-time;
        width: 100%;
        opacity: 1;
      }
    }
    &.swipe-left-enter, &.swipe-left-leave-active {
      transition: width $swipe-left-time;
      overflow: hidden;
      width: 0px;
      @media screen and (min-width: 1024px) {
        transition: opacity $swipe-left-time;
        width: 100%;
        opacity: 0;
      }
    }
  }
}

</style>
