import { boot } from "quasar/wrappers";
import { use } from "echarts/core";
import {
  DataZoomComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent
} from "echarts/components";
import VeCharts from "ve-charts";

use([
  DataZoomComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent
]);

export default boot(({ app }) => {
  app.use(VeCharts);
});
