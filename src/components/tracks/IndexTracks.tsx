import { useState } from "react";
import moment from "moment";
import { urlTracks } from "../../endpoints";
import { trackGridItemDTO } from "./track.models";
import IndexEntity from "../../utils/IndexEntity";

import classes from "./../../Table.module.css";

export default function IndexTracks() {
  const options = [5, 10, 25, 50];
  const ascIcon = `url("./../icons/sort_asc.png")`;
  const descIcon = `url("./../icons/sort_desc.png")`;

  const [sortColumn, setSortColumn] = useState("date");
  const [sortType, setSortType] = useState<string>("desc");
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

  const onSorting = (dataKey: string) => {
    if (sortColumn === dataKey) {
      if (sortType === "asc") {
        setSortType((prevState) => (prevState = "desc"));

        const index = columns.findIndex((emp) => emp.dataKey === dataKey);

        let updatedArr = [...columns];
        updatedArr[index].backgroundImage = descIcon;

        updatedArr.forEach(function (item) {
          if (item.dataKey != dataKey) {
            item.backgroundImage = "";
          }
        });

        setColumns((prevState) => (prevState = updatedArr));
      } else {
        setSortType((prevState) => (prevState = "asc"));

        const index = columns.findIndex((emp) => emp.dataKey === dataKey);

        let updatedArr = [...columns];
        updatedArr[index].backgroundImage = ascIcon;

        updatedArr.forEach(function (item) {
          if (item.dataKey != dataKey) {
            item.backgroundImage = "";
          }
        });

        setColumns((prevState) => (prevState = updatedArr));
      }
    } else {
      setSortColumn((prevState) => (prevState = dataKey));
      setSortType((prevState) => (prevState = "asc"));

      const index = columns.findIndex((emp) => emp.dataKey === dataKey);

      let updatedArr = [...columns];
      updatedArr[index].backgroundImage = ascIcon;

      updatedArr.forEach(function (item) {
        if (item.dataKey != dataKey) {
          item.backgroundImage = "";
        }
      });

      setColumns((prevState) => (prevState = updatedArr));
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <h1 className="page-header">רשימת מסלולים</h1>
        </div>
        <div className="col-lg-12">
          <IndexEntity<trackGridItemDTO>
            btnLink="/tracks/create"
            btnText="הוספת מסלול"
            options={options}
            columns={columns}
            onSorting={onSorting}
            url={urlTracks}
            sortColumn={sortColumn}
            sortType={sortType}
          >
            {(tracks, buttons) => (
              <tbody>
                {tracks?.map((track) => (
                  <tr key={track.id}>
                    <td>{track.id}</td>
                    <td>{moment(track.toDate).format("DD/MM/YYYY")}</td>
                    <td>{track.notebookNumber}</td>
                    <td>{track.desc}</td>
                    <td>{track.called}</td>
                    <td>{track.unCalled}</td>
                    {buttons(
                      track.id.toString(),
                      `/tracks/edit/${track.id}`,
                      track.id
                    )}
                  </tr>
                ))}
              </tbody>
            )}
          </IndexEntity>
        </div>
      </div>
    </>
  );
}
