<template>
  <div>
    <v-btn fab dark small color="primary mb-5" to="/melon">
      <v-icon dark>mdi-arrow-left-thick</v-icon>
    </v-btn>
    <v-card dark>
      <v-card-title>
        test`
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="test"
        :search="search"
        :loading="loading"
      >
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import db from "../components/firebase-connect/firebaseInit.js";
export default {
  mounted() {
    this.loading = true;
    this.fetchDetail();
  },
  methods: {
    fetchDetail() {
      db.database()
        .ref("/melon")
        .orderByChild("timestamps")
        .on("value", (snap) => {
          console.log(snap.val());
          snap.forEach((value) => {
            console.log(value.val());
            this.test.push({
              date: value.val().timestamps,
              flowers: value.val().flowers,
              leaves: value.val().leaves,
              melon: value.val().melons,
              url: value.val().url,
            });
          });
        });
        this.loading = false;
    },
  },
  data() {
    return {
      loading: false,
      search: "",
      test: [],
      headers: [
        {
          text: "Date",
          align: "start",
          sortable: true,
          value: "date",
        },
        { text: "flowers", value: "flowers" },
        { text: "leaves", value: "leaves" },
        { text: "melons", value: "melon" },
        { text: "url", value: "url" },
      ],
    };
  },
};
</script>

<style></style>
