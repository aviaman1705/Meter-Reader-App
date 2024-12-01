import { monthlyDataDTO } from "../../../components/home/dashboard.models";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import classes from "./BarChartItem.module.css";

export default function BarChartItem(props: BarChartItemProps) {
  return (
    <ResponsiveContainer
      className={classes["recharts-responsive-container"]}
      width="100%"
      height={400}
    >
      <BarChart
        width={100}
        height={300}
        margin={{
          // top: 5,
          right: 30,
          // left: 30,
          // bottom: 5,
        }}
        data={props.data}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis domain={[0, 12000]} />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill={props.color} name={props.name} />
      </BarChart>
    </ResponsiveContainer>
  );
}

interface BarChartItemProps {
  data: monthlyDataDTO[];
  name: string;
  color: string;
}

BarChartItem.defaultProps = {
  color: "#087f5b",
};
