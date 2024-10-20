import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios, { AxiosResponse, AxiosError } from "axios";
import dayjs from "dayjs";
import { urlTracks } from "../../endpoints";
import { sysDataTablePager } from "../../models/sysDataTablePager.models";
import Search from "../../utils/Search";
import ItemsPerPage from "../../utils/ItemsPerPage";
import TableHeader from "../../utils/TableHeader";
import Loading from "../../utils/Loading";
import Pagination from "../../utils/Pagination/Pagination";
import customConfirm from "../../utils/customConfirm";
import Button from "../../utils/Button";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

import { trackGridItemDTO } from "./track.models";
import TableFooter from "../../utils/TableFooter";

import classes from "./../../Table.module.css";

export default function IndexTracks() {
  const history = useHistory();
  const [data, setData] = useState<trackGridItemDTO[]>([]);
  const [page, setPage] = useState(1);
  const [totalAmontOfPages, setTotalAmontOfPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortColumn, setSortColumn] = useState("number");
  const [sortType, setSortType] = useState<string>("asc");
  const [search, setSearch] = useState("");
  const options = [5, 10, 25, 50];
  const [loading, setLoading] = useState(false);
  const [columns, setColumns] = useState([
    {
      dataKey: "id",
      title: "#",
      cursor: "pointer",
      backgroundImage: "",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "left center",
    },
    {
      dataKey: "date",
      title: "תאריך",
      cursor: "pointer",
      backgroundImage: `url("./../icons/sort_asc.png")`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "left center",
    },
    {
      dataKey: "notebookNumber",
      title: "מספר פנקס",
      cursor: "pointer",
      backgroundImage: `url("./../icons/sort_asc.png")`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "left center",
    },
    {
      dataKey: "desc",
      title: "תיאור",
      cursor: "pointer",
      backgroundImage: `url("./../icons/sort_asc.png")`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "left center",
    },
    {
      dataKey: "called",
      title: "נקרא",
      cursor: "pointer",
      backgroundImage: `url("./../icons/sort_asc.png")`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "left center",
    },
    {
      dataKey: "unCalled",
      title: "לא נקרא",
      cursor: "pointer",
      backgroundImage: `url("./../icons/sort_asc.png")`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "left center",
    },
  ]);

  useEffect(() => {
    setLoading(true);

    const loadData = () => {
      axios
        .get(
          `${urlTracks}?page=${page}&itemsPerPage=${itemsPerPage}&sortColumn=${sortColumn}&sortType=${sortType}&search=${search}`
        )
        .then(
          (response: AxiosResponse<sysDataTablePager<trackGridItemDTO>>) => {
            const totalAmontOfRecords = response.data.iTotalRecords;
            setTotalAmontOfPages(Math.ceil(totalAmontOfRecords / itemsPerPage));

            let mappedTracks = response.data.aaData.map((track) => {
              return {
                id: track.id,
                called: track.called,
                unCalled: track.unCalled,
                notebookNumber: track.notebookNumber,
                desc: track.desc,
                fromDate: dayjs(track.fromDate).format("DD/MM/YY"),
                toDate: dayjs(track.toDate).format("DD/MM/YY"),
                notebookId: track.notebookId,
              };
            });

            setItemsPerPage(response.data.iTotalDisplayRecords);
            setTotalItems(response.data.iTotalRecords);
            setData(mappedTracks);
            setLoading(false);
          }
        )
        .catch((error: AxiosError) => {
          console.log(error);
        });
    };

    setTimeout(() => {
      loadData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, 1000);
  }, [page, itemsPerPage, sortColumn, sortType, search]);

  const updateState = (arr: any[]) => {
    arr.forEach(function (item, index) {
      item.backgroundImage = `url("./../icons/sort_asc.png")`;
    });

    setColumns(arr);
  };

  const onSorting = (dataKey: string) => {
    if (sortColumn === dataKey) {
      if (sortType === "asc") {
        setSortType("desc");
        const index = columns.findIndex((emp) => emp.dataKey === dataKey);
        let copyArr = [...columns];
        copyArr[index].backgroundImage = `url("./../icons/sort_desc.png")`;
        setColumns(copyArr);
      } else {
        setSortType("asc");
        let copyArr = [...columns];
        updateState(copyArr);
      }
    } else {
      setSortColumn(dataKey);
      setSortType("asc");

      let copyArr = [...columns];
      updateState(copyArr);
    }
  };

  const onSearch = (event: any) => {
    // עדכון פרמטר חיפוש
    setSearch(event.target.value);
  };

  const handlePageItemCount = (event: any) => {
    // עדכון פרמטר כמות איימים בדף
    setItemsPerPage(event.target.value!);
  };

  async function remove(id: number) {
    customConfirm(() => {
      setLoading(true);
      axios
        .delete(`${urlTracks}/${id}`)
        .then((response: AxiosResponse<any>) => {
          setTimeout(() => {
            console.log(response);
            setData(data.filter((track) => track.id !== id));
            setLoading(false);
          }, 2000);
        })
        .catch((error: AxiosError) => {
          console.log(error);
        });
    }, "האם אתה בטוח שברצונך למחוק את הפריט ?");
  }

  return (
    <div className={`${classes["grid-container"]}`}>
      <h1 className={`${classes["grid-title"]}`}>רשימת מסלולים</h1>
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
          <Search onSearch={(e: any) => onSearch(e)} />
          <ItemsPerPage
            itemsPerPage={itemsPerPage}
            optins={options}
            onChange={(e: any) => handlePageItemCount(e)}
          />
        </div>
      </div>
      <div id={classes["table-wrapper"]} className="col">
        {loading && <Loading left="50%" top="50%" />}
        <table
          className={`table table-bordered table-hover table-striped ${classes["custom-table"]}`}
        >
          <TableHeader columns={columns} onSorting={onSorting} />
          <tbody>
            {data?.map((item, index, currentArray) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.toDate}</td>
                <td>{item.notebookNumber}</td>
                <td>{item.desc}</td>
                <td>{item.called}</td>
                <td>{item.unCalled}</td>
                <td>
                  <Button
                    title={item.desc}
                    className={`${classes["btn-grid-edit"]}`}
                    onClick={() => {
                      history.push(`/tracks/edit/${item.id}`);
                    }}
                  >
                    עריכה
                  </Button>
                  <Link
                    className={`${classes["btn-grid-mobile-edit"]}`}
                    to={`/tracks/edit/${item.id}`}
                  >
                    <CiEdit />
                  </Link>
                </td>
                <td>
                  <Button
                    title="מחיקה"
                    className={`${classes["btn-grid-delete"]}`}
                    onClick={() => {
                      remove(item.id);
                    }}
                  >
                    מחיקה
                  </Button>
                  <a
                    className={`${classes["btn-grid-mobile-delete"]}`}
                    href="#/"
                    onClick={() => {
                      remove(item.id);
                    }}
                  >
                    <MdDeleteOutline />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
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
    </div>
  );
}
