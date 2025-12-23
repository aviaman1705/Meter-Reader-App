import { useField } from "formik";
import Input from "./Input";
import classes from "./../../Form.module.css";

export default function NumberField(props: textFieldProps) {
  const [field, meta] = useField(props);

  return (
    <div className={classes["form-group"]}>
      <Input
        id={props.name}
        onBlur={field.onBlur}
        onChange={field.onChange}
        name={props.name}
        label={props.label}
        type="number"
        invalid={meta.touched && meta.error}
        className={
          meta.touched && meta.error
            ? "form-control " + classes["input-error"]
            : "form-control"
        }
        defaultValue={props.name}
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
}
