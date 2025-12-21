import { Link } from "react-router-dom";
import { searchResultsDTO } from "./search.models";

import classes from "./SearchResults.module.css";

export default function SearchResultItem(props: searchResultItemProps) {
  return (
    <Link
      className={`${classes["btn"]} ${classes["btn-search-item"]}`}
      to={`../${props.model.link}`}
    >
      {props.model.type === "tracks" ? "מסלול " : "פנקס "}
      {props.model.name}
    </Link>
  );
}

interface searchResultItemProps {
  model: searchResultsDTO;
}
