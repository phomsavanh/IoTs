<template>
  <div class="hero-image">
    <v-skeleton-loader class="mx-auto my-15" max-width="80%" type="card">
      <v-card class="mx-auto my-15" max-width="80%" elevation="20" dark>
        <v-row>
          <!-- poster -->
          <v-col cols="12" md class="d-none d-lg-flex d-xl-none pa-5">
            <v-card-text>
              <v-img
                src="https://www.crossroadsinfosec.com/wp-content/uploads/2019/02/1_lVfJFrxmv5WYXnfm7Tbf3A.png?quality=100.3017122710591"
                aspect-ratio="1.4"
                contain
              ></v-img>
              <blockquote class="blockquote text-lg-center">
                Make it easier
              </blockquote>
            </v-card-text>
          </v-col>
          <!-- form -->
          <v-col class="d-none d-sm-flex">
            <!-- title -->
            <v-card-text>
              <div class="text-h5 ">
                Welcome
              </div>
              <p class="text-h">Sign Up to Project X</p>
              <!-- textfield -->
              <v-form
                ref="form"
                @keyup.enter="signIn()"
                class="pa-5"
                lazy-validation
              >
                <v-text-field
                  v-model="email"
                  class="mb-5"
                  type="email"
                  label="E-mail"
                  required
                ></v-text-field>

                <v-text-field
                  type="password"
                  v-model="password"
                  label="password"
                  width="50"
                  @keyup.enter="signIn()"
                  required
                ></v-text-field>
                <v-checkbox
                  v-model="checkbox"
                  class="text-caption mb-10"
                  label="see the password"
                  required
                ></v-checkbox>
                <!-- button -->
                <v-card-actions>
                  <v-btn color="success" class="mr-4" @click="signUp()">
                    Sign Up
                  </v-btn>
                  <v-btn color="error" class="mr-4" @click="back()" text>
                    Sign in
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card-text>
          </v-col>
          <v-col class="d-flex d-sm-none">
            <v-card-text>
              <div class="text-h5">
                Welcome
              </div>
              <p class="text-h">Sign In to Project X</p>
              <!-- textfield -->
              <v-form ref="form" class="pa-5" lazy-validation>
                <v-text-field
                  class="mb-5"
                  v-model="email"
                  type="email"
                  label="E-mail"
                  required
                ></v-text-field>

                <v-text-field
                  type="password"
                  v-model="password"
                  label="password"
                  width="50"
                  @keyup.enter="signIn()"
                  required
                ></v-text-field>
                <v-checkbox
                  v-model="checkbox"
                  class="text-caption mb-10"
                  label="see the password"
                  required
                ></v-checkbox>
                <!-- button -->
                <v-card-actions>
                  <v-btn color="success" class="mr-4" @click="signUp()">
                    Sign Up
                  </v-btn>
                  <v-btn color="error" class="mr-4" @click="back()" text>
                    Sign in
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </v-skeleton-loader>
  </div>
</template>

<script>
import firebase from "../components/firebase-connect/firebaseInit";
import "firebase/auth";

export default {
  data() {
    return {
      email: "",
      password: "",
      checkbox: false,
      loading: false,
      success: false,
    };
  },

  methods: {
    back() {
      this.$router.push("login");
    },
    async signUp() {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.push("/");
        });
    },
  },
};
</script>

<style></style>
