import { Form, Formik, FormikHelpers } from "formik";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { notebookDTO } from "./notebook.models";
import NumberField from "../forms/NumberField";
import Button from "../../utils/Button";
import axios, { AxiosResponse } from "axios";
import { urlNotebooks } from "../../endpoints";

import classes from "./../../Table.module.css";
import TextField from "../forms/TextField";

export default function NotebookForm(props: notebookFormProps) {
  const history = useHistory();

  return (
    <div className="card card-primary">
      <div className="card-header">
        <h3 className="card-title">{props.title}</h3>
      </div>

      <div className="card-body">
        <Formik
          initialValues={props.model}
          onSubmit={props.onSubmit}
          validationSchema={Yup.object({
            number: Yup.number()
              .required("שדה מספר הוא שדה חובה!")
              .min(1, "נא הזן מספר הגדול מ-0")
              .test("Unique notebook", "מספר פנקס כבר קיים!", function (value) {
                return new Promise((resolve, reject) => {
                  const url =
                    props.model.id === 0
                      ? `${urlNotebooks}/getNotebookByNumber/${value}`
                      : `${urlNotebooks}/getNotebookByNumber/${value}/${props.model.id}`;
                  axios
                    .get(`${url}`)
                    .then((response: AxiosResponse<boolean>) => {
                      if (response.data === true) {
                        resolve(false);
                      }
                      resolve(true);
                    });
                });
              }),
          })}
        >
          {(formikProps) => (
            <Form>
              <TextField
                label="מספר פנקס"
                name="number"
                type="number"
                placeholder="מספר פנקס"
              />

              <div className={`form-group ${classes["buttons-section"]} p-2`}>
                <Button
                  className={`${classes["btn-submit"]}`}
                  disabled={formikProps.isSubmitting}
                  type="submit"
                >
                  שמור שינויים
                </Button>

                <Button
                  className={`${classes["btn-cancel"]}`}
                  onClick={() => {
                    history.push("/notebooks");
                  }}
                >
                  בטל
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

interface notebookFormProps {
  title: string;
  model: notebookDTO;
  onSubmit(values: notebookDTO, actions: FormikHelpers<notebookDTO>): void;
}
