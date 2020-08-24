import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import i18n from "./i18n";
import firebase from "./components/firebase-connect/firebaseInit";
import "firebase/auth";
import vueJustgage from "vue-justgage";
import VueCookies from "vue-cookies";

Vue.use(vueJustgage);
Vue.use(VueCookies);



Vue.$cookies.config('30d')
Vue.config.productionTip = false;

let app = "";
//prevent back to login page
firebase.auth().onAuthStateChanged((user) => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      i18n,
      render: (h) => h(App),
    }).$mount("#app");
    // Hot updates
if (module.hot) {
  module.hot.accept(['./locales/en.json', './locales/la.json'], function () {
    i18n.setLocaleMessage('en', require('./locales/en.json').default)
    i18n.setLocaleMessage('la', require('./locales/la.json').default)
    // Or the following hot updates via $i18n property
    // app.$i18n.setLocaleMessage('en', require('./en').default)
    // app.$i18n.setLocaleMessage('ja', require('./ja').default)
  })
}
  }
  if (user) {
    store.state.user = firebase.auth().currentUser.email;
  } else {
    store.state.user = "Guest User";
  }
});
