import { useEffect, useReducer, useState } from "react";
import moment from "moment";
import { urlTracks } from "../../endpoints";
import { trackGridItemDTO } from "./track.models";
import IndexEntity from "../../utils/IndexEntity";
import Button from "../../utils/Button";
import { useHistory } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import customConfirm from "../../utils/customConfirm";
import axios, { AxiosError, AxiosResponse } from "axios";
import { sysDataTablePager } from "../../models/sysDataTablePager.models";
import {
  flexRender,
  getCoreRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import classes from "./../../Table.module.css";
import Pagination from "../../utils/Pagination/Pagination";
import { Form } from "react-bootstrap";
import Loading from "../../utils/Loading";

export default function IndexTracks() {
  const history = useHistory();
  const columns = [
    {
      accessorKey: "id",
      header: "#",
      cell: (props: any) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: "called",
      header: "נקרא",
      cell: (props: any) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: "unCalled",
      header: "לא נקרא",
      cell: (props: any) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: "desc",
      header: "תיאור",
      cell: (props: any) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: "date",
      header: "תאריך",
      cell: (props: any) => {
        return <p>{moment(props.getValue()).format("DD/MM/YYYY")}</p>;
      },
    },
    {
      accessorKey: "notebookNumber",
      header: "פנקס",
      cell: (props: any) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: "button_edit",
      header: "עריכה",
      cell: (props: any) => {
        return (
          <Button
            title={props.row.getValue("id")}
            className={`${classes["btn-grid-edit"]}`}
            onClick={() => {
              history.push(`/tracks/edit/${props.row.getValue("id")}`);
            }}
          >
            עריכה
          </Button>
        );
      },
    },
    {
      accessorKey: "button_delete",
      header: "מחיקה",
      cell: (props: any) => {
        return (
          <>
            <Button
              title="מחיקה"
              className={`${classes["btn-grid-delete"]}`}
              onClick={() => {
                remove(props.row.getValue("id"));
              }}
            >
              מחיקה
            </Button>
            <a
              className={`${classes["btn-grid-mobile-delete"]}`}
              href="#/"
              onClick={() => {
                remove(props.row.getValue("id"));
              }}
            >
              <MdDeleteOutline />
            </a>
          </>
        );
      },
    },
  ];

  const options = [5, 10, 25, 50];
  const [data, setData] = useState<trackGridItemDTO[]>([]);
  const [sorting, setSorting] = useState<SortingState>([
    { id: "date", desc: true },
  ]);
  const [globalFilter, setGlobalFilter] = useState("");

  const [page, setPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [loading, setLoading] = useState(false);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    manualSorting: true,
    sortDescFirst: false,
    onSortingChange: setSorting,
    enableSortingRemoval: false,
    manualPagination: true,
    pageCount: pageCount,
    getCoreRowModel: getCoreRowModel(),
  });

  function loadData() {
    axios
      .get(
        `${urlTracks}?page=${page}&itemsPerPage=${itemsPerPage}&sortColumn=${
          sorting[0].id
        }&sortType=${
          sorting[0].desc == true ? "desc" : "asc"
        }&search=${globalFilter}`
      )
      .then((response: AxiosResponse<sysDataTablePager<trackGridItemDTO>>) => {
        setData(response.data.aaData);
        setPageCount(
          Math.ceil(response.data.iTotalRecords / response.data.aaData.length)
        );
      });
  }

  useEffect(() => {
    loadData();
  }, [sorting, page, globalFilter, itemsPerPage]);

  function pageChangeHanler(page: number) {
    setPage(page);
  }

  async function remove(id: number) {
    customConfirm(() => {
      setLoading(true);
      axios
        .delete(`${urlTracks}/${id}`)
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

  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <h1 className="page-header">רשימת מסלולים</h1>
        </div>
        <div className="col-lg-12">
          {loading && <Loading left="50%" top="50%" />}
          <div className={`${classes["operation-box"]}`}>
            <div className={`${classes["right-box"]}`}>
              <Button
                id={classes["grid-redirect-btn"]}
                onClick={() => {
                  history.push(`/tracks/create`);
                }}
              >
                הוספת מסלול
              </Button>
            </div>

            <div className={`${classes["left-box"]}`}>
              <div className={`${classes["search-input-wrap"]}`}>
                <input
                  className="form-control"
                  value={globalFilter}
                  onChange={(e) => setGlobalFilter(String(e.target.value))}
                  placeholder="חפש..."
                />
              </div>
              <div className={`${classes["per-page-item"]}`}>
                <label id={`${classes["table-select-label"]}`}>הצג </label>
                <Form.Select
                  id={`${classes["table-select-option"]}`}
                  className="form-control"
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  defaultValue={itemsPerPage}
                  aria-label="Default select example"
                >
                  {options.map(function (option, index) {
                    return (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    );
                  })}
                </Form.Select>
              </div>
            </div>
          </div>
          <table
            className={`table table-bordered table-hover table-striped ${classes["custom-table"]}`}
          >
            <thead className="thead-dark">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header: any) => (
                    <th
                      className="sortable"
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {header.column.columnDef.header}
                      {header.column.getIsSorted() === false &&
                      header.column.columnDef.accessorKey.indexOf("button") ===
                        -1
                        ? "↕"
                        : header.column.getIsSorted() === "desc" &&
                          header.column.columnDef.accessorKey.indexOf(
                            "button"
                          ) === -1
                        ? "▼"
                        : header.column.getIsSorted() === "asc" &&
                          header.column.columnDef.accessorKey.indexOf(
                            "button"
                          ) === -1
                        ? "▲"
                        : null}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className={classes["pagination-box"]}>
            <Pagination
              currentPage={page}
              totalAmontOfPages={pageCount}
              onChange={(page: number) => {
                pageChangeHanler(page);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
