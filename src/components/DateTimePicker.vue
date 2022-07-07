<template>
  <q-input
    dense
    :label="label"
    outlined
    v-model="dateModel">
    <template v-slot:prepend>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-date v-model="dateModel" mask="yyyy-MM-dd HH:mm">
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>

    <template v-slot:append>
      <q-icon name="access_time" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-time v-model="dateModel" mask="yyyy-MM-dd HH:mm" format24h>
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-time>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script>
import { format } from "date-fns";
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  name: "DateTimePicker",
  props: {
    label: {
      type: String,
      default: "DateTimePicker"
    },
    modelValue: {
      type: String,
      required: true,
      default: () => format(new Date(), "yyyy-MM-dd HH:mm")
    }
  },
  setup(props, { emit }) {
    const dateModel = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value)
    });
    return {
      dateModel
    };
  }
});
</script>

<style scoped>

</style>
