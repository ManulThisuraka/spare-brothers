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
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ViewOrder from "../../../Admin/OrderManagement/OrderTable/ViewOrder";


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


export default function MyDeleveredTable() {

    const classes = useStyles();


    const [completeList, setCompleteList] = useState([]);
    const [id, setId] = useState();

    useEffect(() => {


        const access_token = localStorage.getItem('token')
        console.log(access_token)
        let config = {
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        }
        axios.get('http://localhost:8070/user/post',
            config)
            .then((response) => {
                if (response.data.message) {
                    alert(response.data.message)
                } else {

                    getMyCompleteList(response.data.user.riders)
                    setId(response.data.user.riders)

                }

            })
            .catch()


        function getMyCompleteList(userid) {
            axios.get(`http://localhost:8070/complete//all-orders/${userid}`)
                .then((response) => {
                    setCompleteList(response.data)
                    console.log(response.data.data)
                })
                .catch((error) => {
                    alert(error)
                })
        }
    }, [])

    return (
        <div>
            <div>
                <TableContainer>
                    <Table className="table-rows-style" aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell style={{fontWeight: "bold"}}>Order ID</StyledTableCell>
                                <StyledTableCell style={{fontWeight: "bold"}}>Delivery Date</StyledTableCell>
                                <StyledTableCell style={{fontWeight: "bold"}}>Time Released</StyledTableCell>
                                <StyledTableCell style={{fontWeight: "bold"}}>Time Received</StyledTableCell>
                                <StyledTableCell style={{fontWeight: "bold"}}>Order Info</StyledTableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                completeList.map(completeList => (
                                    <TableRow key={completeList._id}>
                                        <TableCell style={{fontWeight: "bold"}}>{completeList.orderId}</TableCell>
                                        <TableCell style={{fontWeight: "bold"}}>{completeList.DeliveryDate}</TableCell>
                                        <TableCell style={{fontWeight: "bold"}}>{completeList.TimeReleased}</TableCell>
                                        <TableCell style={{fontWeight: "bold"}}>{completeList.TimeReceived}</TableCell>
                                        <TableCell style={{fontWeight: "bold"}}><ViewOrder/></TableCell>


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