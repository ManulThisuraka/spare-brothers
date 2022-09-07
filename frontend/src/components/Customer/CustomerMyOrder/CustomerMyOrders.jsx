import React, { useState, useEffect } from "react";
import axios from "axios";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import MyOrderPDF from "./myorderPdf";

const buttonStyle = {
    color: "#fff",
    backgroundColor: "#FA334E",
    fontFamily: 'Poppins',
    fontWeight: 400,
    borderRadius: '6px',
    width: '200px',
    height: '50px',
    boxShadow: '0px 0px 3px #FA334E',
    textTransform: 'capitalize'
}

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


export default function CustomerMyOrders() {

    const classes = useStyles();

    const [ tabledata , SetTable] = useState([])
    const [userid , SetID] = useState("")

    useEffect(()=>{

        var userID = ""

            const access_token = localStorage.getItem('token')
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + access_token
                }
            }
            axios.get('http://localhost:8070/user/post', config).then((response) => {
                if (response.data.message) {
                    alert(response.data.message)
                } else {
                    userID= response.data.user._id
                    console.log(response.data.user._id)
                    SetID(response.data.user._id)
                    const userrr = {customerID:response.data.user._id}
                    axios.post("http://localhost:8070/order/myOrders",userrr).then((response)=>{
            
                        console.log("hellooo")
                        console.log(response.data)
                        SetTable(response.data)


                    }).catch((err)=>{
                        console.log(err)
                    })
                }
            }).catch()
      
    },[])

    return (
        <div className="container">
            <div style={{display:"flex", margin:"5% 0"}}>
                <div style={{flex:"3"}}>
                    <h4 style={{ color: "#fff", textAlign: "center" }}>My Orders</h4>
                </div>
                <div >
                    <MyOrderPDF
                    id = {userid}
                    />
                </div>
            </div>
            <div >
            <div>

                    <Table className="table-rows-style"  aria-label="simple table" style={{ width: 1200 }} component={Paper} >
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Order ID</StyledTableCell>
                                <StyledTableCell>Order Items</StyledTableCell>
                                <StyledTableCell>Total</StyledTableCell>
                                <StyledTableCell>Order Date</StyledTableCell>
                                <StyledTableCell>Order State</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                        {tabledata.map((item,Key)=>(
                            <TableRow>
                            <TableCell>{item["orderId"]}</TableCell>
                            <TableCell>
                                    {item["itemname"].map((e)=>(
                                        <div><TableCell>{e}</TableCell></div>
                                    ))}
                            </TableCell>
                            <TableCell>{item["total"]}</TableCell>
                            <TableCell>{item["orderDate"]}</TableCell>
                            <TableCell>{item["request"]}</TableCell>
                        </TableRow>
                        ))}
                            

                        </TableBody>
                    </Table>
            
                </div>
            </div>
        </div>
    )
}

