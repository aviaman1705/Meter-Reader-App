import { Form } from "react-bootstrap";

import classes from "./../Table.module.css";

export default function Search(props: searchProps) {
  return (
    <div className={`${classes["search-input-wrap"]}`}>
      <Form.Control
        type="text"
        placeholder="חפש..."
        aria-describedby="inputSearch"
        onKeyUp={(e: any) => {
          props.onSearch(e);
        }}
      />
    </div>
  );
}

interface searchProps {
  onSearch(event: any): void;
}
