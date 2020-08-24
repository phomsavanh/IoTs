<template>
  <div class=" pa-5 ">
    <v-select
      v-model="dropdown"
      hide-details
      :items="locales"
      menu-props="auto"
      label="languages"
      @change="switcher(dropdown)"
      :value="dropdown"
      dense
      solo
    ></v-select>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$i18n.locale = this.$cookies.get("language");
    this.dropdown = this.$i18n.locale;
  },
  methods: {
    switcher(locale) {
      if (this.$i18n.locale !== locale) {
        this.$cookies.set("language", locale);
        this.$i18n.locale = locale;
      }
    },
  },

  data() {
    return {
      dropdown: "",
      currentLanguage: "",
      locales: process.env.VUE_APP_I18N_LOCALE_LIST.split(","),
    };
  },
};
</script>

<style></style>
