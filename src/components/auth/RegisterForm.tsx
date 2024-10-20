import { Form, Formik, FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";
import TextField from "../forms/TextField";
import Button from "../../utils/Button";
import { Link } from "react-router-dom";

import classes from "./../../Form.module.css";
import { registerSchema } from "../../Schema";
import { registerDTO } from "./auth.models";

const RegisterForm = (props: registerFormProps) => {
  return (
    <Formik
      initialValues={{ username: "", email: "", password: "" }}
      validationSchema={registerSchema}
      onSubmit={(values, actions) => props.onSubmit(values, actions)}
    >
      {(props) => (
        <Form>
          <TextField
            label="שם משתמש"
            name="username"
            type="text"
            placeholder="הזן שם משתמש"
          />

          <TextField
            label="מייל"
            name="email"
            type="text"
            placeholder="הזן מייל"
          />

          <TextField
            label="סיסמא"
            name="password"
            type="password"
            placeholder="הזן סיסמא"
          />
          <button type="submit" disabled={props.isSubmitting}>
            הרשם
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;

interface registerFormProps {
  onSubmit(values: any, actions: FormikHelpers<registerDTO>): void;
}
