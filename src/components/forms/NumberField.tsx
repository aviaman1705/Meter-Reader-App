import { Field, ErrorMessage } from "formik";

import classes from "./../../Form.module.css";

export default function NumberField(props: textFieldProps) {
  return (
    <div className={classes["form-group"]}>
      <label className={classes["form-label"]} htmlFor={props.field}>
        {props.displayName}
      </label>
      <Field
        id={props.field}
        name={props.field}
        type="number"
        className="form-control"
        placeholder={props.displayName}
      />
      <div>
        <ErrorMessage name={props.field}>
          {(msg: string) => (
            <span id={`input-${props.field}-error`} className="text-danger">
              {msg}
            </span>
          )}
        </ErrorMessage>
      </div>
    </div>
  );
}

interface textFieldProps {
  field: string;
  displayName: string;
}
