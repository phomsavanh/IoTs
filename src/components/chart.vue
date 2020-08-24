<template>
  <div>
    <v-btn class="white--text" small :color="btnColor" :to="btnRoute">
      {{ this.btnName }}
    </v-btn>
    <vue-apex-charts
      width="100%"
      :type="type"
      :options="options"
      :series="series"
      no-data="loading..."
    />
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
  props: [
    "type",
    "times",
    "sensors",
    "title",
    "btnColor",
    "btnName",
    "btnRoute",
  ],
  components: {
    VueApexCharts,
  },
  computed: {
    options() {
      return {
        xaxis: {
          categories: this.times,
        },
        yaxis: {
          labels: {
            formatter: function(value) {
              return Math.round(value);
            },
          },
        },
        stroke: {
          curve: "smooth",
        },
        chart: {
          width: "100%",
          stacked: true,
          id: "vuechart-example",
          zoom: {
            type: "x",
            enabled: true,
            autoScaleYaxis: true,
          },
        },
        toolbar: {
          autoSelected: "zoom",
        },
        noData: {
          text: "Loading...",
        },
      };
    },
    series() {
      return this.sensors;
    },
  },
};
</script>

<style></style>
