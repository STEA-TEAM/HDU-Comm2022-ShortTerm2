<template>
  <q-page class="flex flex-center row q-pa-lg">
    <div class="col-12 col-sm-11 col-md-10 self-start column q-gutter-y-sm">
      <div class="row">
        <div class="col-3">
          <q-img src="images/logo.png" fit="contain" alt="logo" />
        </div>
        <q-space />
        <div class="column self-baseline q-ml-md q-gutter-y-md">
          <div class="text-h3 text-weight-regular">
            {{ i18n("labels.title") }} {{ i18n("labels.team") }}
          </div>
          <div class="text-h5 text-right text-grey">
            {{ i18n("labels.intro") }}
          </div>
        </div>
      </div>
      <div class="row full-width justify-between ">
        <q-card class="col-grow">
          <q-card-section horizontal>
            <q-card-section class="col-grow">
              <LineMeter
                :height="600"
                :timeline="timelineData"
                :data-series="dataSeries" />
            </q-card-section>
            <q-separator vertical />
            <q-card-section class="col-3">
              <GaugeMeter
                :height="300"
                :name="i18n('labels.temperature')"
                :color="getPaletteColor('green')"
                :min="-20"
                :max="60"
                :split-number="8"
                :value="lasTemperature"
                value-unit="°C"
                :alert="temperature.alert"
                :alert-threshold="temperature.threshold"
                :alert-color="getPaletteColor('red')" />
              <GaugeMeter
                :height="300"
                :name="i18n('labels.humidity')"
                :color="getPaletteColor('light-blue')"
                :min="0"
                :max="100"
                :split-number="10"
                :value="lasHumidity"
                value-unit="%"
                :alert="humidity.alert"
                :alert-threshold="humidity.threshold"
                :alert-color="getPaletteColor('red')" />
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
      <q-card>
        <q-card-section>
          <div class="row justify-between q-gutter-x-md">
            <DateTimePicker
              :label="i18n('labels.startTime')"
              now-btn
              v-model="startDate" />
            <DateTimePicker
              :label="i18n('labels.endTime')"
              now-btn
              v-model="endDate" />
            <q-btn
              color="primary"
              icon="mdi-history"
              :label="i18n('labels.getHistory')"
              @click="parseHistory" />
            <q-btn
              color="accent"
              icon="mdi-thermometer-plus"
              :label="i18n('labels.getRealtimeData')"
              @click="parseValues" />
            <q-space />
            <q-btn
              color="negative"
              icon="mdi-delete-empty"
              :label="i18n('labels.clearData')"
              @click="clearData" />
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section horizontal>
          <q-card-section class="row justify-start q-gutter-x-md">
            <q-input
              dense
              input-class="text-right"
              :label="i18n('labels.temperatureThreshold')"
              outlined
              suffix="°C"
              type="number"
              v-model="temperature.threshold">
              <template v-slot:prepend>
                <q-icon name="mdi-thermometer" />
              </template>
            </q-input>
            <q-toggle
              dense
              :label="i18n('labels.temperatureAlert')"
              left-label
              v-model="temperature.alert" />
          </q-card-section>
          <q-separator vertical />
          <q-card-section class="row justify-start q-gutter-x-md">
            <q-input
              dense
              input-class="text-right"
              :label="i18n('labels.humidityThreshold')"
              outlined
              suffix="%"
              type="number"
              v-model="humidity.threshold">
              <template v-slot:prepend>
                <q-icon name="mdi-water-percent" />
              </template>
            </q-input>
            <q-toggle
              dense
              :label="i18n('labels.humidityAlert')"
              left-label
              v-model="humidity.alert" />
          </q-card-section>
          <q-space />
          <q-card-section>
            <q-btn
              color="positive"
              icon="mdi-cog-transfer"
              :label="i18n('labels.setSettings')"
              @click="setSettings" />
          </q-card-section>
        </q-card-section>
        <q-separator />
        <q-card-section horizontal>
          <q-card-section class="row justify-start q-gutter-x-md">
            <q-input
              dense
              input-class="text-right"
              :label="i18n('labels.emailInterval')"
              outlined
              :suffix="i18n('labels.minutes')"
              type="number"
              v-model="email.interval">
              <template v-slot:prepend>
                <q-icon name="mdi-email-sync" />
              </template>
            </q-input>
            <q-toggle
              dense
              :label="i18n('labels.emailNotify')"
              left-label
              v-model="email.notify" />
            <q-btn
              color="info"
              icon="mdi-bell"
              :label="i18n('labels.testEmail')"
              @click="testEmail" />
          </q-card-section>
          <q-separator vertical />
          <q-card-section class="row justify-start q-gutter-x-md">
            <q-input
              dense
              input-class="text-right"
              :label="i18n('labels.wechatInterval')"
              outlined
              :suffix="i18n('labels.minutes')"
              type="number"
              v-model="wechat.interval">
              <template v-slot:prepend>
                <q-icon name="mdi-wechat" />
              </template>
            </q-input>
            <q-toggle
              dense
              :label="i18n('labels.wechatNotify')"
              left-label
              v-model="wechat.notify" />
            <q-btn
              color="info"
              icon="mdi-bell"
              :label="i18n('labels.testWechat')"
              @click="testWechat" />
          </q-card-section>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { storeToRefs } from "pinia";
