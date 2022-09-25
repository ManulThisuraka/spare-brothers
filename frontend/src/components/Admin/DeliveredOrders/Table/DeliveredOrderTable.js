import React, {useState, useEffect} from "react";
import axios from "axios";
import {withStyles, makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ViewOrder from "../../OrderManagement/OrderTable/ViewOrder";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import OrderReport from "../OrderReport";
import Setrider from "../../OrderManagement/OrderTable/Setrider";
import RiderRequest from "../../OrderManagement/OrderTable/RiderRequest";
import PdfReport from "../PdfReport";
import Charts from "../Charts";


const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#FA334E',
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
        color: theme.palette.common.white,
    },
}))(TableCell);


const useStyles = makeStyles({
    table: {
        minWidth: 650,
        backgroundColor: 'darkgray',
        color: '#ffffff',
    },
});


export default function DeliveredOrderTable() {

    const classes = useStyles();


    const [completeList, setCompleteList] = useState([]);
    const [search, setSearch] = useState("");
    const [searchData, setSearchData] = useState([]);

    useEffect(() => {


        function getCompleteList(userid) {
            axios.get(`http://localhost:8070/complete//all-orders`)
                .then((response) => {
                    setCompleteList(response.data)
                    console.log(response.data.data)
                })
                .catch((error) => {
                    alert(error)
                })
        }

        getCompleteList()
    }, [])

    return (
        <div>

            <div>

                <div className="row" style={{marginLeft: "20px"}}>


                    <div className="col" style={{marginLeft: "-70px"}}>
                        <Charts/>
                    </div>

                    <div className="col" style={{marginLeft: "300px"}}>
                        <lable style={{color: 'whitesmoke', paddingRight: "10px"}}>Search By Date</lable>
                        <TextField type='date' style={{backgroundColor: 'white',borderRadius:"6px"}}
                                   onChange={(event) => {
                                       setSearch(event.target.value)
                                   }}
                        />
                    </div>
                    <div className="col" style={{marginLeft: "-70px"}}>
                        <PdfReport reportData={search}/>
                    </div>


                </div>


                <br/><br/>
                <TableContainer >
                    <Table  className="table-rows-style" aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Order ID</StyledTableCell>
                                <StyledTableCell>Rider Name</StyledTableCell>
                                <StyledTableCell>Date Delivered</StyledTableCell>
                                <StyledTableCell>Time Released</StyledTableCell>
                                <StyledTableCell>Time Received</StyledTableCell>
                                <StyledTableCell>Order Info</StyledTableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                completeList.filter((completeList) => {
                                    if (search == "") {

                                        return completeList

                                    } else if (completeList.DeliveryDate == search) {

                                        return completeList
                                    }
                                }).map(completeList => (
                                    <TableRow  key={completeList._id}>
                                        <TableCell style={{fontWeight:"bold"}}>{completeList.orderId}</TableCell>
                                        <TableCell style={{fontWeight:"bold"}}>
                                            <RiderRequest
                                                id={completeList.orders}
                                            />


                                        </TableCell >
                                        <TableCell style={{fontWeight:"bold"}}>{completeList.DeliveryDate}</TableCell>
                                        <TableCell style={{fontWeight:"bold"}}>{completeList.TimeReleased}</TableCell>
                                        <TableCell style={{fontWeight:"bold"}}>{completeList.TimeReceived}</TableCell>
                                        <TableCell style={{fontWeight:"bold"}}><ViewOrder
                                            orderId={completeList.orders}
                                        /></TableCell>


                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

        </div>
    )
}