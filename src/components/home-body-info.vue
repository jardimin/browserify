<template>
  <div class="ficha">
    <transition :name="direcao">
      <div v-if="on">
        <h4>DURAÇÃO</h4>
        <div class="duracao">{{duracao}}</div>
        <div class="qualidade lista">
          <h4>QUALIDADES</h4>
          <div class="baixa item" :class="{not: !baixa}">
            <i class="material-icons">{{ baixa ? 'done' : 'clear'}}</i>
            <p>BAIXA</p>
          </div>
          <div class="media item" :class="{not: !media}">
            <i class="material-icons">{{ media ? 'done' : 'clear'}}</i>
            <p>MEDIA</p>
          </div>
          <div class="alta item" :class="{not: !alta}">
            <i class="material-icons">{{ alta ? 'done' : 'clear'}}</i>
            <p>ALTA</p>
          </div>
        </div>
        <div class="acessibilidade lista">
          <h4>ACESSIBILIDADE</h4>
          <div class="libras item" :class="{not: !libras}">
            <i class="material-icons">{{ libras ? 'done' : 'clear'}}</i>
            <p>LIBRAS</p>
          </div>
          <div class="audio item" :class="{not: !audio}">
            <i class="material-icons">{{ audio ? 'done' : 'clear'}}</i>
            <p>{{ device ? 'ÁUDIO' : 'ÁUDIO DESCRIÇÃO'}}</p>
          </div>
          <div class="cc item" :class="{not: !cc}">
            <i class="material-icons">{{ cc ? 'done' : 'clear'}}</i>
            <p>LEGENDAS</p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import marked from 'marked'
import _ from 'underscore'

export default {
  props: {
    films: Array,
    atual: Object,
    id: String,
    device: Boolean,
    direcao: String
  },

  data () {
    return {
      duracao: this.atual.duracao,
      baixa: this.atual.qualidades.baixa,
      media: this.atual.qualidades.media,
      alta: this.atual.qualidades.alta,
      libras: this.atual.acessibilidade.libras,
      audio: this.atual.acessibilidade.audio,
      cc: this.atual.acessibilidade.cc,
      on: true
    }
  },

  watch: {
    id: function (val, oldVal) {
      setTimeout( () => {
        this.on = false
      },50)
      setTimeout( () => {
        this.on = true
        this.duracao = this.atual.duracao
        this.baixa = this.atual.qualidades.baixa
        this.media = this.atual.qualidades.media
        this.alta = this.atual.qualidades.alta
        this.libras = this.atual.acessibilidade.libras
        this.audio = this.atual.acessibilidade.audio
        this.cc = this.atual.acessibilidade.cc
      },200)
    }
  },

  filters: {
    marked: function(value) {
      return marked(value)
    }
  },

  methods: {
    
  },

  mounted: function() {
    this.$nextTick( () => {

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
.ficha {
  h4 {
    margin: 0;
    text-align: center;
    color: black;
    width: 100%;
    @media screen and (min-width: 1024px) {
      color: white;
    }
  }
  .duracao {
    width: 100%;
    text-align: center;
    font-size: 16px;
    color: black;
    border-bottom: 1px solid;
    padding-bottom: 5px;
    @media screen and (min-width: 1024px) {
      color: white;
    }
  }
  .lista {
    width: 50%;
    height: 200px;
    float: left;
    padding: 10px;
    box-sizing: border-box;
    h4 {
      font-size: 17px;
    }
    .item {
      width: 100%;
      text-align: center;
      height: 50px;
      position: relative;
      background: rgba(0,0,0,0.1);
      margin-bottom: 10px;
      @media screen and (min-width: 1024px) {
        background: rgba(255,255,255,0.1);
      }
      .material-icons {
        margin-top: 13px;
        position: absolute;
        left: 10px;
        color: green;
      }
      p {
        padding-top: 13px;
      }
      &.not {
        background: rgba(0,0,0,0.03);
        @media screen and (min-width: 1024px) {
          background: rgba(255,255,255,0.03);
        }
        .material-icons {
          color: red;
        }
        p {
          color: rgba(0,0,0,.4);
          @media screen and (min-width: 1024px) {
            color: rgba(255,255,255,.4);
          }
        }
      }
    }
  }
}
</style>
