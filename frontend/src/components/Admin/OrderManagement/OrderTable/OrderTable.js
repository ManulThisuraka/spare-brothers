import Setrider from "./Setrider";
import ViewOrder from "./ViewOrder";
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
import RiderRequest from "./RiderRequest";
import { Grid, CircularProgress } from "@material-ui/core";
import notificationCount from "./NotificationCount";
import NotificationCount from "./NotificationCount";
import { TextField } from "@material-ui/core";
import DeleteOrder from "./DeleteOrder";
import {
  Card,
  Col,
  Container,
  Row,
  CardBody,
  Label,
  Input,
  Button,
} from "reactstrap";

import jsPDF from "jspdf";
import "jspdf-autotable";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#FA334E",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
    color: theme.palette.common.white,
  },
}))(TableCell);

const useStyles = makeStyles({
  table: {
    minWidth: 350,
    backgroundColor: "darkgray",
    color: "#ffffff",
  },
});

export default function OrderTable() {
  const classes = useStyles();
  const [getsearch, SetSearch] = useState("");
  const [orderList, setOrderList] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    let config = {
      headers: {
        data: getsearch,
      },
    };

    function getOrderList() {
      axios
        .get("http://localhost:8070/order/getAll", config)
        .then((response) => {
          setOrderList(response.data);
          console.log("*******", response.data);

          orderList.map((rider) => {});
        })
        .catch((error) => {
          alert(error);
        });
    }

    getOrderList();
  }, [getsearch]);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Order Details Report", 20, 10);
    doc.autoTable({
      columns: [
        { header: "Customer ID", dataKey: "customerID" },
        { header: "Order ID", dataKey: "orderId" },
        { header: "Order Date", dataKey: "orderDate" },
        { header: "Phone Number", dataKey: "phone" },
        { header: "Potal Code", dataKey: "postal" },
        { header: "Total Price", dataKey: "total" },
      ],

      body: orderList,
    });

    doc.save("CustomerDetailsReport.pdf");
  };

  return !orderList.length ? (
    <CircularProgress />
  ) : (
    <div>
      <Row className="mb-4-sm">
        <Col sm={9} className="mb-4-sm"></Col>
        <Col sm={3} className="mb-4-sm">
          <Input
            className="form-control-sm"
            type="camel"
            value={getsearch}
            onChange={(e) => {
              console.log(e.target.value);
              SetSearch(e.target.value);
            }}
            placeholder="Search By Order ID"
            style={{ textAlign: "left" }}
          />
        </Col>{" "}
        <br />
        <div style={{ width: "100px" }}>
          <div style={{ marginLeft: "0px" }}>
            <Button
              style={{
                color: "black",
                background: "white",
                marginRight: "-10%",
                width: "300px",
              }}
              onClick={downloadPDF}
            >
              Download Report
            </Button>
          </div>
        </div>
        <div></div>
      </Row>

      <div>
        <br />

        <TableContainer>
          <Table className="table-rows-style" aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Order ID</StyledTableCell>
                <StyledTableCell>Order Date</StyledTableCell>
                <StyledTableCell>Order Request</StyledTableCell>
                <StyledTableCell>Deliverer</StyledTableCell>
                <StyledTableCell>Assign Deliverer</StyledTableCell>
                <StyledTableCell>Order Info</StyledTableCell>
                <StyledTableCell>Delete Order</StyledTableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
        <TableContainer style={{ height: "450px" }}>
          <Table className="table-rows-style" aria-label="simple table">
            {/*<TableHead  >*/}
            {/*    <TableRow >*/}
            {/*        <StyledTableCell>Order ID</StyledTableCell>*/}
            {/*        <StyledTableCell>Order Date</StyledTableCell>*/}
            {/*        <StyledTableCell>Order Request</StyledTableCell>*/}
            {/*        <StyledTableCell>Deliverer</StyledTableCell>*/}
            {/*        <StyledTableCell>Assign Deliverer</StyledTableCell>*/}
            {/*        <StyledTableCell>Order Info</StyledTableCell>*/}

            {/*    </TableRow>*/}
            {/*</TableHead>*/}
            <TableBody style={{ fontWeight: "bold" }}>
              {orderList
                .filter((orderList) => {
                  if (search == "") {
                    return orderList;
                  } else if (orderList.orderDate == search) {
                    return orderList;
                  }
                })
                .map((orderList) => (
                  <TableRow key={orderList._id}>
                    <TableCell
                      style={{
                        backgroundColor:
                          orderList.request == "-" ? "#d7c5c5" : "",
                        fontWeight: "bold",
                      }}
                    >
                      {orderList.orderId}
                    </TableCell>
                    <TableCell
                      style={{
                        backgroundColor:
                          orderList.request == "-" ? "#d7c5c5" : "",
                        fontWeight: "bold",
                      }}
                    >
                      {orderList.orderDate}
                    </TableCell>
                    <TableCell
                      style={{
                        backgroundColor:
                          orderList.request == "-" ? "#d7c5c5" : "",
                        fontWeight: "bold",
                        color: orderList.request == "Declined" ? "#f50a0a" : "",
                      }}
                    >
                      {orderList.request}
                    </TableCell>
                    <TableCell
                      style={{
                        backgroundColor:
                          orderList.request == "-" ? "#d7c5c5" : "",
                        fontWeight: "bold",
                      }}
                    >
                      <RiderRequest id={orderList._id} />
                    </TableCell>

                    <TableCell
                      style={{
                        backgroundColor:
                          orderList.request == "-" ? "#d7c5c5" : "",
                      }}
                    >
                      <Setrider id={orderList._id} state={orderList.request} />
                    </TableCell>
                    <TableCell
                      style={{
                        backgroundColor:
                          orderList.request == "-" ? "#d7c5c5" : "",
                      }}
                    >
                      <ViewOrder orderId={orderList._id} />
                    </TableCell>

                    <TableCell
                      style={{
                        backgroundColor:
                          orderList.request == "-" ? "#d7c5c5" : "",
                      }}
                    >
                      <DeleteOrder orderId={orderList._id} />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
