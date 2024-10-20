import { Col } from "react-bootstrap";
import classes from "./../Table.module.css";

export default function TableFooter(props: tableFooterProps) {
  return (
    <>
      <div id={classes["total-records-text"]}>
        סה"כ {props.totalItems} רשומות
      </div>
    </>
  );
}

interface tableFooterProps {
  itemsPerPage: number;
  page: number;
  totalItems: number;
  onClick(e: any): void;
}
