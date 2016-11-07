<template>

  <div id="info-links">
    <div class="mdl-grid" id="list_files">
      <div v-for="link in link_files" class="mdl-cell mdl-cell--2-col">
        <a :href="link.link" @click.prevent="openLink(link.link)" :title="link.nome" style="text-decoration: none; text-align: center;" class="popup-iframe">
          <div class="mdl-card mdl-shadow--2dp single-card">
            <div><i class="material-icons">{{link.icon}}</i></div>
            <div class="mdl-card__title">
              <h2 class="mdl-card__title-text">{{link.nome}}</h2>
            </div>
          </div>
        </a>
      </div>
    </div>
    <div class="mdl-grid" id="list_links">
      <div v-for="link in link_cards" class="mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet">
        <a :href="link.link" @click.prevent="openLink(link.link)" :title="link.nome" style="text-decoration: none; text-align: center;">
          <div class="mdl-card mdl-shadow--2dp single-card" :style="{ backgroundImage: 'url('+link.img+')' }" style="background-size: auto 100%; background-position-x: -75px;background-position-y: 25px;">
            <!-- <img :alt="link.nome" :src="link.img"> -->
            <div class="mdl-card__title" style="background: rgb(103,58,183)">
              <h2 class="mdl-card__title-text" style="color: white;">{{link.nome}}</h2>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'content-links',

  props: {
    conteudo: Object
  },

  data () {
    return {
      link_files: [],
      link_cards: []
    }
  },

  methods: mapActions([
    'openLink'
  ]),

  created: function () {
    this.$nextTick( () => {
      for (var i = 0; i < this.conteudo.links.length; i++) {
        var n = {}
        var split = this.conteudo.links[i].link.split('.')
        var format = split[split.length - 1]
        if (format === "jpg" || format === "png" || format === "jpeg") {
          n.icon = 'photo'
          n.nome = this.conteudo.links[i].nome
          n.link = this.conteudo.links[i].link
          this.link_files.push(n)
        } else if (format === "pdf" || format === "doc" || format === "odt" || format === "docx") {
          n.icon = 'insert_drive_file'
          n.nome = this.conteudo.links[i].nome
          n.link = this.conteudo.links[i].link
          this.link_files.push(n)
        } else {
          n.nome = this.conteudo.links[i].nome
          n.img = "https://s3-sa-east-1.amazonaws.com/jardim-sites/hipervideo-modelo/fundo_link.png"
          n.desc = ""
          n.link = this.conteudo.links[i].link
          this.link_cards.push(n)
        }
      }
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
#list_files {
  .mdl-card {
    min-height: 100px;
    width: 100%;
  }
  .material-icons {
    font-size: 80px;
  }
  .mdl-card__title {
    padding: 10px;
    background: rgba(0,0,0,.2);
    .mdl-card__title-text {
      font-size: 14px;
    }
  }
}
#list_links {
  .mdl-card {
    min-height: 350px;
    @media screen and (max-width: 1366px) {
      min-height: 205px;
    }
  }

}
.mdl-layout.is-upgraded .mdl-layout__tab.is-active::after {
  background: white;
}
</style>