import React,{useState,useEffect} from 'react';
import {Container,AppBar,Typography,Grow,Grid,TextField} from '@material-ui/core';

import EventPosts from './products/unregistercutomerProducts';

import Styles from './styles';
import {useDispatch} from 'react-redux';
import {getProduct,searchproduct} from '../../actions/productAction'
import NavBar from '../HomePage/NavBar/NavBar'
import ProductNavigation from './SideNavigations/unregistercustomerNavigation'
import axios from "axios";
import productPage from '../../images/girl.png'


const UnRegisterShoppingProducts =() =>{

       
    const [currentId,setCurrentId] = useState(null);
    const [searchTerm, setSearchTerm] = useState(null);

    const classes = Styles();
    const dispatch =useDispatch();
    useEffect(()=>{

        if(searchTerm){
            dispatch(searchproduct(searchTerm));   
        }
        else{
        dispatch(getProduct());  
        }

        console.log(searchTerm)

    },[currentId,searchTerm,dispatch]);

   

    return (
        
        <div>

            <Container maxwidth ='lg' style={{zIndex:"-99"}}>


                <ProductNavigation />
                <div style={{marginLeft:'200px'}}>

                    <AppBar className ={classes.appBar} position ="static" >
                        <Typography className={classes.heading} variant ="h2" align = "center"> Buy Products From Us</Typography>
                    </AppBar>
                <Grow in>


                    <Container >
                        <div style={{marginLeft:"900px"}}>
                        <TextField  style={{color:'white',background:'white',marginRight:"-10%",width:'200px'}}
                    id="outlined-basic"
                    label="Search"
                    variant="outlined"
                    value={searchTerm}
                    size = "small"
                    onChange={(e) => { setSearchTerm(e.target.value) }}

                />

                            </div >

                        <Grid container justify ="space-between" alignItems="stretch" spacing ={3}>

                                <Grid item xs ={12} sm ={7} style = {{width:"fit-content"}}>
                                    <EventPosts setCurrentId ={setCurrentId}   />
                                </Grid >
                        </Grid>
                    </Container>

                </Grow>

                </div>
            
            </Container>
            <img src={productPage} className="product-background"/>
           </div>  
           
    );
}

export default UnRegisterShoppingProducts;