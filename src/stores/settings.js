import { defineStore } from "pinia";

export const useSettingsStore = defineStore("settings", {
  state: () => ({
    temperature: {
      alert: false,
      threshold: 30
    },
    humidity: {
      alert: false,
      threshold: 70
    },
    email: {
      notify: false,
      interval: 10
    },
    wechat: {
      notify: false,
      interval: 10
    },
    measureInterval: 10
  }),

  actions: {
    loadSettings(data) {
      this.temperature.alert = data["temp_alarm"]["enable"];
      this.temperature.threshold = data["temp_alarm"]["threshold"];
      this.humidity.alert = data["hum_alarm"]["enable"];
      this.humidity.threshold = data["hum_alarm"]["threshold"];
      this.email.notify = data["email_subscribe"]["enable"];
      this.email.interval = data["email_subscribe"]["duration_minute"];
      this.wechat.notify = data["wechat_subscribe"]["enable"];
      this.wechat.interval = data["wechat_subscribe"]["duration_minute"];
      this.measureInterval = data["measure_duration"];
    },
    setSettings() {
      const data = {};
      data["temp_alarm"] = {
        "enable": this.temperature.alert,
        "threshold": this.temperature.threshold
      };
      data["hum_alarm"] = {
        "enable": this.humidity.alert,
        "threshold": this.humidity.threshold
      };
      data["email_subscribe"] = {
        "enable": this.email.notify,
        "duration_minute": this.email.interval
      };
      data["wechat_subscribe"] = {
        "enable": this.wechat.notify,
        "duration_minute": this.wechat.interval
      };
      data["measure_duration"] = this.measureInterval;
      return data;
    }
  }
});
