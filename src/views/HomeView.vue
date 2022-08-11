<template>
  <div class="home">
    <div class="hi">
      <div id="hi"></div>
    </div>
    <div class="map">
      <YandexMap />
    </div>
  </div>
</template>

<script>
import YandexMap from "@/components/YandexMap.vue";
import store from "@/store";
export default {
  name: "HomeView",
  data() {
    return {
      result: 1,
      data: {
        action: "ws.admin.objects",
        data: {},
      },
      history: {
        action: "ws.admin.object_history",
        data: {
          start_time: "yyyy-mm-dd HH:MM",
          end_time: "yyyy-mm-dd HH:MM",
          object_id: 4358,
        },
      },
      historyData: {},
    };
  },
  methods: {
    sendMessage(message) {
      const mes = JSON.stringify(message);
      const result = this.connection.send(mes);
    },
    getHistory() {
      
      const now = new Date();
      const year = now.getFullYear();
      let month = +now.getMonth() + 1;
      if (String(month).length === 1) {
        month = "0" + String(month);
      }
      const date = now.getDate();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      let lastDate = now.getDate() - 3;
      if (String(lastDate).length === 1) {
        lastDate = "0" + String(lastDate);
      }
      const today =
        year + "-" + String(month) + "-" + date + " " + hours + ":" + minutes;
      const lastDay =
        year +
        "-" +
        String(month) +
        "-" +
        lastDate +
        " " +
        hours +
        ":" +
        minutes;
      this.history.data.start_time = lastDay;
      this.history.data.end_time = today;
      this.historyData = this.connection.send(JSON.stringify(this.history));
    },
  },
  created() {
    this.connection = new WebSocket(
      "wss://gps.uzal.uz:8443/ws/tracking/?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjYwNjY2MjQ0LCJpYXQiOjE2NjAwNjE0NDQsImp0aSI6ImRlNTRmODI5YThkMzRkOWRiYzZkMDUxMDI0ZWUxZGRjIiwidXNlcl9pZCI6MTk4MSwicm9sZSI6Mn0.mJODVAC1pjx_QfSHKslE7p8oLaNPQmSBZsyuJ15lguc"
    );
    this.connection.onmessage = function (event) {
      const object = JSON.parse(event.data)
      const actions = JSON.parse(event.data).action;
      if (actions == "ws.admin.objects") {
        // For knowing that we are getting the data in every 5 seconds
        console.log('new one');

        document.getElementById("hi").innerHTML =
          object.data["4358"].name +
          "<br />" +
          object.data["4358"].live_data.latitude +
          "<br />" +
          object.data["4358"].live_data.longitude;
        let coords = [];
        coords.push(object.data["4358"].live_data.latitude);
        coords.push(object.data["4358"].live_data.longitude);
        store.commit("SET_LAT", coords);

      } else if(actions == 'ws.waited_object_history') {

        let coords = []

        for (let index = 0; index < object.data.length; index++) {
          let coord = []
          coord.push(object.data[index].latitude)
          coord.push(object.data[index].longitude)
          coords.push(coord)
        }

        store.commit("SET_HISTORY", coords);
      }

      return JSON.parse(event.data);
    };
  },

  mounted() {
    setTimeout(() => {
      this.sendMessage(this.data);
      this.getHistory()
    }, 100);
    setInterval(() => {
      this.sendMessage(this.data);
    }, 5000)
  },
  components: { YandexMap },
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  height: 100vh;
  .hi {
    width: 30%;
    border: 1px solid;
  }
  .map {
    width: 70%;
    border: 1px solid;
  }
}
</style>