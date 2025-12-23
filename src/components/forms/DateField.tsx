import { useField } from "formik";
import Input from "./Input";
import classes from "./../../Form.module.css";

export default function DateField(props: dateFieldProps) {
  const [field, meta] = useField(props);

  const trackDate = !field.value
    ? ""
    : new Date(field.value).toLocaleDateString("en-CA");

  return (
    <div className={classes["form-group"]}>
      <Input
        id={props.name}
        onBlur={field.onBlur}
        onChange={field.onChange}
        name={props.name}
        label={props.label}
        type="date"
        invalid={meta.touched && meta.error}
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
