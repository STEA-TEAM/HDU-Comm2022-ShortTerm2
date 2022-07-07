<template>
  <GaugeChart
    :height="height"
    :option="gaugeOptions" />
</template>

<script>
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  name: "GaugeMeter",
  props: {
    height: {
      type: Number,
      default: 500
    },
    name: {
      type: String,
      default: "Gauge Meter"
    },
    color: {
      type: String,
      default: () => "#4ba6ee"
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    splitNumber: {
      type: Number,
      default: 10
    },
    value: {
      type: Number,
      required: true,
      default: 0
    },
    valueUnit: {
      type: String,
      default: "%"
    },
    alert: {
      type: Boolean,
      default: false
    },
    alertThreshold: {
      type: Number,
      default: 70
    },
    alertColor: {
      type: String,
      default: () => "#e15241"
    }
  },
  setup(props) {
    const lastValue = computed(() => props.value);
    const dynamicColor = computed(() => {
      return (props.alert && (lastValue.value > 30)) ? props.alertColor : props.color;
    });
    const gaugeOptions = ref({
      animation: true,
      tooltip: {},
      series: [
        {
          name: "Humidity",
          type: "gauge",
          data: [{ value: lastValue }],
          center: ["50%", "60%"],
          startAngle: 200,
          endAngle: -20,
          min: props.min,
          max: props.max,
          splitNumber: props.splitNumber,
          itemStyle: { color: dynamicColor },
          progress: { show: true, width: 30 },
          pointer: { show: false },
          detail: {
            valueAnimation: true,
            width: "60%",
            lineHeight: 40,
            borderRadius: 8,
            offsetCenter: [0, "-10%"],
            fontSize: 40,
            fontWeight: "bolder",
            formatter: `{value} ${props.valueUnit}`,
            color: "auto"
          },
          axisLine: { lineStyle: { width: 30 } },
          axisTick: {
            distance: -45,
            splitNumber: 5,
            lineStyle: { width: 2, color: "#9e9e9e" }
          },
          splitLine: {
            distance: -52,
            length: 14,
            lineStyle: { width: 3, color: "#9e9e9e" }
          },
          axisLabel: { distance: -25, color: "#9e9e9e", fontSize: 20 },
          anchor: { show: false },
          title: { show: false }
        }
      ]
    });
    return {
      gaugeOptions
    };
  }
});
</script>

<style scoped>

</style>
