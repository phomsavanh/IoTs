<template>
  <div>
    <vue-justgage :ref="name" :id="name" class="gauge" max-width="344" ></vue-justgage>
  </div>
</template>

<script>
export default {
  props: ["name", "value"],
  data() {
    return {
      dflt: {
        min: 0,
        max: 200,
        donut: true,
        gaugeWidthScale: 0.5,
        counter: true,
        pointer: true,
        hideInnerShadow: true,
        relativeGaugeSize: true,
        levelColors: ["#a9d70b", "#f9c802", "#ff0000"],
      },
    };
  },

  mounted() {
    this.$refs[`${this.name}`].draw({
      id: this.name,
      value: this.value,
      defaults: this.dflt,
      label: "temp",
    });

  },
};
</script>
<style>
.gauge {
  background-color: rgb(112, 134, 134);

}
</style>
