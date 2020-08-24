<template>
  <div>
    <v-app-bar color="primary darken-1" app>
      <v-app-bar-nav-icon
        @click="ham()"
        class="d-none d-flex d-sm-flex d-md-flex d-lg-none white--text"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="white--text strong text-center">
        {{ title }}
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <div v-if="title == 'Dashboard' || title == 'ໜ້າຫຼັກ'">
        <v-switch
          v-model="valve"
          class="mt-6"
          :label="text"
          color="teal accent-3"
          @change="update"
        >
          <template v-slot:label>
            <strong class="white--text"> {{ text }} </strong>
          </template>
        </v-switch>
      </div>
      <div v-if="title == 'Melon' || title == 'ວິເຄາະເມລອນ'">
        <v-btn
          class="ma-2 white--text"
          outlined
          color="white"
          to="/melon/detail"
          >{{ $t("melon.detail") }}</v-btn
        >
      </div>
    </v-app-bar>
    <!-- navigation-drawer -->
    <v-navigation-drawer
      v-model="fix"
      app
      class="primary"
      :mini-variant="showNav"
    >
      <v-layout column fill-height>
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title
                class="title white--text "
                @click="showNav = !showNav"
              >
                Smart Farm
              </v-list-item-title>
              <v-list-item-subtitle class="white--text">
                {{ this.$store.state.user }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>
          <switcher />
          <v-list-item
            class="flex-col"
            v-for="list in lists"
            :key="list.text"
            color="lime accent-2"
            @click="title = list.text"
            :to="list.route"
          >
            <v-list-item-icon>
              <v-icon class="white--text" v-text="list.icon"></v-icon>
            </v-list-item-icon>

            <v-list-item-title class="white--text" v-text="list.text">
            </v-list-item-title>
          </v-list-item>
        </v-list>
        <v-spacer></v-spacer>
        <v-list class="py-0">
          <v-list-item @click="signOut()">
            <v-list-item-icon>
              <v-icon class="white--text">open_in_new</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="white--text">
                {{ this.$t("drawer.logout") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-layout>
    </v-navigation-drawer>
    <!-- <navBar @clicked="onTitle" :showNav="showNav" mt-10></navBar> -->
  </div>
</template>

<script>
// import navBar from "./navbar";
import switcher from "./LocaleSwitcher";
import db from "../components/firebase-connect/firebaseInit";
import "firebase/auth";
export default {
  components: {
    // navBar,
    switcher,
  },
  computed: {
    text() {
      if (this.valve) {
        return this.$t("valve.offValve");
      } else {
        return this.$t("valve.onValve");
      }
    },
    lists() {
      return [
        { icon: "dashboard", text: this.$t("drawer.dashboard"), route: "/" },
        { icon: "perm_media", text: this.$t("drawer.melon"), route: "/melon" },
        {
          icon: "assessment",
          text: this.$t("drawer.visualization"),
          route: "/visualization",
        },
        {
          icon: "contact_support",
          text: this.$t("drawer.about"),
          route: "/about",
        },
      ];
    },
  },
  data() {
    return {
      miniVariant: false,
      fix: true,
      Expand: "Expand",
      valve: null,
      title: "Dashboard",
      showNav: false,
    };
  },
  methods: {
    localised(key) {
      return this.messages[this.activeLocale][key];
    },
    signOut() {
      db.auth()
        .signOut()
        .then((value) => {
          console.log(value);
          this.$router.push("/login");
        });
    },
    onTitle(value) {
      this.title = value;
    },
    ham() {
      this.fix = !this.fix;
      this.showNav = false;
      this.miniVariant = true;
    },
    fetchData() {
      db.database()
        .ref("/pump")
        .on("value", (snap) => {
          console.log(snap.val().valve);
          if (!snap.val().valve) {
            this.text = this.$t("valve.offValve");
            this.valve = snap.val().valve;
          } else {
            this.text = this.$t("valve.onValve");
            this.valve = snap.val().valve;
          }
        });
    },
    update() {
      db.database()
        .ref("/pump")
        .update({ valve: this.valve });
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style></style>
