<template>
  <div>
    <div class="d-none d-sm-flex d-md-flex d-lg-flex d-xl-none">
      <v-card class="mx-auto" width="90%" elevation="10">
        <v-card-title class="orange  white--text ">
          {{ dates[carouselIndex] }}
        </v-card-title>
        <v-carousel v-model="carouselIndex" contain height="650" :progress="true" hide-delimiters>
          <v-carousel-item
            v-for="(item, i) in urls"
            :key="i"
            :src="item.url"
            reverse-transition="fade-transition"
            transition="fade-transition"
          >
          </v-carousel-item>
        </v-carousel>
        <div>
          <v-card-subtitle class="pb-1 ">{{
            $t("melon.analyze")
          }}</v-card-subtitle>

          <v-card-text class="text--primary">
            <v-row>
              <span class="yellow darken-2 pa-2 white--text ma-2 "
                >{{ $t("melon.flowers") }}:
                {{ urls[carouselIndex].flowers }}</span
              >
              <span class="green lighten-1 pa-2 white--text  ma-2"
                >{{ $t("melon.melons") }}:
                {{ urls[carouselIndex].melons }}</span
              >
              <span class="green darken-3 pa-2 white--text ma-2"
                >{{ $t("melon.leaves") }}:
                {{ urls[carouselIndex].leaves }}</span
              >
            </v-row>
          </v-card-text>
        </div>
      </v-card>
    </div>

    <div class="d-none d-flex d-sm-none">
      <v-card class="mx-auto">
        <v-card-title class="orange  white--text ">
          {{ this.dates[carouselIndex] }} sm
        </v-card-title>
        <v-carousel v-model="carouselIndex" height="300"  :progress="true" hide-delimiters>
          <v-carousel-item
            v-for="(item, i) in urls"
            :key="i"
            loading
            :src="item.url"
            reverse-transition="fade-transition"
            transition="fade-transition"
          >
          </v-carousel-item>
        </v-carousel>
        <v-card-subtitle class="pb-1 ">{{
          $t("melon.analyze")
        }}</v-card-subtitle>

        <v-card-text class="text--primary">
          <v-col>
            <v-row>
              <span class="yellow darken-2 pa-2 white--text  ma-2"
                >{{ $t("melon.flowers") }}:
                {{ this.urls[carouselIndex].flowers }}</span
              >
              <span class="green lighten-1 pa-2 white--text ma-2"
                >{{ $t("melon.melons") }}:
                {{ this.urls[carouselIndex].melons }}</span
              >
              <span class="green darken-3 pa-2 white--text ma-2"
                >{{ $t("melon.leaves") }}:
                {{ this.urls[carouselIndex].leaves }}</span
              >
            </v-row>
          </v-col>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import "firebase/storage";
import db from "../components/firebase-connect/firebaseInit";

export default {
  data() {
    return {
      urls: [],
      carouselIndex: 0,
      dates: [],
    };
  },

  mounted() {
    if (this.urls.length > 0) {
      console.log("exist");
    } else {
      console.log("new");
      this.fetchData();
    }

    console.log("about");
    this.urls.reverse();
    this.dates.reverse();
  },
  methods: {
    fetchData() {
      db.database()
        .ref("/melon")
        .limitToLast(5)
        .orderByChild("timestamps")
        .on("value", (snap) => {
          this.urls.splice(0, this.urls.length);
          this.dates.splice(0, this.dates.length);
          snap.forEach((element) => {
            this.urls.push(element.val());
            this.dates.push(element.key);
          });
        });
    },
  },
};
</script>
<style></style>
