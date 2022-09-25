
import React , {useState,useEffect} from "react";
import axios from "axios";
import { withStyles,makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import RiderBackground from "../../../images/riderBackfround.png";
import {useLocation} from "react-router-dom";
import Button from "@material-ui/core/Button";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";



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



const useStyles = makeStyles({
    table: {
        minWidth: 650,
        backgroundColor: 'white',
        fontWeight:"600 !important"
    },
});

function downloadReport(){
    const doc = new jsPDF()
    autoTable(doc, { html: '#report-table' })
    doc.save('table.pdf')
}



export default function WishListTable(props){

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
    },[]);

    const location = useLocation();
    const product = location.state;

    console.log(product)

    let count = 0;

    return(
        <div >
            <div className="container" style={{marginTop:"5%"}}>
                <div className="wishlist-title" style={{marginBottom:"5%"}}>
                    <Button onClick={downloadReport} style={buttonStyle}> Generate report </Button>
                </div>
                <TableContainer >
                    <Table aria-label="simple table" className="table-rows-style" id="report-table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Item ID</StyledTableCell>
                                <StyledTableCell>Product Name</StyledTableCell>
                                <StyledTableCell>Product Category</StyledTableCell>
                                <StyledTableCell>Price</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {product.map(item=>{
                                count++;
                                return(
                                    <TableRow>
                                        <TableCell style={{backgroundColor:riderList.request=='pending'? '#d7c5c5': ''}}>ITEM{count}</TableCell>
                                        <TableCell>{item.product}</TableCell>
                                        <TableCell>{item.category}</TableCell>
                                        <TableCell>{item.price}</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <img src={RiderBackground} className="cart-background-right"/>
        </div>
    )
}