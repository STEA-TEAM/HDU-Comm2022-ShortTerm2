<template>
  <router-view />
</template>

<script>
import { defineComponent } from "vue";
import { Notify, useQuasar } from "quasar";

import { useSettingsStore } from "stores/settings";

export default defineComponent({
  name: "App",
  setup() {
    const $q = useQuasar();
    const settingsStore = useSettingsStore();
    if ($q.localStorage.has("shortTerm2.settings.darkMode")) {
      $q.dark.set($q.localStorage.getItem("shortTerm2.settings.darkMode"));
    } else {
      $q.dark.set("auto");
    }
    return { settingsStore };
  },
  created() {
    if (this.$q.localStorage.has("shortTerm2.settings.language")) {
      this.$i18n.locale = this.$q.localStorage.getItem(
        "shortTerm2.settings.language"
      );
    } else {
      this.$i18n.locale = this.$q.lang.getLocale();
    }
    this.parseSettings();
  },
  methods: {
    i18n(relativePath) {
      return this.$t("app." + relativePath);
    },
    parseSettings() {
      const notification = this.$q.notify({
        type: "ongoing",
        message: this.i18n("notifications.retrievingSettings")
      });
      this.$api.getSettings().then(response => {
        console.log(response.data);
        this.settingsStore.loadSettings(response.data);
        notification({
          type: "positive",
          message: this.i18n("notifications.retrieveSettingsSuccess"),
          timeout: 1000
        });
      }).catch(error => {
        console.error(error);
        notification({
          type: "negative",
          message: this.i18n("notifications.retrieveSettingsError"),
          timeout: 2000
        });
      });
    }
  }
});
</script>
