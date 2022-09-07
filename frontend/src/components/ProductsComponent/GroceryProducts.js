import React,{useState,useEffect} from 'react';
import {Container,AppBar,Typography,Grow,Grid,TextField} from '@material-ui/core';

import EventPosts from '../ProductsComponent/products/customerAlllProducts';

import Styles from './styles';
import {useDispatch} from 'react-redux';
import {getProductCategory,searchproduct,getProduct} from '../../actions/productAction'
import NavBar from '../HomePage/NavBar/NavBar'
import ProductNavigation from './SideNavigations/customerNavigation'
import axios from "axios";
import WishlistBackground from "../../images/wishlistBackground.png";
import productPage from '../../images/girl.png'
import { useLocation } from "react-router-dom";

const CategoryProduct =() =>{

    const [currentId,setCurrentId] = useState(null);
    const [searchTerm, setSearchTerm] = useState(null);

    const classes = Styles();
    const dispatch =useDispatch();
    const location = useLocation();
    //const productcategory = location.state.catagorName

    //console.log(productcategory)

    useEffect(()=>{

        if(searchTerm){
            dispatch(searchproduct(searchTerm));   
        }
        else{
        dispatch(getProductCategory('Bicycle Equipments'));  
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

export default CategoryProduct;