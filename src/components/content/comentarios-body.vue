<template>

  <div id="coments-body">
    <main id="posts" class="mdl-grid mdl-layout__content">
      <div v-for="coment in comentarios" class="mdl-cell mdl-cell--12-col">
        <div class="coment mdl-card mdl-shadow--2dp single-card mdl-grid" style="width: 100%;">
          <div class="coment_usr mdl-cell mdl-cell--2-col">
            <img :src="coment.usr.foto">
            <p style="text-align: center;">{{coment.usr.nome}}</p>
          </div>
          <div class="coment_text mdl-cell mdl-cell--10-col">
            <p v-html="coment.text"></p>
          </div>
        </div>
      </div >
    </main>
    <div class="mdl-grid" style="position: absolute;padding: 0;width: 100%;bottom: 0;">
      <div v-if="user.connected" id="chat_text" class="mdl-card mdl-shadow--2dp single-card mdl-grid">
        <div class="mdl-cell mdl-cell--10-col">
          <div class="mdl-textfield mdl-js-textfield">
            <textarea class="mdl-textfield__input" type="text" :rows="chat_rows" @keyup.enter="enterEvent" id="comente" v-model="chat_text"></textarea>
            <label class="mdl-textfield__label" for="address">Deixe um comentário...</label>
          </div>
        </div>
        <div class="coment_text mdl-cell mdl-cell--2-col">
          <button @click="sendChat" class="mdl-button mdl-js-button mdl-button--icon">
            <i class="material-icons">send</i>
          </button>
        </div>
      </div>
      <div v-if="!user.connected" id="chat_user" class="mdl-card mdl-shadow--4dp single-card mdl-grid">
        <div class="mdl-cell mdl-cell--12-col">
          <button @click="connect" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
            <i class="fa fa-trello" aria-hidden="true"></i>
            Conecte-se com o Trello
          </button>
        </div>
      </div>
    </div >
  </div>

</template>

<script>
import marked from 'marked'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'content-comentarios-body',

  data () {
    return {
      chat_rows: 1,
      chat_text: '',
      comentarios: []
    }
  },

  computed: mapGetters([
    'user',
    'content_blocks'
  ]),

  methods: {
    addRow () {
      this.chat_rows += 1
    },
    sendChat () {
      var c = {
        text: '',
        usr: {
          nome: this.user.nome,
          foto: this.user.img,
          id: this.user.board
        }
      }

      Trello.post('/cards/'+this.content_blocks[0].card+'/actions/comments', {text: this.chat_text}, (data) => {
        console.log(data)
      })
      c.text = this.chat_text
      this.comentarios.push(c)
      this.chat_rows = 1
      this.chat_text = ''
    },
    enterEvent (e) {
      if (e.ctrlKey) {
        this.sendChat()
      } else {
        this.addRow()
      }
    },
    connect () {
      this.$store.dispatch('connectUser')
    }
  },

  created: function () {
    this.$nextTick( () => {
      Trello.get("/cards/"+this.content_blocks[0].card+"/actions", (comment) => {
        for (var i = comment.length - 1; i >= 0; i--) {
          if (comment[i].type === 'commentCard') {
            var c = {
              text: '',
              usr: {
                foto: 'https://trello-avatars.s3.amazonaws.com/'+ comment[i].memberCreator.avatarHash +'/30.png',
                nome: comment[i].memberCreator.username,
                id: comment[i].memberCreator.id
              }
            }
            c.text = marked(comment[i].data.text)
            this.comentarios.push(c)
          }
        }
      })
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
#coments-body {
  height: calc(100% - 59px);
  position: relative;
}
#posts {
  width: 100%;
  box-sizing: border-box;
  height: calc(100% - 75px);
}
.coment {
  background: rgba(255,255,255,.1);
  min-height: 0;
  .coment_usr {
    width: 10%;
    border-right: 1px solid rgba(255,255,255,.3);
    img {
      border-radius: 50%;
      margin-left: 8%;
      width: 100%;
    }
  }
  .coment_text {
    @media (max-width: 768px) {
      width: calc(84% - 16px);
    }
  }
}
#chat_user {
  min-height: 0;
  background: rgba(255,255,255,0.8);
  margin: 0;
  width: 100%;
  button {
    width: 100%;
    height: 100%;
  }
}
#chat_text {
  min-height: 0;
  background: rgba(255,255,255,0.8);
  margin: 0;
  width: 100%;
  .mdl-textfield {
    width: 100%;
    padding: 0;
    padding-top: 0;
  }
  .mdl-cell--10-col {
    @media (max-width: 768px) {
      width: calc(89% - 16px);
    }
  }
  .coment_text {
    @media (max-width: 768px) {
      width: calc(10% - 16px);
    }
  }
  button {
    &:hover {
      background: transparent;
      .material-icons {
        color: rgba(0,0,0,.6);
      }
    }
  }
  textarea {
    color: rgba(0,0,0,.6);
  }
  .material-icons {
    font-size: 30px;
    color: rgba(0,0,0,.2);
  }
}
</style>