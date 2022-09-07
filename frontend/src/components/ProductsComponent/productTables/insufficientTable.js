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
import{useSelector} from 'react-redux';
import {Grid,CircularProgress} from '@material-ui/core'
import {Button} from '@material-ui/core';

import jsPDF from 'jspdf'
import 'jspdf-autotable'

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#5E4FA2',
        color: theme.palette.common.white,
        fontSize:20,
    },
    body: {
        fontSize:14,
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









export default function InsufficientProductTable(){
    let count = 0;
    const classes = useStyles();
     const eventposts = useSelector((state)=>state.ProductReducer) 

     console.log(eventposts);


     const downloadPDF =()=>{
        const doc = new jsPDF();
        doc.text("Insufficient Products",20,10);
        doc.autoTable({
            columns:[
                {header :'Product',dataKey:'product'},
                {header :'Available Quantity',dataKey:'availableQty'},
                {header :'Minimum Quantity',dataKey:'minimumQty'},
                {header :'Mesuring Unit',dataKey:'mesuringUnit'},
                {header :'Price',dataKey:'price'}
    
            ],
    
            body:eventposts
    
        })

        doc.save("insufficientProducts.pdf")
    }

    return(
        !eventposts.length ? <CircularProgress /> : (

            

        <div style={{width:'500px'}}>

<div style={{marginLeft:"900px"}}>
                        <Button  style={{color:'green',background:'white',marginRight:"-10%",width:'300px'}} onClick={downloadPDF}>

                                Download list

                            </Button>

                            </div>
           
            <br/>
                <TableContainer  component={Paper} style={{width:'1200px'}}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                
                                <StyledTableCell >Product</StyledTableCell>
                                <StyledTableCell >Available Quantity</StyledTableCell>
                                <StyledTableCell >Minimum Quantity</StyledTableCell>
                                <StyledTableCell >Measuring Unit</StyledTableCell>
                                <StyledTableCell >Price</StyledTableCell>
                                
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                    eventposts.map((post)=>(
                                    <TableRow >
                                        <TableCell style={{fontSize:'80'}}>{post.product}</TableCell>
                                        <TableCell>{post.availableQty}</TableCell>
                                        <TableCell>{post.minimumQty}</TableCell>
                                        <TableCell>{post.mesuringUnit}</TableCell>
                                        <TableCell>{post.price}</TableCell>
                                        
                                    

                                    </TableRow>
                    ))}

                            
                        </TableBody>
                    </Table>
                </TableContainer>
        </div>
       )   )
}
