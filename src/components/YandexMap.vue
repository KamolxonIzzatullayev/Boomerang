<template>
  <div class="yandex-map">
    <yandex-map
      v-if="isMapVisible"
      ref="map"
      :coords="coords"
      zoom="12"
      style="width: 100%; height: 100vh;"
      :controls="[]"
    >
    <ymapMarker :coords="coords"></ymapMarker>
    <ymap-marker 
      marker-type="Polyline"
      :coords="history"
      strokeColor='#000000'
      strokeWidth="4"
    ></ymap-marker>
    </yandex-map>
  </div>
</template>

<script>
import { yandexMap, ymapMarker } from "vue-yandex-maps";

export default { 
  components: {
    yandexMap, ymapMarker
  },
  data() {
    return {
        isMapVisible: false,
        coords: [55.72, 37.65],
        history: [[38.8280899, 65.2735666], [39.8280899, 66.2735666]]
    };
  },
  mounted(){
    setTimeout(() => {
        this.isMapVisible = true
        this.getData()
        this.getHistory()
    }, 1000);
  },
  methods: {
    getData() {
        this.coords = this.$store.getters.getLat;
    },
    getHistory() {
        this.history = this.$store.getters.getHistory;
    }
  },
};
</script>

<style lang="scss" scoped>
</style>