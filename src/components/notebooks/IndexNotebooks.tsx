import { useState } from "react";
import { urlNotebooks } from "../../endpoints";
import { notebookDTO } from "./notebook.models";
import IndexEntity from "../../utils/IndexEntity";

import classes from "./../../Table.module.css";

export default function IndexNotebooks() {
  const options = [5, 10, 25, 50];
  const ascIcon = `url("./../icons/sort_asc.png")`;
  const descIcon = `url("./../icons/sort_desc.png")`;

  const [sortColumn, setSortColumn] = useState("number");
  const [sortType, setSortType] = useState<string>("asc");
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
      dataKey: "number",
      title: "מספר פנקס",
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
      {/* <div className="row">
        <div className="col-lg-12">
          <h1 className="page-header">רשימת פנקסים</h1>
        </div>
        <div className="col-lg-12">
          <IndexEntity<notebookDTO>
            btnLink="/notebooks/create"
            btnText="הוספת פנקס"
            options={options}
            columns={columns}
            onSorting={(e: any) => onSorting(e)}
            url={urlNotebooks}
            sortColumn={sortColumn}
            sortType={sortType}
          >
            {(notebooks, buttons) => (
              <tbody>
                {notebooks?.map((notebook) => (
                  <tr key={notebook.id}>
                    <td>{notebook.id}</td>
                    <td>{notebook.number}</td>
                    {buttons(
                      notebook.id.toString(),
                      `/notebooks/edit/${notebook.id}`,
                      notebook.id
                    )}
                  </tr>
                ))}
              </tbody>
            )}
          </IndexEntity>
        </div>
      </div> */}
    </>
  );
}
