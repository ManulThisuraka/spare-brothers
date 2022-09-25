import React from 'react';
import Styles from './adminStyles'
import {Card,CardActions,CardContent,CardMedia,Button,Typography, Divider,Tooltip } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import DeleteIcon from '@material-ui/icons/Delete'
import {useDispatch}  from 'react-redux';
import {deleteproduct} from '../../../../actions/productAction'



import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide'


/*
product:"",
price:"",
category:"",
availableQty:"",
minimumQty:"",
mesuringUnit:"",
selectedfile:""*/


//EventDispatch(deleteproduct(post._id),window.location.reload(false))

const ProductCard = ({post,setCurrentId})=>{
    const classes = Styles();
    const EventDispatch = useDispatch();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };



    return(
      <div style={{margin:'0 2%'}} >
        <Card className={classes.card}>

            <CardMedia className={classes.media}  image ={post.selectedfile} title={post.product} />

            <div className={classes.overlay}>
                
                <Typography style={{fontSize:'25'}} >Item Name:{post.product}</Typography>
                <Typography style={{fontSize:'25'}}>Amount Rs:{post.price}</Typography>
                <Typography style={{fontSize:'25'}}>For 1{post.mesuringUnit}</Typography>
                


            </div>
            <div className={classes.overlay2}>
            
                <Button style={{color:'white'}} size='small' onClick={()=>setCurrentId(post._id)}>
                    <MoreHorizIcon fontSize = "default" />


                </Button>

            </div>


            <CardContent>
            <Typography style={{fontSize:'14'}} color="textPrimary">Spare Part :{post.category}</Typography>
            <Typography style={{fontSize:'14'}} color="textPrimary">Available Quantity :{post.availableQty}</Typography>
            <Typography style={{fontSize:'14'}}color="textPrimary">Minimum Quantity :{post.minimumQty}</Typography>
            
            
            </CardContent>

            <CardActions className= {classes.cardActions}> 
                
                <div size ="small" onClick={handleClickOpen} style={{
                    color:'white',
                    background:'red',
                    position: 'absolute',
                    bottom: '5px',
                    right: '10px',
                    height: '35px',
                    width: "35px",
                    cursor: "pointer",
                    borderRadius:"4px",
                    boxShadow:"0px 0px 6px rgba(0,0,0,0.5)",
                    backgroundColor: '#FA334E'
                }}>
                  <Tooltip title="Click delete button">
                <DeleteIcon fontSize = "default" style={{position:"absolute", top:"18%", left:"18%"}} />
                </Tooltip>
                {handleClickOpen}

                    
                </div>


                <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Do you want to delete this item?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <Typography variant="h6">Item Name :{post.product}</Typography>
                <Typography variant="h6">Amount Rs :{post.price}</Typography>
                <Typography variant="h6">For 1{post.mesuringUnit}</Typography>   
          <Typography variant="h6" color="textPrimary">Spare Part :{post.category}</Typography>
            <Typography variant="h6" color="textPrimary">Available Quantity :{post.availableQty}</Typography>
            <Typography variant="h6" color="textPrimary">Minimum Quantity :{post.minimumQty}</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Tooltip title="Click if you do not want to delete">
          <Button onClick={handleClose} style={{color:'white',background:'red'}} autoFocus>
            No
          </Button>
          </Tooltip>
          <Tooltip title="Click if you want to delete">
          <Button onClick={()=>EventDispatch(deleteproduct(post._id),window.location.reload(false))} style={{color:'white',background:'blue'}} >
            Yes
          </Button>
          </Tooltip>
        </DialogActions>
      </Dialog>

                
            </CardActions>



        </Card>

        </div>
    )
}

export default ProductCard;