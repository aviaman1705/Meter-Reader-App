import { useContext, useEffect, useState } from "react";
import { searchResultsDTO } from "./search.models";
import axios, { AxiosError, AxiosResponse } from "axios";

import { urlSearch } from "../../endpoints";
import { useHistory, useParams } from "react-router-dom";

import classes from "./SearchResults.module.css";
import Button from "../../utils/Button";

export default function SearchResults() {
  const [data, setData] = useState<searchResultsDTO[]>([]);
  const { term }: any = useParams();
  const history = useHistory();

  const search = () => {
    axios
      .get(`${urlSearch}/GetSearchResults/?term=${term}`)
      .then((response: AxiosResponse<searchResultsDTO[]>) => {
        setData(response.data);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (term) {
      search();
    }
  }, [term]);
  return (
    <>
      <h1>תוצאות חיפוש</h1>

      <div className="panel panel-default">
        <div className="panel-heading">תוצאות חיפוש</div>
        {/* <!-- /.panel-heading --> */}
        <div className="panel-body">
          <h4>תוצאות חיפוש</h4>
          <div className={classes["tooltip-demo"]}>
            {data.map((item: searchResultsDTO) => (
              <Button
                type="button"
                className="btn btn-default"
                data-toggle="tooltip"
                data-placement="left"
                title={item.title}
                onClick={() => {
                  history.push(item.link);
                }}
              >
                {item.title}
              </Button>
            ))}
          </div>
          <br />
        </div>
        {/* <!-- .panel-body --> */}
      </div>
    </>
  );
}
