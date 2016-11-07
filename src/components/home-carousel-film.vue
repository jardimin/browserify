<template>
  <div class="film" :style="{ backgroundImage: 'url(' + this.img + ')' }" style="background-size: contain;">
    <div class="play" @click="playTouch">
      <i v-if="!device" class="arrow_play material-icons">play_arrow</i>
      <i class="outline_play material-icons">play_circle_outline</i>
      <div class="background"></div>
    </div>
    <div v-if="!device" class="title" key="title">
      <img :src="title">
    </div>
    <div v-if="!device" class="capa" key="capa">
      <img :src="capa">
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'carousel-film',
  props: {
    film: Object
  },

  data () {
    return {
      img: '',
      title: '',
      capa: ''
    }
  },

  computed: mapGetters([
    'device'
  ]),

  watch: {

  },

  methods: {
    playTouch () {
      this.$router.push(`/hipervideo/${this.film.hip}`)
    }
  },

  created: function() {
    this.$nextTick( () => {
      Trello.get(`/cards/${this.film.card}/attachments`, (data) => {
        if (this.device) {
          this.img = data[1].url
        } else {
          this.img = ''
          this.title = data[2].url
          this.capa = data[3].url
        }
        
      });
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
#carousel-home {
  .film {
    &.swipe-left-enter-active, &.swipe-left-leave {
      .title {
        transition: left .5s ease-out, opacity .2s ease-out .2s;
        left: 30px;
        opacity: 1;
      }
      .capa {
        transition: bottom .5s, opacity .3s ease .1s;
        bottom: 0;
        opacity: 1;
        @media screen and (min-width: 1440px) {
          bottom: 165px;
        }
      }
      .play {
        transition: opacity .3s ease .4s;
        opacity: .2;
      }
    }
    &.swipe-left-enter, &.swipe-left-leave-active {
      .title {
        transition: left .5s ease-in, opacity .2s ease-in .2s;
        left: -200px;
        opacity: 0;
      }
      .capa {
        transition: bottom .5s ease .2s, opacity .3s ease .1s;
        bottom: -300px;
        opacity: 0;
      }
      .play {
        transition: opacity .3s;
        opacity: 0;
      }
    }
    .title {
      position: absolute;
      height: 200px;
      width: 400px;
      top: 30px;
      z-index: 2;
      left: 30px;
      @media screen and (min-width: 1440px) {
        img {
          width: 150%;
        }
      }
    }
    .capa {
      position: absolute;
      height: 600px;
      width: 850px;
      z-index: 1;
      bottom: 0;
      left: 450px;
      img {
        width: 100%;
      }
      @media screen and (min-width: 1440px) {
        bottom: 165px;
        left: 380px;
        img {
          width: 130%;
        }
      }
      @media screen and (min-width: 1920px) {
        left: 700px;
        img {
          width: 130%;
        }
      }
    }
    .play {
      position: absolute;
      left: 46%;
      top: 35%;
      opacity: .4;
      .material-icons.outline_play {
        position: absolute;
        color: white;
        text-shadow: 0px 0px 10px black;
      }
      @media screen and (min-width: 1024px) {
        transition: transform .2s, opacity .2s;
        left: 65%;
        z-index: 5;
        width: 145px;
        top: 40%;
        height: 165px;
        opacity: .2;
        cursor: pointer;
        &:hover {
          transform: scale(1.1);
          opacity: 1;
          .material-icons.arrow_play {
            color: red;
          }
          .material-icons.outline_play {
            text-shadow: 3px 3px 10px black;
          }
          .background {
            background: rgba(0,0,0,.6);
          }
        }
        .material-icons.arrow_play {
          transition: color .2s;
          position: absolute;
          font-size: 110px;
          margin-top: 26px;
          color: white;
          margin-left: 19px;
          z-index: 1;
        }
        .material-icons.outline_play {
          transition: text-shadow .2s;
          position: absolute;
          font-size: 160px;
          text-shadow: 3px 3px 3px black;
          margin-top: 0;
          color: white;
        }
        .background {
          transition: background .2s;
          width: 122px;
          height: 120px;
          z-index: -1;
          position: absolute;
          margin-top: 20px;
          background: rgba(0,0,0,0);
          margin-left: 8px;
          border-radius: 50%;
        }
      }
      
    }
  }
}

</style>
