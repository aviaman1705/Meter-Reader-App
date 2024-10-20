import { Form } from "react-bootstrap";

import classes from "./../Table.module.css";

export default function ItemsPerPage(props: buttonProps) {
  return (
    <div className={`${classes["per-page-item"]}`}>
      <label id={`${classes["table-select-label"]}`}>הצג </label>
      <Form.Select
        id={`${classes["table-select-option"]}`}
        className="form-control"
        onChange={props.onChange}
        defaultValue={props.itemsPerPage}
        aria-label="Default select example"
      >
        {props.optins.map(function (option, index) {
          return (
            <option key={index} value={option}>
              {option}
            </option>
          );
        })}
      </Form.Select>
    </div>
  );
}

interface buttonProps {
  itemsPerPage: number;
  onChange?(event: any): void;
  optins: number[];
}
