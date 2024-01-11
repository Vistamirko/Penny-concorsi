import "../App.css";
import { CSVLink } from "react-csv";
import usersData from "../data/fbcomment.json";
import { useMemo } from "react";
import { useTable } from "react-table";
import Navbar from "../navbar";



// Columns array created for table header
const columns = [
  { Header: "Id", accessor: "Id" },
  { Header: "Name", accessor: "Name" },
  { Header: "Data", accessor: "Data" },
  { Header: "Comment", accessor: "Comment" },
];

function App() {
  // data declared to be used in table taking data from JSON file
  const data = useMemo(() => usersData, []);

  // Calling react table hook
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  // Contains the column headers and table data in the required format for CSV
  const csvData = [
    ["Id", "Name", "Data", "Comment"],
    ...data.map(({ Id, Name, Data, Comment }) => [
      Id,
      Name,
      Data,
      Comment,
    ]),
  ];
  return (
    <div className="App">
        <Navbar></Navbar>
      <div className="container">
        <div className="row">
        <div className="col-12 col-sm-9">
            <h1>Facebook commenti</h1>
            </div>
          <div className="col-12 col-sm-3 ms-auto">
            <CSVLink
              className="btn btn-primary w-100 mt-30"
              filename="fbcomment.csv"
              data={csvData}
            >
              Esporta csv
            </CSVLink>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered mt-2" {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {/* Table End */}
    </div>
  );
}

export default App;
