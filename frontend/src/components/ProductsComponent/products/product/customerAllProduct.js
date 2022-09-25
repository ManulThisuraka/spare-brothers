import React from 'react';
import Styles from './style'
import {Card,CardActions,CardContent,CardMedia,Button,Typography } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import AddShoppingcartIcon from '@material-ui/icons/AddShoppingCart'
import {useDispatch}  from 'react-redux';
import {deleteproduct} from '../../../../actions/productAction'
import AddWhsihlist from '@material-ui/icons/FavoriteSharp'
import {createCart} from '../../../../actions/cartAction'

/*
product:"",
price:"",
category:"",
availableQty:"",
minimumQty:"",
mesuringUnit:"",
selectedfile:""*/


const ProductCard = ({post,setCurrentId})=>{
    const classes = Styles();
    const EventDispatch = useDispatch();
    return(

        <div style={{margin:'0 15%'}} >
        <Card className={classes.card}>

            <CardMedia className={classes.media}  image ={post.selectedfile} title={post.product} />

            <div className={classes.overlay}>
                
                <Typography style={{fontSize:'25'}}>Item Name :{post.product}</Typography>
                <Typography style={{fontSize:'25'}}>Amount Rs :{post.price} </Typography>
                <Typography style={{fontSize:'25'}}>For 1{post.mesuringUnit}</Typography>
                


            </div>
            <div className={classes.overlay2}>
            
                <Button style={{color:'Red'}} size='small' >
                    <AddWhsihlist fontSize = "default" />


                </Button>

            </div>


            <CardContent>
            <Typography style={{fontSize:'25'}} color="textPrimary">Spare Parts :{post.category}</Typography>
            <Typography style={{fontSize:'25'}} color="textPrimary">Available Quantity :{post.availableQty} </Typography>
            

            <Typography style={{fontSize:'25', color:"green"}} >Status :{post.status}</Typography>
            
            
            </CardContent>

            <CardActions className= {classes.cardActions}>

                
                <div size ="small" style={{color:'white',
                    background:'red',
                    position: 'absolute',
                    bottom: '5px',
                    right: '10px',
                    height: '50px',
                    width: "50px",
                    cursor: "pointer",
                    borderRadius:"11px",
                    boxShadow:"0px 0px 6px rgba(0,0,0,0.5)",
                backgroundColor: '#FA334E'}}
                
                onClick={() => {



                    const products = {
                        productID:post._id,
                        name :post.product,
                         price:post.price,
                         category:post.category,
                        status:post.status,
                        image: post.selectedfile,
                        measuringUnit:post.mesuringUnit,
                        availableQuantity:post.availableQty,
                        minimumQuantity:post.minimumQty
                        
                    }


                    EventDispatch(createCart(products));
                    console.log(products);


                }}
                
                
                >
                <AddShoppingcartIcon style={{position:"absolute", top:"30%", left:"25%"}} />
                    
               

                    
                </div>

            </CardActions>



        </Card>

        </div>
    )
}

export default ProductCard;