import { Link, useHistory } from "react-router-dom";
import Search from "./Search";
import Button from "./Button";
import ItemsPerPage from "./ItemsPerPage";
import Loading from "./Loading";
import TableHeader from "./TableHeader";
import TableFooter from "./TableFooter";
import Pagination from "./Pagination/Pagination";
import { useEffect, useState } from "react";
import { ReactElement } from "react-markdown/lib/react-markdown";
import axios, { AxiosError, AxiosResponse } from "axios";
import { sysDataTablePager } from "../models/sysDataTablePager.models";
import customConfirm from "./customConfirm";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

import classes from "./../Table.module.css";

export default function IndexEntity<T>(props: indexEntityProps<T>) {
  const history = useHistory();
  const [entities, setEntities] = useState<T[]>();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalAmontOfPages, setTotalAmontOfPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    page,
    itemsPerPage,
    props.sortColumn,
    props.sortType,
    props.columns,
    search,
  ]);

  const loadData = () => {
    axios
      .get(
        `${props.url}?page=${page}&itemsPerPage=${itemsPerPage}&sortColumn=${props.sortColumn}&sortType=${props.sortType}&search=${search}`
      )
      .then((response: AxiosResponse<sysDataTablePager<T>>) => {
        const totalAmontOfRecords = parseInt(
          response.headers["totalamountofrcords"],
          10
        );

        setTotalItems(response.data.iTotalRecords);
        setTotalAmontOfPages(Math.ceil(totalAmontOfRecords / itemsPerPage));
        setItemsPerPage(itemsPerPage);
        setEntities(response.data.aaData);
        setLoading(false);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  };

  const onSearch = (event: any) => {
    setSearch(event.target.value);
  };

  const handlePageItemCount = (event: any) => {
    setItemsPerPage(event.target.value!);
  };

  async function remove(id: number) {
    customConfirm(() => {
      setLoading(true);
      axios
        .delete(`${props.url}/${id}`)
        .then((response: AxiosResponse<any>) => {
          setTimeout(() => {
            loadData();
            setLoading(false);
          }, 2000);
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
    }, "האם אתה בטוח שברצונך למחוק את הפריט ?");
  }

  const buttons = (title: string, editUrl: string, id: number) => (
    <>
      <td>
        <Button
          title={title}
          className={`${classes["btn-grid-edit"]}`}
          onClick={() => {
            history.push(editUrl);
          }}
        >
          עריכה
        </Button>
        <Link
          className={`${classes["btn-grid-mobile-edit"]}`}
          to={`/notebooks/edit/${id}`}
        >
          <CiEdit />
        </Link>
      </td>
      <td>
        <Button
          title="מחיקה"
          className={`${classes["btn-grid-delete"]}`}
          onClick={() => {
            remove(id);
          }}
        >
          מחיקה
        </Button>
        <a
          className={`${classes["btn-grid-mobile-delete"]}`}
          href="#/"
          onClick={() => {
            remove(id);
          }}
        >
          <MdDeleteOutline />
        </a>
      </td>
    </>
  );

  return (
    <>
      <div className={`${classes["operation-box"]}`}>
        <div className={`${classes["right-box"]}`}>
          <Button
            id={classes["grid-redirect-btn"]}
            onClick={() => {
              history.push(props.btnLink);
            }}
          >
            {props.btnText}
          </Button>
        </div>

        <div className={`${classes["left-box"]}`}>
          <Search onSearch={(e: any) => onSearch(e)} />
          <ItemsPerPage
            itemsPerPage={itemsPerPage}
            optins={props.options}
            onChange={(e: any) => handlePageItemCount(e)}
          />
        </div>
      </div>

      <div id={classes["table-wrapper"]} className="col">
        {loading && <Loading left="50%" top="50%" />}
        <table
          className={`table table-bordered table-hover table-striped ${classes["custom-table"]}`}
        >
          <TableHeader columns={props.columns} onSorting={props.onSorting} />
          {props.children(entities, buttons)}
        </table>
        <TableFooter
          itemsPerPage={itemsPerPage}
          page={page}
          totalItems={totalItems}
          onClick={() => {}}
        />
        <div className={classes["pagination-box"]}>
          <Pagination
            currentPage={page}
            totalAmontOfPages={totalAmontOfPages}
            onChange={(newPage) => setPage(newPage)}
          />
        </div>
      </div>
    </>
  );
}

interface indexEntityProps<T> {
  btnLink: string;
  btnText: string;
  options: number[];
  columns: any[];
  onSorting(dataKey: string): void;
  sortColumn: string;
  sortType: string;
  children(
    entities: T[],
    buttons: (title: string, editUrl: string, id: number) => ReactElement
  ): ReactElement;
  url: string;
}
