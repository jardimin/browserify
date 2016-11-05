<template>
  <div id="hv-drawer" v-if="hv.headers">
    <hr>
    <div class="section">
                
      <div class="title">
        <h4 class="name">Qualidade</h4>
      </div>
    
      <div class="">
        
        <div class="slider-wrap">
          <input class="mdl-slider mdl-js-slider" type="range" min="0" max="2" tabindex="0" step="1" :value="qualidade" @input="mudaQual">
        </div>
      
        <div class="mdl-grid mdl-grid--no-spacing">
            
          <div class="qual-label qual-div1">
            <span :class="{ active: qualidade === 0 }" >Baixa</span>
          </div>

          <div class="qual-label qual-div2">
            <span :class="{ active: qualidade === 1 }" >Média</span>
          </div>

          <div class="qual-label qual-div3">
            <span :class="{ active: qualidade === 2 }" >Alta</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Card Acessibilidade Start -->
    <hr>
    <div class="section">

      <div class="title">
        <h4 class="name">Acessibilidade</h4>
      </div>

      <div class="">
        <div class="mdl-grid" style="padding-top: 0;">
          <div class="mdl-cell mdl-cell--12-col" style="margin-top: 0;">

            <ul class="demo-list-control mdl-list acess" style="padding-top: 0; margin-top: 0; padding-bottom: 0; margin-bottom: 0;">
              <li class="mdl-list__item">
                <span class="mdl-list__item-primary-content">
                  Libras
                </span>
                <span class="mdl-list__item-secondary-action">
                  <label class="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="list-switch-1"  id="label-switch-1">
                    <input type="checkbox" id="list-switch-1" class="mdl-switch__input" :disabled="!hv.headers.acessibilidade.libras" value="libras" :checked="acessibilidade === 'libras'" @click="mudaAcess" />
                  </label>
                </span>
              </li>
              <li class="mdl-list__item">
                <span class="mdl-list__item-primary-content">
                  Audio Descrição
                </span>
                <span class="mdl-list__item-secondary-action">
                  <label class="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="list-switch-2"  id="label-switch-2">
                    <input type="checkbox" id="list-switch-2" class="mdl-switch__input" :disabled="!hv.headers.acessibilidade.audio" value="audio" :checked="acessibilidade === 'audio'" @click="mudaAcess" />
                  </label>
                </span>
              </li>
            </ul>

          </div>
        </div>
      </div>

    </div>
    <!-- Card Acessibilidade End-->

    <!-- Card Cartelas Start -->
    <hr>
    <div class="section">

      <div class="title">
        <h4 class="name">Personas</h4>
      </div>

      <div class="">
        <div class="mdl-grid" style="padding-top: 0;">
          <div class="mdl-cell mdl-cell--12-col" style="margin-top: 0;">

            <span v-for="cartela in hv.cartelas" class="mdl-chip mdl-chip--contact" style="margin-top: 10px;">
              <span class="mdl-chip__contact mdl-color--deep-purple mdl-color-text--white">
                <i class="material-icons" style="margin-top: 10px;">account_circle</i>
              </span>
              
              <span class="mdl-chip__text">{{cartela.title}}</span>

            </span>

          </div>
        </div>
      </div>

    </div>
    <!-- Card Cartelas End-->

    <!-- Card Eventos Start -->
    <hr>
    <div class="section">

      <div class="title">
        <h4 class="name">Eventos</h4>
      </div>

      <div class="">
        <div class="mdl-grid" style="padding-top: 0;">
          <div class="mdl-cell mdl-cell--12-col" style="margin-top: 0;">

            <span v-for="evento in hv.eventos" class="mdl-chip mdl-chip--contact" style="margin-top: 10px;">
              <span class="mdl-chip__contact mdl-color--deep-purple mdl-color-text--white">
                <i class="material-icons" style="margin-top: 10px;">explicit</i>
              </span>
              
              <span class="mdl-chip__text">{{evento.title}}</span>

            </span>

          </div>
        </div>
      </div>

    </div>
    <!-- Card Eventos End-->

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'hv-drawer',
  computed: mapGetters([
    'hv',
    'qualidade',
    'acessibilidade'
  ]),

  methods: {
    mudaQual (obj) {
      this.$store.commit('CHANGE_QUAL', { qual: obj.srcElement.valueAsNumber })
    },
    mudaAcess (obj) {
      if (obj.srcElement.defaultValue === 'libras' && obj.srcElement.checked) {
        this.$store.commit('CHANGE_ACESS', { acess: obj.srcElement.defaultValue })
        let el = document.getElementById('label-switch-2')
        el.className = el.className.split('is-checked')[0] + el.className.split('is-checked')[1]
      } else if (obj.srcElement.defaultValue === 'audio' && obj.srcElement.checked) {
        this.$store.commit('CHANGE_ACESS', { acess: obj.srcElement.defaultValue })
        let el = document.getElementById('label-switch-1')
        el.className = el.className.split('is-checked')[0] + el.className.split('is-checked')[1]
      } else if (!obj.srcElement.checked) {
        this.$store.commit('CHANGE_ACESS', { acess: 'normal' })
      }
    }
  }

}
</script>

<style lang="scss">
#hv-drawer {
  .section {
    .title {
      padding-bottom: 0;
      text-align: center;
      width: 100%;
      margin-bottom: 0;
      .name {
        text-align: center;
        width: 100%;
        margin: 0;
        font-weight: 300;
      }
    }
    .mdl-list__item {
      padding: 0;
      padding-right: 15px;
    }
  }
  .qual-label {
    width: 100%;
    
    span {
      -webkit-transition: all .1s ease;
         -moz-transition: all .1s ease;
          -ms-transition: all .1s ease;
           -o-transition: all .1s ease;
              transition: all .1s ease;
    }
    .active {
      font-weight: 900;
      font-size: 16px;
    }
    .span {
      margin: 0 27%;
      text-align: center;
    }
  }
  .qual-div {
    width: 33%;
  }
  .qual-div1 {
    @extend .qual-div; 
    text-align: left;
  }

  .qual-div2 {
    @extend .qual-div; 
    text-align: center;
  }

  .qual-div3 {
    @extend .qual-div; 
    text-align: right;
  }
}
</style>