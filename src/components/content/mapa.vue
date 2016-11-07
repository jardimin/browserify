<template>

  <div id="mapa" class="content_mapa" ref="mapa"></div>

</template>

<script>
import L from 'leaflet'

export default {
  name: 'content-map',

  props: {
    conteudo: Object
  },

  data () {
    return {
      _mapa: null
    }
  },

  methods: {
    loadData () {
      var self = this
      if (typeof this.conteudo.mapa.locais === 'string') {
        var url = 'https://spreadsheets.google.com/feeds/list/' + this.conteudo.mapa.locais + '/od6/public/values?alt=json-in-script&callback=?';

        // console.log('mapa-spreadsheet will load now')

        $.getJSON(url).success( (data) => {

          var entries = []

          data.feed.entry.map( (d,i) => {
            
            var o = {}      // object
            var s = 'gsx$' // string

            for (var prop in d) {
              if(d.hasOwnProperty(prop) && prop.indexOf(s) == 0){
                o[prop.split(s).join('')] = d[prop]['$t']
              }
            }

            entries.push(o)
          })          

          var markers = []
          
          // console.log(self._mapa);

          for (var i = 0; i < entries.length; i++) {
            // console.log(entries[i].lat);
            markers.push(L.marker([parseFloat(entries[i].lat), parseFloat(entries[i].lon)]).bindPopup('<a href="' + entries[i].site + '" target="_blank" class="mapa-link">' + entries[i].nome + '</a>'))
          }

          L.layerGroup(markers).addTo(this._mapa);

        }).error( (message) => {

          // console.log('mapa-spreadsheet error: ' + message)

        }).complete( () => {

          // console.log('completed mapa-spreadsheet load!')
          setTimeout( () => {
            $('.mapa-link').on('click', (e) => {
              e.preventDefault()
              this.openLink(e.currentTarget.href)
            })
          }, 1000)

        })
      } else if(typeof this.conteudo.mapa.locais === 'object') {
        var entries = this.conteudo.mapa.locais
        var markers = []

        for (var i = 0; i < entries.length; i++) {
          markers.push(L.marker([entries[i].lat, entries[i].lon]).bindPopup('<a href="' + entries[i].site + '" target="_blank">' + entries[i].nome + '</a>'))
        }

        L.layerGroup(markers).addTo(this._mapa);
      }
    },
    openLink (link) {
      this.$store.dispatch('openLink', link)
    }
  },

  mounted: function () {
    this.$nextTick( () => {
      // console.log('content-mapa attached!')
      this._mapa = L.map(this.$refs.mapa, { zoomControl: true }).setView([this.conteudo.mapa.geo[0], this.conteudo.mapa.geo[1]], this.conteudo.mapa.geo[2])
      // console.log('test');

      new L.Control.Zoom({ position: 'topright' }).addTo(this._mapa)

      // add an OpenStreetMap tile layer
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this._mapa)

      this.loadData();

      // this._mapa.on('click', (e) => {
      //   console.log(e)
      // })
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
.content_mapa {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  background: #333;
}
.leaflet-top, .leaflet-bottom {
  z-index: 1;
}
</style>