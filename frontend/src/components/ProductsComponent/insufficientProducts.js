import React,{useState,useEffect} from 'react';
import {Container,AppBar,Typography,Grow,Grid,TextField,Button} from '@material-ui/core';
import InsufficientProductTable from './productTables/insufficientTable'
import Styles from './styles';
import {useDispatch,useSelector} from 'react-redux';
import NavBar from '../HomePage/NavBar/NavBar'
import AdminNavbar from "../Admin/AdminNavigation"
import ProductNavigation from './SideNavigations/customerNavigation'
import axios from "axios";
import {getInsuffProduct} from '../../actions/productAction'
import jsPDF from 'jspdf'




const Inssufficient =() =>{

    const classes = Styles();
    const dispatch = useDispatch();
    

    useEffect(()=>{
        dispatch(getInsuffProduct());
        

    },[dispatch]);

    
  


    return (
        
        <div>


            <Container maxwidth ='lg' style={{zIndex:"-99"}}>
           
                <AdminNavbar style={{zIndex:"-99"}} />



                <AdminNavbar />

                <div style={{marginLeft:'100px'}}>

                    <AppBar className ={classes.appBar} position ="static" >
                        <Typography className={classes.heading} variant ="h2" align = "center"> Insufficient Products </Typography>
                    </AppBar>
                <Grow in>


                    <Container >
                        

                        <Grid container justify ="space-between" alignItems="stretch" spacing ={3} >

                                <Grid item xs ={12} sm ={7} style = {{width:"500px"}}>
                                    <InsufficientProductTable />
                                </Grid >
                        </Grid>
                    </Container>

                </Grow>

                </div>
            </Container>
            </div>
            
           

            
           
    );
}

export default Inssufficient;