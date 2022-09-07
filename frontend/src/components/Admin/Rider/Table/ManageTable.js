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
import Form from "../AddForm/Form";
import DeleteRider from "./DeleteRider";
import UpdateRider from "./UpdateRider";
import RiderProfile from "../AddForm/RiderProfile";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#5E4FA2',
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



export default function ManageTable(){
    let count = 0;
    const classes = useStyles();


    const [riderList,setRiderList] = useState([]);

    useEffect(()=>{

        function getRiderList() {
            axios.get("http://localhost:8070/rider/getAllRiders")
                .then((response) => {
                    setRiderList(response.data.data)
                    console.log(response.data.data)
                })
                .catch((error) => {
                    alert(error)
                })

        }

        getRiderList()
    },[])




    return(
        <div style={{zIndex:"-99"}}>
            <Form/>
            <br/>
                <TableContainer  component={Paper} >
                    <Table className={classes.table} aria-label="simple table" >
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>ID</StyledTableCell>
                                <StyledTableCell>Rider Name</StyledTableCell>
                                <StyledTableCell>NIC</StyledTableCell>
                                <StyledTableCell>Phone</StyledTableCell>
                                <StyledTableCell>Vehicle Type</StyledTableCell>
                                <StyledTableCell>Vehicle Number</StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell>Action</StyledTableCell>
                                <StyledTableCell>Login Profile</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {
                                riderList.map(riderList=>(
                                    <TableRow key={riderList._id}>
                                        <TableCell>{count=count+1}</TableCell>
                                        <TableCell>{riderList.riderName}</TableCell>
                                        <TableCell>{riderList.riderNic}</TableCell>
                                        <TableCell>{riderList.riderPhone}</TableCell>
                                        <TableCell>{riderList.vehicleType}</TableCell>
                                        <TableCell>{riderList.vehicleNumber}</TableCell>
                                        <TableCell>  <DeleteRider riderID = {riderList._id}/></TableCell>
                                        <TableCell>
                                            <UpdateRider

                                            id = {riderList._id}
                                            riderName = {riderList.riderName}
                                            nic = {riderList.riderNic}
                                            phone = {riderList.riderPhone}
                                            type = {riderList.vehicleType}
                                            number = {riderList.vehicleNumber}
                                            email = {riderList.email}

                                            />
                                        </TableCell>
                                        <TableCell>
                                            <RiderProfile
                                                id = {riderList._id}
                                                email = {riderList.email}

                                            />

                                        </TableCell>

                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
        </div>
    )
}

