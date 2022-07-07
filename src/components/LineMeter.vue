<template>
  <LineChart
    :height="height"
    :option="chartOptions" />
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "LineMeter",
  props: {
    height: {
      type: Number,
      default: 500
    },
    timeline: {
      type: Array,
      required: true,
      default: () => []
    },
    dataSeries: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  setup(props) {
    const chartOptions = ref({
      animation: true,
      tooltip: {},
      xAxis: {
        boundaryGap: false,
        data: props.timeline,
        min: null
      },
      yAxis: {},
      dataZoom: [
        {
          type: "slider",
          filterMode: "filter",
          xAxisIndex: [0]
        }
      ],
      series: props.dataSeries
    });
    return {
      chartOptions
    };
  }
});
</script>

<style scoped>

</style>
