import { monthlyDataDTO } from "../../components/home/dashboard.models";
import BarChartItem from "./BarChartItem/BarChartItem";

import classes from "./Chart.module.css";

export default function Chart(props: ChartProps) {
  return (
    <div className={classes["panel-container"]}>
      <h1 id={classes["panel-page-title"]}>גרף קריאות</h1>
      <BarChartItem data={props.data} name="טסט" />
    </div>
  );
}

interface ChartProps {
  data: monthlyDataDTO[];
}
