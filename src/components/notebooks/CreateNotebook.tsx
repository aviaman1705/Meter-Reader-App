import { useState } from "react";
import { useHistory } from "react-router-dom";
import { notebookDTO } from "./notebook.models";
import { convertNotebookToFormData } from "../../utils/formDataUtils";
import axios, { AxiosResponse } from "axios";
import { urlNotebooks } from "../../endpoints";
import DisplayErrors from "../../utils/DisplayErrors";
import Loading from "../../utils/Loading";

import classes from "./../../Form.module.css";
import NotebookForm from "./NotebookForm";

export default function CreateNotebook() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const history = useHistory();

  async function create(notebook: notebookDTO) {
    setLoading(true);
    const formData = convertNotebookToFormData(notebook);
    axios({
      method: "post",
      url: urlNotebooks,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response: AxiosResponse<any>) => {
        setTimeout(() => {
          setLoading(false);
          history.push(`/notebooks`);
        }, 2000);
      })
      .catch((error) => {
        setErrors(error.response.data);
      });
  }

  return (
    <div className="form-container">
      <div className={classes["form-box"]}>
        <DisplayErrors errors={errors} />
        {loading === true ? <Loading left="45%" top="42%" /> : null}
        <NotebookForm
          title="יצירת פנקס"
          model={{ id: 0, number: null, tracksCount: null }}
          onSubmit={async (values) => await create(values)}
        />
      </div>
    </div>
  );
}
