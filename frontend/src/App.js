//main app, displays table

import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Upload from "./components/upload";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, {
  textFilter,
  numberFilter,
} from "react-bootstrap-table2-filter";

const columns = [
  {
    dataField: "user_id",
    text: "user_id",
    sort: true,
  },
  {
    dataField: "user_name",
    text: "user_name",
    sort: true,
    filter: textFilter(),
  },
  {
    dataField: "name",
    text: "name",
    sort: true,
    filter: textFilter(),
  },
  {
    dataField: "salary",
    text: "salary",
    sort: true,
    filter: numberFilter(),
  },
];

const API_HOST = "http://localhost:8080";
const API_URL = `${API_HOST}/users`;

function App() {
  const [data, setData] = useState([]);
  const fetchData = () => {
    fetch(`${API_URL}`)
      .then((res) => res.json())
      .then((json) => setData(json))
      .then((json) => console.log(json));
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="container">
      <Upload></Upload>
      <BootstrapTable
        keyField="id"
        data={data}
        columns={columns}
        pagination={paginationFactory()}
        filter={filterFactory()}
      />
    </div>
  );
}

export default App;
