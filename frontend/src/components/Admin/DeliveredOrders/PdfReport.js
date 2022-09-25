import React, { useState, useEffect } from "react";
import axios from "axios";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";
import { Button } from "@material-ui/core";

import jsPDF from "jspdf";
import "jspdf-autotable";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#5E4FA2",
    color: theme.palette.common.white,
    fontSize: 20,
  },
  body: {
    fontSize: 14,
    color: theme.palette.common.white,
  },
}))(TableCell);

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    backgroundColor: "darkgray",
    color: "#ffffff",
  },
});

export default function PdfReport(props) {
  let count = 0;
  const classes = useStyles();

  const [completeList, setCompleteList] = useState([]);

  let date = "";

  useEffect(() => {
    if (props.reportData == "") {
      date = "p";
    } else {
      date = props.reportData;
    }

    axios
      .get(`http://localhost:8070/complete/by-date/${date}`)
      .then((response) => {
        setCompleteList(response.data);
        //console.log(response.data)
      })
      .catch((error) => {
        alert(error);
      });
  });

  //console.log(completeList);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Order Report", 20, 10);

    doc.autoTable({
      columns: [
        { header: "Order ID", dataKey: "orderId" },
        { header: "Delivery Date", dataKey: "DeliveryDate" },
        { header: "Time Released", dataKey: "TimeReleased" },
        { header: "Time Received", dataKey: "TimeReceived" },
      ],

      body: completeList,
    });

    doc.save("OrderReport.pdf");
    // window.location.reload(true)
  };

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={downloadPDF}>
        Download Report
      </Button>
    </div>
  );
}
