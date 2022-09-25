import Setrider from "./Setrider";
import ViewOrder from "./ViewOrder";
import React , {useState,useEffect} from "react";
import axios from "axios";
import { withStyles,makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import RiderRequest from "./RiderRequest";
import notificationCount from "./NotificationCount";
import NotificationCount from "./NotificationCount";
import {TextField} from "@material-ui/core";


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
        color:'#ffffff',
    },
});



export default function OrderTable(){

    const classes = useStyles()


    const [orderList,setOrderList] = useState([]);
    const [search, setSearch] = useState("");
    useEffect(()=>{

        function getOrderList() {
            axios.get("http://localhost:8070/order/getAll")
                .then((response) => {
                    setOrderList(response.data)
                    console.log()

                    orderList.map(rider=>{

                    })
                })
                .catch((error) => {
                    alert(error)
                })

        }

        getOrderList()
    },[])

    return(
        <div>

            <div className="col" style={{marginLeft: "820px"}}>
                <lable style={{color: 'whitesmoke', paddingRight: "10px"}}>Search By Date</lable>
                <TextField type='date' style={{backgroundColor: 'white',borderRadius:"6px"}}
                           onChange={(event) => {
                               setSearch(event.target.value)
                           }}
                />
            </div>

            <div>
                <br/>

                <TableContainer>
                <Table  className="table-rows-style" aria-label="simple table">

                    <TableHead  >
                        <TableRow >
                            <StyledTableCell>Order ID</StyledTableCell>
                            <StyledTableCell>Order Date</StyledTableCell>
                            <StyledTableCell>Order Request</StyledTableCell>
                            <StyledTableCell>Deliverer</StyledTableCell>
                            <StyledTableCell>Assign Deliverer</StyledTableCell>
                            <StyledTableCell>Order Info</StyledTableCell>

                        </TableRow>
                    </TableHead>

                </Table>

                </TableContainer>
                <TableContainer  style={{height:"450px"}} >


                    <Table   className="table-rows-style" aria-label="simple table">
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
                        <TableBody style={{fontWeight:"bold"}}>
                            {
                                orderList.filter((orderList)=>{

                                    if (search == "") {

                                        return orderList

                                    } else if (orderList.orderDate == search) {

                                        return orderList
                                    }

                                }).map(orderList=>(


                                    <TableRow key={orderList._id}>


                                        <TableCell style={{backgroundColor:orderList.request=='-'? '#d7c5c5': '',fontWeight:"bold"}}>{orderList.orderId}</TableCell>


                                        <TableCell style={{backgroundColor:orderList.request=='-'? '#d7c5c5': '',fontWeight:"bold"}}>{orderList.orderDate}</TableCell>
                                        <TableCell style={{backgroundColor:orderList.request=='-'? '#d7c5c5': '',fontWeight:"bold" ,color:orderList.request=='Declined'? '#f50a0a': ''}} >{orderList.request}</TableCell>
                                        <TableCell style={{backgroundColor:orderList.request=='-'? '#d7c5c5': '',fontWeight:"bold"}}>
                                            <RiderRequest
                                                id={orderList._id}
                                            />

                                            </TableCell>

                                        <TableCell style={{backgroundColor:orderList.request=='-'? '#d7c5c5': ''}}>
                                            <Setrider
                                                id={orderList._id}
                                                state={orderList.request}

                                            /></TableCell>
                                        <TableCell style={{backgroundColor:orderList.request=='-'? '#d7c5c5': ''}}>
                                            <ViewOrder

                                                orderId={orderList._id}

                                            />

                                        </TableCell>

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