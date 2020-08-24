<template>
  <div class="container align-center">
    <div
      v-if="
        this.humid.length == 0 ||
          this.lights.length == 0 ||
          this.moistures.length == 0 ||
          this.temperature.length == 0
      "
    >
      <v-row class="fill-height ma-0" align="center" justify="center">
        <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </v-row>
    </div>
    <div v-else>
      <chart
        type="line"
        :times="this.t_humid"
        :sensors="this.humid"
        btnColor="primary"
        :btnName="$t('button.btnHumidities')"
        btnRoute="/visualization/humidities"
      />

      <chart
        type="line"
        :times="this.t_lights"
        :sensors="this.lights"
        btnColor="success"
        :btnName="$t('button.btnLights')"
        btnRoute="/visualization/lights"
      />

      <chart
        type="line"
        :times="this.t_temp"
        :sensors="this.temperature"
        btnColor="error"
        :btnName="$t('button.btnTemperature')"
        btnRoute="/visualization/temperatures"
      />
      <chart
        type="line"
        :times="this.t_moisture"
        :sensors="this.moistures"
        btnColor="#009688"
        :btnName="$t('button.btnMoisture')"
        btnRoute="/visualization/moistures"
      />
    </div>
  </div>
</template>

<script>
import chart from "../components/chart";
import firebase from "../components/firebase-connect/firebaseInit";
export default {
  components: {
    chart,
  },
  mounted() {
    this.fetchAll(this.humid, this.t_humid, "humidities");
    this.fetchAll(this.temperature, this.t_temp, "temperatures");
    this.fetchAll(this.lights, this.t_lights, "lights");
    this.fetchAll(this.moistures, this.t_moisture, "moistures");
  },
  methods: {

    formatDate(timestamp) {
      var todate = new Date(timestamp).getDate();
      var tomonth = new Date(timestamp).getMonth() + 1;
      var toyear = new Date(timestamp).getFullYear();
      var hour = new Date(timestamp).getHours();
      var min = new Date(timestamp).getMinutes();
      var time =
        todate + "/" + tomonth + "/" + toyear + "-" + hour + "h:" + min + "m";
      return time;
    },

    fetchAll(sensors, times, collection) {
      firebase
        .firestore()
        .collection(collection)
        .limit(20)
        .onSnapshot((value) => {
          if (sensors.length > 0) {
            times = [];
            sensors = [];
          }
          if (collection == "moistures") {
            var one = [];
          } else {
            var inG = [];
            var out = [];
          }

          value.forEach((doc) => {
            var document = doc.data();
            if (collection == "moistures") {
              times.push(
                this.formatDate(
                  document[0] != undefined
                    ? document[0].date == undefined
                      ? 1
                      : document[0].date.seconds * 1000
                    : document.date == undefined
                    ? 1
                    : document.date.seconds * 1000
                )
              );
              one.push(Math.round(document[0].one));
            } else {
              times.push(
                this.formatDate(
                  document[0] != undefined
                    ? document[0].date == undefined
                      ? 1
                      : document[0].date.seconds * 1000
                    : document.date == undefined
                    ? 1
                    : document.date.seconds * 1000
                )
              );
              if (document[0] != undefined) {
                inG.push(Math.round(document[0].in));
                out.push(document[0].out);
              } else {
                inG.push(Math.round(document.in));
                out.push(document.out);
              }
            }
            times.sort();
          });
          if (collection == "moistures") {
            sensors.push({
              data: one,
              name: "one",
            });
          } else {
            sensors.push(
              {
                data: inG,
                name: "in",
              },
              {
                data: out,
                name: "out",
              }
            );
          }
        });
    },
  },

  data() {
    return {
      t_humid: [],
      t_lights: [],
      t_temp: [],
      t_moisture: [],
      humid: [],
      lights: [],
      moistures: [],
      temperature: [],
    };
  },
};
</script>

<style></style>
