<template>
  <v-app class="main myFont">
    <div v-if="$store.state.user != 'Guest User'">
      <myAppBar :user="$store.state.user"></myAppBar>
    </div>

    <v-main class="ma-5">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </v-main>
  </v-app>
</template>

<script>
import myAppBar from "./components/appBarV2";

export default {
  name: "App",
  components: {
    myAppBar,

  },
  mounted() {
    this.url = this.$route.name;
    this.$router.push("/");
  },
  updated() {
    this.url = this.$route.name;
    console.log(this.url);
  },
  data: () => ({
    url: "",
  }),
};
</script>
<style>
.myFont {
  font-family: 'Mansalva','Noto Sans Lao','Saysettha OT'; 
}
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
