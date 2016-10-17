<template>
  <div id="user">
    
  </div>
</template>

<script>
import md5 from 'blueimp-md5'

export default {
  props: {
    board: String,
    connected: Boolean,
    trelloId: String
  },

  data () {
    return {
      user_board: '',
      nome: '',
      email: '',
      img: ''
    }
  },

  watch: {
    connected: function (val, oldVal) {
      if (val === false) {
        this.user_board = ''
        this.nome = ''
        this.email = ''
        this.img = ''
        document.cookie = "user=false"
      }
    }
  },

  created: function() {
    this.$nextTick( () => {
      
    })
  },

  updated: function() {
    this.$nextTick(function () {
      componentHandler.upgradeDom()
    })
  },

  methods: {
    connect () {
      let opt = {
        type: "popup",
        name: "hipevideo",
        persist: false,
        scope:  { read: true, write: true, account: true },
        expiration: "1hour",
        success: () => {
          this.$emit('connected')
          document.cookie = "user=true"
          Trello.get("/search", {query: "HP_myData"}, (data) => {
            if (data.boards.length === 0) {
              Trello.post("/boards", {
                name: "HP_myData",
                defaultLists: false,
                prefs_permissionLevel: "public",
                prefs_comments: "public"
              }, (data) => {
                this.user_board = data.id
              })
            } else {
              this.user_board = data.boards[0].id
              Trello.get("/boards/"+data.boards[0].id+"/members", (data) => {
                this.nome = data[0].username
                Trello.get("/members/"+this.nome+"/email", (data) => {
                  this.email = data._value
                  this.img = "https://www.gravatar.com/avatar/"+md5(data._value)+"?s=250"
                })
              })              
            }
          })
        }
      }
      Trello.authorize(opt)
    }
  },

  components: {
    
  }

}
</script>

<style lang="scss">
$time: .5s;

.teste {
  width: 100%;
  height: 150px;
  background: green;
}
.loader {
  position: fixed;
  width: 100%;
  height: 100%;
  padding-top: 20%;
  padding-left: 49%;
  background: white;
}
.fade-enter-active, .fade-leave {
  transition: opacity $time;
  opacity: 1;
}
.fade-leave-active, .fade-enter {
  transition: opacity $time;
  opacity: 0;
}

.slide-enter-active, .slide-leave {
  transition: transform $time, opacity $time;
  transform: translateX(0);
  opacity: 1;
}
.slide-enter {
  transition: transform $time, opacity $time;
  transform: translateX(-20px);
  opacity: 0;
}
.slide-leave-active {
  @extend .slide-enter;
  transform: translateX(20px);
}

</style>
