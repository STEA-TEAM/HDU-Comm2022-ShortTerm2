<template>
  <q-header elevated>
    <q-toolbar>
      <q-avatar>
        <q-img src="images/icon.png" alt="icon" />
      </q-avatar>
      <q-toolbar-title>
        {{ i18n("labels.title") }}
      </q-toolbar-title>
      <q-space />
      <q-btn class="q-mx-sm" dense flat icon="language">
        <LanguagesMenu />
      </q-btn>
      <q-btn class="q-mx-sm" dense flat icon="settings">
        <SettingsMenu />
      </q-btn>
    </q-toolbar>
  </q-header>
</template>

<script>
import { defineComponent } from "vue";
import SettingsMenu from "components/SettingsMenu";
import LanguagesMenu from "components/LanguagesMenu";

export default defineComponent({
  name: "MainHeader",
  components: { LanguagesMenu, SettingsMenu },
  methods: {
    i18n(relativePath) {
      return this.$t("layouts.headers.main." + relativePath);
    }
  }
});
</script>
