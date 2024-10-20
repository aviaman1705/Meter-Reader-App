import { ChangeEvent, useState } from "react";
import { Form, Formik, FormikHelpers } from "formik";
import { editUserDTO } from "./user.models";
import { userDetailsSchema } from "../../Schema";
import TextField from "../forms/TextField";
import Button from "../../utils/Button";
import ImageField from "../forms/ImageField";

import classes from "../../Form.module.css";

export default function UserDetailsForm(props: UserDetailsFormProps) {
  return (
    <Formik
      initialValues={props.model}
      onSubmit={props.onSubmit}
      validationSchema={userDetailsSchema}
      enableReinitialize={true}
    >
      {(formikProps) => (
        <Form>
          <fieldset>
            <legend>פרופיל</legend>
            {props.children}
            <TextField
              label="שם משתמש"
              name="userName"
              type="text"
              placeholder="הזן שם משתמש"
            />
            <TextField
              label="מייל"
              name="email"
              type="email"
              placeholder="הזן שם משתמש"
            />
            <TextField
              label="טלפון"
              name="phone"
              type="text"
              placeholder="הזן פלאפון"
            />
            <ImageField
              label="תמונה"
              name="image"
              imageURL={props.model.image}
              onSelect={props.onSelect}
            />
            <Button
              disabled={formikProps.isSubmitting}
              type="submit"
              id="submit"
            >
              שמור שינויים
            </Button>
          </fieldset>
        </Form>
      )}
    </Formik>
  );
}

interface UserDetailsFormProps {
  model: editUserDTO;
  children: React.ReactNode;
  onSubmit(values: editUserDTO, actions: FormikHelpers<editUserDTO>): void;
  onSelect?(file: File): void;
}
