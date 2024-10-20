import { dashboardSummaryDTO } from "../../components/home/dashboard.models";
import PanelItem from "./PanelItem";

import classes from "./Panel.module.css";

export default function Panel(props: panelProps) {
  return (
    <>
      <h1 id={classes["panel-page-title"]}>נתוני קריאות</h1>
      <div className={classes["panel-container"]}>
        <PanelItem
          header='סה"כ מונים שנקראו'
          text={props.data.called.toString()}
        />
        <PanelItem
          header='סה"כ מונים שלא שנקראו'
          text={props.data.unCalled.toString()}
        />
        {/* <PanelItem
          header='סה"כ אחוזי אי קריאה'
          text={`${props.data.totalUncalledPercentage}%`}
        /> */}
      </div>
    </>
  );
}

interface panelProps {
  data: dashboardSummaryDTO;
}
