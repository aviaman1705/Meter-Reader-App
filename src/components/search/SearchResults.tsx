import { useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { urlSearch } from "../../endpoints";
import { useParams } from "react-router-dom";
import { searchResultsDTO } from "./search.models";
import SearchResultItem from "./SearchResultItem";
import Loading from "../../utils/Loading";

import classes from "./SearchResults.module.css";

export default function SearchResults() {
  const [data, setData] = useState<searchResultsDTO[]>([]);
  const { term }: any = useParams();
  const [loading, setLoading] = useState(false);

  function search() {
    axios
      .get(`${urlSearch}/GetSearchResults/?term=${term}`)
      .then((response: AxiosResponse<searchResultsDTO[]>) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (term) {
      setLoading(true);
      setTimeout(() => {
        search();
      }, 2000);
    }
  }, [term]);

  return (
    <>
      <h1>תוצאות חיפוש</h1>
      {loading ? <Loading left="40%" top="40%" /> : null}
      <div className={`grid ${classes["search-item-container"]} grid--6-cols`}>
        {data.map((item: searchResultsDTO) => (
          <SearchResultItem key={item.link} model={item} />
        ))}
      </div>
    </>
  );
}
