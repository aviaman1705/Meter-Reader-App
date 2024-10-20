import { useField } from "formik";

import classes from "./../../Form.module.css";

export default function DateField(props: dateFieldProps) {
  const [field, meta] = useField(props);

  const trackDate = !field.value
    ? ""
    : new Date(field.value).toLocaleDateString("en-CA");

  return (
    <div className={classes["form-group"]}>
      <label className={classes["form-label"]} htmlFor={props.name}>
        {props.label}
      </label>
      <input
        id={props.name}
        onBlur={field.onBlur}
        onChange={field.onChange}
        name={props.name}
        type="date"
        className={
          meta.touched && meta.error
            ? "form-control " + classes["input-error"]
            : "form-control"
        }
        defaultValue={trackDate}
      />
      {meta.touched && meta.error && (
        <div className={classes["error"]}>{meta.error}</div>
      )}
    </div>
  );
}

interface dateFieldProps {
  label: string;
  name: string;
}
