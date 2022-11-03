import { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

const BasicTable = (props) => {

  const [rows, setRows] = useState(props.rows);
  const [orders, setOrders] = useState([1, 1, 1]);
  const handleSort = (sortKey, idx) => {
    return () => {
      const order = orders[idx];
      let newOrders = [...orders];
      newOrders[idx] = -order;
      let newRows = [...rows];
      newRows.sort((a, b) => {
        // if (a.name === b.name) return a.subject > b.subject ? 1 : -1;
        if (a[sortKey] === b[sortKey]) return 0;
        return a[sortKey] > b[sortKey] ? order : -order;
      });
      setRows(newRows);
      setOrders(newOrders);
    }
  };

  return (
    <TableContainer component={Paper} sx={{ height: "250px" }}>
      <Table stickyHeader aria-label="simple table">
        <TableHead>
          <TableRow>
            {
              ['Name', 'Subject', 'Score'].map((attr, idx) => (
                <TableCell key={attr} align={ attr === 'Score' ? 'right' : 'left' }>
                  <Button onClick={handleSort(attr.toLowerCase(), idx)}>
                    { attr }
                  </Button>
                </TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody sx={{ overflowY: "scroll" }}>
          {
            rows.map((row) => (
            <TableRow
              key={row._id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                width: "inherit",
              }}
            >
              <TableCell
                sx={{ wordBreak: "break-all", maxWidth: "6rem" }}
                component="th"
                scope="row"
              >
                {row.name}
              </TableCell>
              <TableCell
                sx={{ wordBreak: "break-all", maxWidth: "6rem" }}
                component="th"
                scope="row"
              >
                {row.subject}
              </TableCell>
              <TableCell sx={{ wordBreak: "break-all" }} align="right">
                {row.score}
              </TableCell>
            </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BasicTable;
