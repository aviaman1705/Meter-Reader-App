import { monthlyDataDTO } from "../../components/home/dashboard.models";
import BarChartItem from "./BarChartItem/BarChartItem";

import classes from "./Chart.module.css";

export default function Chart(props: ChartProps) {
  return (
    <>
      <div className="col-lg-6">
        <h2 className="text-center">גרף קריאות</h2>
        <BarChartItem data={props.calledsPerMonths} name="נקרא" />
      </div>
      <div className="col-lg-6">
        <h2 className="text-center">גרף אי קריאות</h2>
        <BarChartItem
          data={props.unCalledsPerMonths}
          name="לא נקרא"
          color="#343a40"
        />
      </div>
    </>
  );
}

interface ChartProps {
  calledsPerMonths: monthlyDataDTO[];
  unCalledsPerMonths: monthlyDataDTO[];
}
