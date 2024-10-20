import { Form, Formik, FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";
import TextField from "../forms/TextField";
import Button from "../../utils/Button";
import { Link } from "react-router-dom";

import classes from "./../../Form.module.css";
import { loginSchema } from "../../Schema";
import { userCredentials } from "./auth.models";

const LoginForm = (props: loginFormProps) => {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={loginSchema}
      onSubmit={(values, actions) => props.onSubmit(values, actions)}
    >
      {(props) => (
        <Form>
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
            הכנס
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;

interface loginFormProps {
  onSubmit(values: any, actions: FormikHelpers<userCredentials>): void;
}
