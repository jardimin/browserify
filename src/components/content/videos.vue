<template>

  <div id="info-videos">
    <div class="mdl-grid" id="video_list">
      <div v-for="video in videos" class="mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet">
        <a href="#" target="_blank" :title="video.title" style="text-decoration: none; text-align: center;" class="popup-iframe" @click.prevent="openLink(video.url)">
          <div class="mdl-card mdl-shadow--2dp single-card">
            <img :alt="video.title" :src="'http://img.youtube.com/vi/' + video.id + '/mqdefault.jpg'">
            <div class="mdl-card__title">
              <h2 class="mdl-card__title-text">{{video.title}}</h2>
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
  name: 'content-videos',

  props: {
    conteudo: Object
  },

  data () {
    return {
      videos: []
    }
  },

  methods: {
    loadVideos () {
      var playlistUrl = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=25&playlistId=' + this.conteudo.videos + '&key=AIzaSyCwNv14d5bNQ4MwaodqT6z45-6A5y4kzus';
      var videoURL= 'https://www.youtube.com/embed/';
      $.getJSON(playlistUrl, (data) => {
        // console.log(data);
        $.each(data.items, (i, item) => {
          // console.log(item)
          var video_data = {};
          video_data.title = item.snippet.title;
          video_data.id = item.snippet.resourceId.videoId;
          video_data.url = videoURL + video_data.id;
          this.videos.push(video_data);
        })
      })
    },
    openLink (link) {
      this.$store.dispatch('openLink', link)
    }
  },

  created: function () {
    this.$nextTick( () => {
      this.loadVideos()
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
#video_list {
  .mdl-card {
        min-height: 150px !important;
  }
  .mdl-card__title {
    padding: 10px;
    .mdl-card__title-text {
      font-size: 14px;
    }
  }
}
</style>