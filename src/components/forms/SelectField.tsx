import { useField } from "formik";

import classes from "./../../Form.module.css";

export default function SelectField(props: selectFieldProps) {
  const [field, meta] = useField(props);
  console.log("field", field);
  console.log("meta", meta);

  return (
    <div className={classes["form-group"]}>
      <label htmlFor={field.name}>{props.label}</label>
      <select
        {...field}
        name={props.name}
        placeholder={props.placeholder}
        className={
          meta.touched && meta.error
            ? "form-control " + classes["input-error"]
            : "form-control"
        }
      >
        {props.children}
      </select>
      {meta.touched && meta.error && (
        <div className={classes["error"]}>{meta.error}</div>
      )}
    </div>
  );
}

interface selectFieldProps {
  label: string;
  name: string;
  placeholder: string;
  children: React.ReactNode;
}

SelectField.defaultProps = {
  type: "text",
};
