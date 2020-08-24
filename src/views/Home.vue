<template>
  <v-row>
    <v-expansion-panels v-model="expand" multiple hover popout>
      <v-expansion-panel>
        <v-expansion-panel-header
          ><h3>
            {{ $t("main.quantity") }}
            {{ this.meterQuantity }}
          </h3>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <div class="text-center">
            <v-progress-circular
              :key="meterRate"
              :rotate="360"
              :size="350"
              :width="15"
              :value="meterRate"
              color="teal"
              :indeterminate="meterRate == 0 ? flow : !flow"
            >
              {{ this.meterRate }} {{ $t("main.unit") }}
            </v-progress-circular>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header
          ><h3>
            {{ $t("main.showStandard") }}
            {{ this.showMoistureValue }}
          </h3>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <div class="text-center">
            <v-text-field
              hint="must be number and if you want to update set the value then press enter"
              v-model.number="standard"
              :value="standard"
              type="number"
              :label="$t('moisture.labelStandard')"
              @keypress.enter="setStandard"
            ></v-text-field>
            <v-btn
              class="mr-5"
              color="error"
              @click="reset"
              :loading="loading"
              >{{ $t("button.btnReset") }}</v-btn
            >
            <v-btn color="success" @click="setStandard">{{
              $t("button.btnSet")
            }}</v-btn>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header
          ><h3>{{ $t("main.all") }}</h3></v-expansion-panel-header
        >
        <v-expansion-panel-content>
          <div class="text-center">
            <v-chip class="ma-2" color="primary">
              {{ $t("allSensor.humidity") }} {{ $t("allSensor.in") }}:
              {{ this.inHumidities }}
            </v-chip>

            <v-chip class="ma-2" color="primary">
              {{ $t("allSensor.humidity") }} {{ $t("allSensor.out") }}:
              {{ this.outHumidities }}
            </v-chip>

            <v-chip class="ma-2" color="red" text-color="white">
              {{ $t("allSensor.temperature") }} {{ $t("allSensor.in") }}:
              {{ this.inTemp }}
            </v-chip>

            <v-chip class="ma-2" color="red" text-color="white">
              {{ $t("allSensor.temperature") }} {{ $t("allSensor.out") }}:
              {{ this.outTemp }}
            </v-chip>

            <v-chip class="ma-2" color="orange" text-color="white">
              {{ $t("allSensor.light") }} {{ $t("allSensor.in") }}:
              {{ this.inLight }}
            </v-chip>
            <v-chip class="ma-2" color="orange" text-color="white">
              {{ $t("allSensor.light") }} {{ $t("allSensor.out") }}:
              {{ this.outLight }}
            </v-chip>

            <v-chip class="ma-2" color="indigo" text-color="white">
              {{ $t("moisture.moistureOne") }}: {{ this.moistureOne }}
            </v-chip>

            <v-chip class="ma-2" color="indigo" text-color="white">
              {{ $t("moisture.moistureTwo") }}: {{ this.moistureTwo }}
            </v-chip>

            <v-chip class="ma-2" color="indigo" text-color="white">
              {{ $t("moisture.moistureThree") }}: {{ this.moistureThree }}
            </v-chip>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header
          ><h3>{{ $t("main.h&t") }}</h3></v-expansion-panel-header
        >
        <v-expansion-panel-content>
          <v-slide-y-transition class="py-0" tag="v-row">
            <v-row>
              <v-col cols="6" md="3">
                <Card
                  avar="H"
                  :title="$t('allSensor.humidity')"
                  :subtitle="$t('allSensor.in')"
                >
                  <Gauge
                    name="g3"
                    max="200"
                    :key="this.inHumidities"
                    :value="this.inHumidities"
                  ></Gauge>
                </Card>
              </v-col>
              <v-col cols="6" md="3">
                <Card
                  avar="H"
                  max="200"
                  :title="$t('allSensor.humidity')"
                  :subtitle="$t('allSensor.out')"
                >
                  <Gauge
                    name="g2"
                    max="200"
                    :key="this.outHumidities"
                    :value="this.outHumidities"
                  ></Gauge
                ></Card>
              </v-col>
              <v-col cols="6" md="3">
                <Card
                  avar="T"
                  max="200"
                  :title="$t('allSensor.temperature')"
                  :subtitle="$t('allSensor.in')"
                >
                  <Gauge
                    name="g1"
                    max="200"
                    :key="this.inTemp"
                    :value="this.inTemp"
                  ></Gauge>
                </Card>
              </v-col>
              <v-col cols="6" md="3">
                <Card
                  avar="T"
                  max="200"
                  :title="$t('allSensor.temperature')"
                  :subtitle="$t('allSensor.out')"
                >
                  <Gauge
                    name="g4"
                    max="200"
                    :key="this.outTemp"
                    :value="this.outTemp"
                  ></Gauge>
                </Card>
              </v-col>
            </v-row>
          </v-slide-y-transition>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header
          ><h3>{{ $t("main.l&m") }}</h3></v-expansion-panel-header
        >
        <v-expansion-panel-content>
          <v-row>
            <v-col cols="6" md="3">
              <Card
                avar="L"
                max="200"
                :title="$t('allSensor.light')"
                :subtitle="$t('allSensor.in')"
              >
                <Gauge
                  name="g5"
                  max="200"
                  :key="this.inLight"
                  :value="this.inLight"
                ></Gauge>
              </Card>
            </v-col>
            <v-col cols="6" md="3">
              <Card
                avar="L"
                max="200"
                :title="$t('allSensor.light')"
                :subtitle="$t('allSensor.out')"
              >
                <Gauge
                  name="g6"
                  max="200"
                  :key="this.outLight"
                  :value="this.outLight"
                ></Gauge>
              </Card>
            </v-col>
            <v-col cols="6" md="3">
              <Card
                avar="M"
                max="200"
                :title="$t('moisture.title')"
                :subtitle="$t('moisture.moistureOne')"
              >
                <Gauge
                  name="g7"
                  max="200"
                  :key="this.moistureOne"
                  :value="this.moistureOne"
                ></Gauge
              ></Card>
            </v-col>
            <v-col cols="6" md="3">
              <Card
                avar="M"
                max="200"
                :title="$t('moisture.title')"
                :subtitle="$t('moisture.moistureTwo')"
              >
                <Gauge
                  name="g8"
                  max="200"
                  :key="this.moistureTwo"
                  :value="this.moistureTwo"
                ></Gauge>
              </Card>
            </v-col>
            <v-col cols="6" md="3">
              <Card
                avar="M"
                max="200"
                :title="$t('moisture.title')"
                :subtitle="$t('moisture.moistureThree')"
              >
                <Gauge
                  name="g9"
                  max="200"
                  :key="this.moistureThree"
                  :value="this.moistureThree"
                ></Gauge>
              </Card>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-expansion-panels popout> </v-expansion-panels>
  </v-row>
