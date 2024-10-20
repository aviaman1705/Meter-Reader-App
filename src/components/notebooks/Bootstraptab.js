import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { useEffect, useState } from "react";
import axios from "axios";
import MySearch from "./MySearch";

const Bootstraptab = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [totalSize, setTotalSize] = useState(0);
  const [sortField, setSortField] = useState("number");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchText, setSearchText] = useState("");

  const columns = [
    { dataField: "id", text: "מזהה ייחודי", sort: true },
    { dataField: "number", text: "מספר פנקס", sort: true },
  ];

  const defaultSorted = [
    {
      dataField: "number",
      order: "asc",
    },
  ];

  const pagination = paginationFactory({
    page: page,
    sizePerPage: sizePerPage,
    totalSize: totalSize,
    lastPageText: ">>",
    firstPageText: "<<",
    nextPageText: ">",
    prePageText: "<",
    showTotal: true,
    alwaysShowAllBtns: true,
  });

  //   const { SearchBar, ClearSearchButton } = Search;

  useEffect(() => {
    loadData();
  }, [page, sizePerPage, sortField, sortOrder, searchText]);

  const loadData = () => {
    axios
      .get(
        `https://localhost:7089/api/Notebooks/employee?page=${page}&sizePerPage=${sizePerPage}&sortField=${sortField}&sortOrder=${sortOrder}&search=${
          searchText || ""
        }`
      )
      .then((response) => {
        let mappedNotebook = response.data.aaData.map((notebook) => {
          return {
            id: notebook.id,
            number: notebook.number,
          };
        });

        // const totalAmountOfRcords = parseInt(
        //   response.headers["totalamountofrcords"],
        //   10
        // );

        setData(mappedNotebook);
        setTotalSize(response.data.iTotalRecords);
      });
  };

  const onTableChange = (type, newState) => {
    // handle any data change here
    setPage(newState.page);
    setSizePerPage(newState.sizePerPage);
    setSortField(newState.sortField);
    setSortOrder(newState.sortOrder);
    setSearchText(newState.searchText);
  };

  return (
    <div className="App">
      <h5>React Bootstrap Table Next with Sorting, Pagination and Search</h5>

      <ToolkitProvider
        bootstrap4
        keyField="id"
        data={data}
        columns={columns}
        search={{
          searchFormatted: false,
          placeholder: "pla",
        }}
        exportCSV
      >
        {(props) => (
          <div>
            <h6>Input something at below input field:</h6>
            {/* <SearchBar {...props.searchProps} /> */}
            <MySearch {...props.searchProps} />
            <ClearSearchButton {...props.searchProps} />
            <hr />
            <BootstrapTable
              defaultSorted={defaultSorted}
              pagination={pagination}
              remote={true}
              onTableChange={onTableChange}
              {...props.baseProps}
            />
          </div>
        )}
      </ToolkitProvider>
    </div>
  );
};

export default Bootstraptab;
