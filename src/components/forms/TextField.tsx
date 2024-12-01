import { useField } from "formik";

import classes from "./../../Form.module.css";

export default function TextField(props: textFieldProps) {
  const [field, meta] = useField(props);

  return (
    <div className={classes["form-group"]}>
      <label htmlFor={props.name}>{props.label}</label>
      <input
        {...field}
        id={props.name}
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        className={
          meta.touched && meta.error
            ? "form-control " + classes["input-error"]
            : "form-control"
        }
      />
      {meta.touched && meta.error && (
        <div className={classes["error"]}>{meta.error}</div>
      )}
    </div>
  );
}

interface textFieldProps {
  label: string;
  name: string;
  type: "text" | "password" | "date" | "number" | "email" | "num";
  placeholder: string;
}

TextField.defaultProps = {
  type: "text",
};
