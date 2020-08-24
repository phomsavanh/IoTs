<template>
  <div>
    <v-btn fab dark small color="primary mb-5" to="/visualization">
      <v-icon dark>mdi-arrow-left-thick</v-icon>
    </v-btn>
    <v-card dark>
      <v-card-title>
        {{ this.$route.params.id }}
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
        :headers="
          this.$route.params.id == 'moistures' ? header_moisture : headers
        "
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
    this.all();
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
    all() {
      this.loading = true;
      db.firestore()
        .collection(this.$route.params.id)
        .onSnapshot((snap) => {
          this.test = [];
          snap.docs.forEach((doc) => {
            var document = doc.data();
            if (this.$route.params.id == "moistures") {
              this.test.push({
                one:
                  document[0] != undefined?document[0].one:document.one,
                date:
                document[0] != undefined
                    ? document[0].date == undefined
                      ? 1
                      : document[0].date.seconds * 1000
                    : document.date == undefined
                    ? 1
                    : document.date.seconds * 1000
              });
            } else {
              this.test.push({
                in: document[0] != undefined?document[0].in:document.in,
                out: document[0] != undefined?document[0].out:document.out,
                date:
                  this.formatDate(
                  document[0] != undefined
                    ? document[0].date == undefined
                      ? 1
                      : document[0].date.seconds * 1000
                    : document.date == undefined
                    ? 1
                    : document.date.seconds * 1000
                ),
              });
            }
          });
          this.loading = false;
        });
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
        { text: "Inside House", value: "in" },
        { text: "Outside House", value: "out" },
      ],
      header_moisture: [
        {
          text: "Date",
          align: "start",
          sortable: true,
          value: "date",
        },
        { text: "Moisture one", value: "one" },
      ],
    };
  },
};
</script>

<style></style>
