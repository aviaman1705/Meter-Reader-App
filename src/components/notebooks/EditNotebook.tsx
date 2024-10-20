import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { urlNotebooks } from "../../endpoints";
import { notebookDTO } from "./notebook.models";
import { convertNotebookToFormData } from "../../utils/formDataUtils";
import Loading from "../../utils/Loading";
import NotebookForm from "./NotebookForm";

import classes from "./../../Form.module.css";

export default function EditNotebook() {
  const { id }: any = useParams();
  const [notebook, setNotebook] = useState<notebookDTO>();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`${urlNotebooks}/${id}`)
      .then((response: AxiosResponse<notebookDTO>) => {
        setNotebook(response.data);
      });
  }, [id]);

  async function edit(notebook: notebookDTO) {
    setLoading(true);
    const formData = convertNotebookToFormData(notebook);
    axios
      .put(`${urlNotebooks}/${id}`, formData)
      .then((response: AxiosResponse<notebookDTO>) => {
        setTimeout(() => {
          setLoading(false);
          history.push(`/notebooks`);
        }, 2000);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }

  return (
    <div className="form-container">
      <div className={classes["form-box"]}>
        {loading === true ? <Loading left="45%" top="42%" /> : null}
        {notebook && (
          <NotebookForm
            title="עריכת פנקס"
            model={notebook}
            onSubmit={async (value) => {
              await edit(value);
            }}
          />
        )}
      </div>
    </div>
  );
}
