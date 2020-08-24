<template>
  <div class="hero-image">
    <v-skeleton-loader class="mx-auto my-15" max-width="80%" type="card">
      <v-card class="mx-auto my-15" max-width="80%" elevation="20" dark>
        <v-row>
          <!-- poster -->
          <v-col cols="12" md class="d-none d-lg-flex pa-5">
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
                v-model="valid"
                @submit="signUp()"
                @keyup.enter="signUp()"
                class="pa-5"
                lazy-validation
              >
                <v-text-field
                  v-model="email"
                  class="mb-5"
                  type="email"
                  label="E-mail"
                  :rules="emailRules"
                  required
                ></v-text-field>

                <v-text-field
                  type="password"
                  v-model="password"
                  label="password"
                  :rules="passwordRules"
                  @keyup.enter="signUp()"
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
                  <v-btn color="gray" class="mr-4" @click="back()" text>
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
                  @keyup.enter="signUp()"
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
     <v-overlay :value="loading">
      <v-card class="pa-5">
        <h5>Please wait a minute</h5>
        <v-text-field color="" :loading="loading" disabled></v-text-field>
      </v-card>
    </v-overlay>
  </div>
</template>

<script>
import firebase from "../components/firebase-connect/firebaseInit";
import "firebase/auth";

export default {
  data() {
    return {
      email: "",
      emailRules:[
        v=>!!v||'E-mail is required',
        v=> /.+@+/.test(v) || 'E-mail is required',
      ],
      password: "",
      passwordRules:[
        v=>v.length>=6||'password must be at least 6 character'
      ],
      checkbox: false,
      loading: false,
      success: false,
      valid:true
    };
  },

  methods: {
    back() {
      this.$router.push("login");
    },
    async signUp() {
      if (this.password.length < 6) {
        setTimeout(() => {
            alert("password must be at least 6 character");
          }, 100);
          return;
      }
      if (!this.email || !this.password) {
         setTimeout(() => {
            alert("email or password must not empty");
          }, 100);
          return;
      }
      this.loading = true
      
      await firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.loading = false
          this.$router.push("/");
        }).catch((err) => {
          this.loading =false;
          setTimeout(() => {
            alert(err)
          }, 100);
          
        });
    },
  },
};
</script>

<style></style>
