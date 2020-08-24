<template>
  <div class="about">
    <v-row justify="center">
      <v-col cols="12" class="d-flex child-flex">
        <v-card dark>
          <v-card-title>{{ $t("members.advisor") }}</v-card-title>
          <v-card-text class="d-flex">
            <v-img src="../assets/adviser.jpg" max-height="850" aspect-ratio="1.8" />
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        v-for="(item, index) in members.length"
        :key="index"
        cols="12"
        md="4"
      >
        <v-card dark>
          <v-card-title primary-title ma-2 v-if="index == 0">
            {{ $t("members.seau.name") }}
          </v-card-title>
          <v-card-title primary-title ma-2 v-if="index == 1">
            {{ $t("members.tee.name") }}
          </v-card-title>
          <v-card-title primary-title ma-2 v-if="index == 2">
            {{ $t("members.suay.name") }}
          </v-card-title>
          <v-card-subtitle>
            {{ members[index]["role"] }}
          </v-card-subtitle>
          <v-card-text>
            <v-img max-height="800"  :src="members[index]['image']">
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-card-text>
          <v-card-text>
            {{ members[index]["description"] }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  mounted() {
    if (this.$i18n.locale === this.current) {
      console.log(this.$i18n.locale);
    }
  },
  data() {
    return {
      members: [
        {
          name: this.$t("members.seau.name"),
          role: "Object Detection & WebApp",
          image:
            "https://firebasestorage.googleapis.com/v0/b/melonhub-3d561.appspot.com/o/profiles%2Fseau.jpg?alt=media&token=52889db1-48df-4e95-8fab-3a384794fc0b",
          description:
            " ",
        },
        {
          name: "Tee Hunter",
          role: "IoTs system & localhub",
          image:
            "https://firebasestorage.googleapis.com/v0/b/melonhub-3d561.appspot.com/o/profiles%2Ftee.jpg?alt=media&token=31909a26-b4f9-42ff-9abd-aaaa7f07b78b",
          description:
            "",
        },
        {
          name: "SouaylaAiet Phitsaphone",
          role: "Document & graphic",
          image:
            "https://firebasestorage.googleapis.com/v0/b/melonhub-3d561.appspot.com/o/profiles%2Fsouay.jpg?alt=media&token=ed54a8d8-cfef-4986-93f4-824885e248b8",
          description:
            "",
        },
      ],
    };
  },
};
</script>

<style></style>