</template>

<script>
import db from "../components/firebase-connect/firebaseInit";
import Card from "../components/card";
import Gauge from "../components/gauge";

export default {
  components: {
    Card,
    Gauge,
  },

  created() {
    this.fetchData();
    this.fetchStandard();
    this.fetchMeter();
  },
  mounted() {
    this.standard = this.showMoistureValue;
  },
  data() {
    return {
      loading: false,
      showMoistureValue: 0,
      standard: 0,
      expand: [0,1,2,3,4],
      inHumidities: 0,
      outHumidities: 0,
      inLight: 0,
      outLight: 0,
      inTemp: 0,
      outTemp: 0,
      moistureOne: 0,
      moistureTwo: 0,
      moistureThree: 0,
      meterRate: 0,
      meterQuantity: 0,
      flow: false,
    };
  },
  methods: {
    setStandard() {
      db.database()
        .ref("/pump")
        .update({ standard: this.standard })
        .then(() => {
          this.loading = false;
        });
    },
    reset() {
      this.loading = true;
      this.standard = 80;
      this.setStandard();
    },
    fetchData() {
      db.database()
        .ref("/realtime")
        .on("value", (snap) => {
          this.inHumidities = snap.val().humidities.inHumid;
          this.outHumidities = snap.val().humidities.outHumid;
          this.inLight = snap.val().lights.inLight;
          this.outLight = snap.val().lights.outLight;
          this.inTemp = snap.val().temperatures.inTemp;
          this.outTemp = snap.val().temperatures.outTemp;
          this.moistureOne = snap.val().moistures.moistureOne;
          this.moistureTwo = snap.val().moistures.moistureTwo;
          this.moistureThree = snap.val().moistures.moistureThree;
        });
    },
    async fetchStandard() {
      await db
        .database()
        .ref("/pump")
        .child("standard")
        .on("value", (snap) => {
          this.showMoistureValue = snap.val();
        });
    },
    fetchMeter() {
      db.database()
        .ref("/meter")
        .on("value", (snap) => {
          this.meterRate = snap.val().meterRate;
          this.meterQuantity = snap.val().meterQuantity;
        });
    },
  },
};
</script>
