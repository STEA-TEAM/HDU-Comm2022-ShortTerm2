<template>
  <q-layout view="hHh lpR fFf">
    <router-view name="header" />
    <q-page-container>
      <router-view />
    </q-page-container>
    <router-view name="footer" />
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "MainLayout",
  setup() {

  },
  methods: {
    i18n(relativePath) {
      return this.$t("layouts.main." + relativePath);
    }
  }
});
</script>
