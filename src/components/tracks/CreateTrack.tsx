import axios, { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { urlNotebooks, urlTracks } from "../../endpoints";
import DisplayErrors from "../../utils/DisplayErrors";
import { convertTrackToFormData } from "../../utils/formDataUtils";
import Loading from "../../utils/Loading";
import { trackDTO } from "./track.models";
import TrackForm from "./TrackForm";

import classes from "./../../Form.module.css";
import { notebookDTO } from "../notebooks/notebook.models";
import { selectList } from "../../models/selectList.models";

export default function CreateTrack() {
  const [errors, setErrors] = useState<string[]>([]);
  const track: trackDTO = {
    fromDate: "",
    toDate: "",
    desc: "",
    notebookId: null as any,
    called: "",
    unCalled: "",
  };
  const [notebooks, setNotebooks] = useState<selectList[]>([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const GetNotebooks = () => {
    axios
      .get(`${urlNotebooks}/GetNotebooks`)
      .then((response: AxiosResponse<notebookDTO[]>) => {
        let mappedNotebooks: any[];

        mappedNotebooks = response.data.map((notebook) => {
          return {
            text: notebook.number.toString(),
            value: notebook.id.toString(),
          };
        });

        setNotebooks(mappedNotebooks);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  };

  function create(track: trackDTO) {
    setLoading(true);
    const formData = convertTrackToFormData(track);
    axios({
      method: "post",
      url: urlTracks,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response: AxiosResponse<number>) => {
        setTimeout(() => {
          setLoading(false);
          history.push(`/tracks`);
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
        <TrackForm
          title="יצירת מסלול"
          model={track}
          notebooksDDL={notebooks}
          ddlNotebooksValue={-1}
          onSubmit={(values) => create(values)}
        />
      </div>
    </div>
  );
}
