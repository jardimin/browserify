<template>
  <div class="home">
    <div v-if="loaded" class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
      <transition name="swipe-top-2">
        <div v-show="ready" :films="films" :ready="ready" :device="device" :is="device ? 'carousel' : 'carouseldesk'" ref="carousel" v-on:slide="changeVideo" v-on:right="right" v-on:left="left"></div>
      </transition>
      <transition name="swipe-top">
        <header id="header" v-show="ready" class="mdl-layout__header">
          <div aria-expanded="false" role="button" tabindex="0" class="mdl-layout__drawer-button" @click="openDrawer"><i class="material-icons">menu</i></div>
          <!-- Tabs -->
          <div class="mdl-layout__tab-bar mdl-js-ripple-effect">
            <router-link :to="'/home/'+id+'/descricao'" class="mdl-layout__tab" active-class="is-active">Descrição</router-link>
            <router-link :to="'/home/'+id+'/info'" class="mdl-layout__tab" active-class="is-active">Detalhes</router-link>
          </div>
        </header>
      </transition>
      <transition name="appear">
        <main v-show="ready" class="mdl-layout__content">
          <div class="page-content">
            <div class="mdl-grid">
              <div class="mdl-cell mdl-cell--12-col">
                <transition name="body-fade" mode="out-in" appear appear-class="appear" appear-active-class="appear-active">
                  <div :is="body" v-if="atual" :films="films" :atual="atual" :id="id" :direcao="direcao" :device="device"></div>
                </transition>
              </div>
            </div>
          </div>
        </main>
      </transition>
    </div>
  </div>
</template>

<script>
import _ from 'underscore'

import Carousel from '../components/home-carousel.vue'
import Carouseldesk from '../components/home-carousel-desk.vue'
import Descricao from '../components/home-body-desc.vue'
import Info from '../components/home-body-info.vue'

export default {
  props: {
    loaded: Boolean,
    connected: Boolean,
    hipervideos: Array,
    device: Boolean
  },

  data () {
    return {
      ready: false,
      id: '',
      body: 'descricao',
      films: [],
      direcao: '',
      atual: null
    }
  },

  watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/')[3]
      const fromDepth = from.path.split('/')[3]
      if (toDepth !== fromDepth) {
        this.body = toDepth
      }
    },
    films: function (val, oldVal) {
      if (val.length === this.hipervideos.length && val.length === oldVal.length) {
        this.ready = true
        console.log('ready')
      }
    },
    ready: function (val, oldVal) {
      this.films = _.sortBy(this.films, 'index')
    }
  },

  methods: {
    openDrawer () {
      this.$emit('open-drawer')
    },
    changeVideo () {
      this.id = this.device ? this.$refs.carousel.carousel[2].card : this.films[this.$refs.carousel.index].card
      this.atual = _.findWhere(this.films, {card: this.id})
      this.$router.push(`/home/${this.id}/${this.body}`)
    },
    right () {
      this.direcao = 'right'
    },
    left () {
      this.direcao = 'left'
    }
  },

  mounted: function() {
    this.$nextTick( () => {
      for (let i in this.hipervideos) {
        Trello.get(`/lists/${this.hipervideos[i]}/cards`, (data) => {
          let headers = _.findWhere(data, { "name": "headers" })
          let film = {}
          let props = JSON.parse(headers.desc)
          for (let k of Object.keys(props)) {
            film[k] = props[k];
          }
          film['card'] = headers.id
          film['hip'] = this.hipervideos[i]
          this.films.push(film)
        });
      }
    })
  },

  updated: function() {
    this.$nextTick(function () {
      componentHandler.upgradeDom()
    })
  },

  components: {
    Carousel,
    Carouseldesk,
    Descricao,
    Info
  }
}
</script>

<style lang="scss">
header#header {
  position: relative;
  @media screen and (min-width: 1024px) {
    position: absolute;
    top: 40%;
    padding-left: 3% !important;
    width: 48%;
  }
}
.mdl-layout__tab-bar-container {
  height: 56px;
  @media screen and (min-width: 1024px) {
    height: 64px;
  }
  .mdl-layout__tab {
    @media screen and (max-width: 1024px) {
      padding: 4px 12px;
    }
  }
  .mdl-layout__tab-bar {
    @media screen and (min-width: 1024px) {
      padding-top: 10px;
      .mdl-layout__tab {
        height: 54px;
      }
    }
  }
}
.home {
  .page-content {
    height: 50px;
  }
}
@media screen and (min-width: 1024px) {
  main {
    position: absolute !important;
    top: 49%;
    padding-left: 5%;
    height: 100%;
    width: 40%;
    background: rgba(0,0,0,0.8);
    p {
      color: white;
    }
  }
  .mdl-layout {
    overflow: hidden;
  }
}
@media screen and (min-width: 1600px) {
  main {
    top: 47%;
  }
}

$swipe-top-time: .3s ease 1s;
$swipe-top-2-time: .5s ease .5s;
$time: .3s;
$appear: .3s ease 1.5s;

.swipe-top-enter-active, .swipe-top-leave {
  transition: height $swipe-top-time, min-height $swipe-top-time;
  height: 56px;
  min-height: 56px;
  overflow: hidden;
  @media screen and (min-width: 1024px) {
    transition: width .5s;
    height: 64px;
    min-height: 64px;
  }
}
.swipe-top-enter, .swipe-top-leave-active {
  transition: height $swipe-top-time, min-height $swipe-top-time;
  overflow: hidden;
  height: 0;
  min-height: 0;
  @media screen and (min-width: 1024px) {
    transition: width .5s;
    height: 64px;
    min-height: 64px;
    width: 70px !important;
  }
}

.body-fade-enter-active, .body-fade-leave {
  transition: opacity $time, transform $time;
  opacity: 1;
  transform: translateY(0px);
}
.body-fade-leave-active, .body-fade-enter {
  transition: opacity $time, transform $time;
  opacity: 0;
  transform: translateY(20px);
}

.appear-enter-active {
  transition: opacity $appear, transform $appear;
  opacity: 1;
  transform: translateY(0px);
}
.appear-enter {
  transition: opacity $appear, transform $appear;
  opacity: 0;
  transform: translateY(20px);
}

#carousel-home {
  &.swipe-top-2-enter-active, &.swipe-top-2-leave {
    transition: height $swipe-top-2-time;
    height: 157.5px;
    overflow: hidden;
    @media screen and (min-width: 1024px) {
      transition: opacity $swipe-top-2-time;
      background-size: 100% !important;
      position: absolute;
      height: 100%;
      overflow: hidden;
      opacity: 1;
    }
  }
  &.swipe-top-2-enter, &.swipe-top-2-leave-active {
    transition: height $swipe-top-2-time;
    overflow: hidden;
    height: 0px;
    @media screen and (min-width: 1024px) {
      transition: opacity $swipe-top-2-time;
      background-size: 100% !important;
      position: absolute;
      height: 100%;
      overflow: hidden;
      opacity: 0;
    }
  }
}


</style>