import { computed, defineComponent, ref } from "vue";
import { colors } from "quasar";

import { useSettingsStore } from "stores/settings";
import GaugeMeter from "components/GaugeMeter";
import LineMeter from "components/LineMeter";
import { format } from "date-fns";
import DateTimePicker from "components/DateTimePicker";

export default defineComponent({
  name: "DashboardPage",
  components: { DateTimePicker, LineMeter, GaugeMeter },
  setup() {
    const { getPaletteColor } = colors;
    const settingStore = useSettingsStore();
    const { temperature, humidity, email, wechat } = storeToRefs(settingStore);

    const timelineData = ref([]);
    const humidityData = ref([]);
    const temperatureData = ref([]);

    const dataSeries = ref([{
      type: "line",
      name: "Humidity",
      data: humidityData.value
    }, {
      type: "line",
      name: "Temperature",
      data: temperatureData.value
    }]);
    const lasHumidity = computed(() => {
      return humidityData.value[humidityData.value.length - 1];
    });
    const lasTemperature = computed(() => {
      return temperatureData.value[temperatureData.value.length - 1];
    });

    const startDate = ref(format(new Date(), "yyyy-MM-dd HH:mm"));
    const endDate = ref(format(new Date(), "yyyy-MM-dd HH:mm"));

    return {
      getPaletteColor,
      settingStore,
      temperature,
      humidity,
      email,
      wechat,
      timelineData,
      humidityData,
      temperatureData,
      dataSeries,
      lasHumidity,
      lasTemperature,
      startDate,
      endDate
    };
  },
  data: () => ({
    readInterval: null
  }),
  created() {
    this.getHistory(0, 0);
    setInterval(this.parseValues, 10000);
  },
  methods: {
    i18n(relativePath) {
      return this.$t("pages.dashboard." + relativePath);
    },
    clearData() {
      this.timelineData = [];
      this.humidityData = [];
      this.temperatureData = [];
    },
    parseHistory() {
      const formatter = (dateString) => {
        const [date, time] = dateString.split(" ");
        const [year, month, day] = date.split("-");
        const [hour, minute] = time.split(":");
        return new Date(year, month - 1, day, hour, minute);
      };
      this.getHistory(
        formatter(this.startDate).getTime() / 1000.0,
        formatter(this.endDate).getTime() / 1000.0
      );
    },
    getHistory(startDate, endDate) {
      const notification = this.$q.notify({
        type: "ongoing",
        message: this.i18n("notifications.retrievingHistory")
      });
      this.$api.getHistory(startDate, endDate).then(({ data }) => {
        data.forEach(values => {
          this.temperatureData.push(values[0]);
          this.humidityData.push(values[1]);
          this.timelineData.push(values[2]);
        });
        notification({
          type: "positive",
          message: this.i18n("notifications.retrieveHistorySuccess"),
          timeout: 1000
        });
      }).catch(error => {
        console.error(error);
        notification({
          type: "negative",
          message: this.i18n("notifications.retrieveHistoryError"),
          timeout: 2000
        });
      });
    },
    parseValues() {
      // this.timelineData.push(format(new Date(), "yyyy-MM-dd HH:mm"));
      // this.humidityData.push((Math.random() * 40 + 30).toFixed(1));
      // this.temperatureData.push((Math.random() * 10 + 20).toFixed(1));
      this.$api.getData().then(({ data }) => {
        console.log(data);
        this.temperatureData.push(data[0]);
        this.humidityData.push(data[1]);
        this.timelineData.push(data[2]);
      });
    },
    setSettings() {
      const notification = this.$q.notify({
        type: "ongoing",
        message: this.i18n("notifications.updatingSettings")
      });
      this.$api.setSettings(this.settingStore.setSettings()).then(() => {
        notification({
          type: "positive",
          message: this.i18n("notifications.updateSettingsSuccess"),
          timeout: 1000
        });
      }).catch(error => {
        console.error(error);
        notification({
          type: "negative",
          message: this.i18n("notifications.updateSettingsError"),
          timeout: 2000
        });
      });
    },
    testEmail() {
      const notification = this.$q.notify({
        type: "ongoing",
        message: this.i18n("notifications.testingEmail")
      });
      this.$api.sendMail().then(() => {
        notification({
          type: "positive",
          message: this.i18n("notifications.testingEmailSuccess"),
          timeout: 1000
        });
      }).catch(error => {
        console.error(error);
        notification({
          type: "negative",
          message: this.i18n("notifications.testingEmailError"),
          timeout: 2000
        });
      });
    },
    testWechat() {
      const notification = this.$q.notify({
        type: "ongoing",
        message: this.i18n("notifications.testingWechat")
      });
      this.$api.sendWechat().then(() => {
        notification({
          type: "positive",
          message: this.i18n("notifications.testingWechatSuccess"),
          timeout: 1000
        });
      }).catch(error => {
        console.error(error);
        notification({
          type: "negative",
          message: this.i18n("notifications.testingWechatError"),
          timeout: 2000
        });
      });
    }
  },
  beforeUnmount() {
    clearInterval(this.readInterval);
  }
});
</script>
