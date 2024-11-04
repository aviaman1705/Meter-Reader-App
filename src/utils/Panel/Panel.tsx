import { NavLink } from "react-router-dom";

import classes from "./Panel.module.css";
import { dashboardSummaryDTO } from "../../components/home/dashboard.models";
import PanelItem from "./PanelItem";

export default function Panel(props: panelProps) {
  return (
    <>
      <PanelItem
        value={props.data.called.toString()}
        text="נקרא"
        link="/tracks"
      />
      <PanelItem
        value={props.data.unCalled.toString()}
        text="לא נקרא"
        link="/tracks"
      />
      <PanelItem
        value={props.data.unCalledPercentage.toString()}
        text="אחוזי אי קריאה"
        link="/tracks"
      />
      <PanelItem
        value={props.data.highestUnCalledTrack?.desc}
        text="המסלול הגרוע"
        link={`/tracks/edit/${props.data.highestUnCalledTrack?.id}`}
      />
      <PanelItem
        value={props.data.lowestUnCalledTrack?.desc}
        text="המסלול המצויין"
        link={`/tracks/edit/${props.data.lowestUnCalledTrack?.id}`}
      />
      <PanelItem
        value={props.data.popularNotebook?.desc}
        text="המסלול הנפוץ"
        link={`/notebooks/edit/${props.data.popularNotebook?.id}`}
      />
    </>
  );
}

interface panelProps {
  data: dashboardSummaryDTO;
}
