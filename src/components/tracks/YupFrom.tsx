import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

export default function YupFrom() {
  const SignupSchema = Yup.object().shape({
    firstName: Yup.number().required("Required"),
    lastName: Yup.number()
      .nullable()
      .min(
        Yup.ref("firstName"),
        "שדה מ-תאריך חייב להיות מוקדם משדה עד  תאריך או שווה"
      ),
    email: Yup.string().email("Invalid email").required("Required"),
  });

  return (
    <div>
      <h1>Signup</h1>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          // same shape as initial values
          console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field name="firstName" />
            {errors.firstName && touched.firstName ? (
              <div>{errors.firstName}</div>
            ) : null}
            <Field name="lastName" />
            {errors.lastName && touched.lastName ? (
              <div>{errors.lastName}</div>
            ) : null}
            <Field name="email" type="email" />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
