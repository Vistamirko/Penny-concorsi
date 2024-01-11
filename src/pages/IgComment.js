import "../App.css";
import { CSVLink } from "react-csv";
import usersData from "../data/igcomment.json";
import { useMemo } from "react";
import { useTable } from "react-table";
import Navbar from "../navbar";

// Columns array created for table header
const columns = [
  { Header: "UserId", accessor: "UserId" },
  { Header: "Username", accessor: "Username" },
  { Header: "CommentId", accessor: "CommentId" },
  { Header: "CommentText", accessor: "CommentText" },
  { Header: "ProfileURL", accessor: "ProfileURL" },
  { Header: "ProfilePicURL", accessor: "ProfilePicURL" },
  { Header: "Date", accessor: "Date" },
];

function App() {
  // data declared to be used in table taking data from JSON file
  const data = useMemo(() => usersData, []);

  // Calling react table hook
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  // Contains the column headers and table data in the required format for CSV
  const csvData = [
    ["UserId", "Username", "CommentId", "CommentText", "ProfileURL", "ProfilePicURL", "Date"],
    ...data.map(({ UserId, Username, CommentId, CommentText, ProfileURL, ProfilePicURL, Date }) => [
       UserId,
      Username,
      CommentId,
      CommentText,
      ProfileURL,
      ProfilePicURL,
      Date,
    ]),
  ];
  return (
    <div className="App">
        <Navbar></Navbar>
       
      <div className="container">
        <div className="row">
            <div className="col-12 col-sm-9">
            <h1>Instagram Commenti</h1>
            </div>
          <div className="col-12 col-sm-3 ms-auto">
            
            <CSVLink
              className="btn btn-primary w-100 mt-30"
              filename="igcomment.csv"
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
