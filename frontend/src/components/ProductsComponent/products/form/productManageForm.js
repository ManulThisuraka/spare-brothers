import React, { useEffect, useState } from  'react';
import Styles from './styles';
import {TextField,Button,Typography,Paper, FormHelperText, Tooltip} from '@material-ui/core';
import FileBase from 'react-file-base64';
import {useDispatch,useSelector} from 'react-redux';
import {postProduct,patchProduct} from '../../../../actions/productAction'
import axios from "axios";

 
const ProductForm = ({currentId})=>{
    const classes = Styles();
    const dispatch = useDispatch();

    const [helperText, setHelperText] = useState('');
    const [productData,setProductdata] = useState({

        product:"",
        price:"",
        category:"",
        availableQty:"",
        minimumQty:"",
        mesuringUnit:"",
        selectedfile:""

    })


    
const product = useSelector((state)=>currentId ? state.ProductReducer.find((p)=>p._id == currentId ):null)


useEffect(()=>{
    if(product) setProductdata(product);
},[product])

const handleSubmit = (e) =>{

    e.preventDefault();

    if(productData.product=="" && productData.price == "" && productData.category == "" && productData.availableQty == "" && productData.minimumQty == "" && productData.mesuringUnit=="" ){
        setHelperText('All Fields are required!!')
    }

   else if(productData.product == ""){
    setHelperText('Enter Item Name')

   }

   else if(productData.price == ""){
    setHelperText('Enter Item price')

   }

   else if(productData.availableQty == ""){
    setHelperText('Enter Item available Quantity')

   }

   else if(productData.minimumQty == ""){
    setHelperText('Enter Item minimum Quantity')

   }

    else if(currentId){
        dispatch(patchProduct(currentId,productData),window.location.reload(false))
        clear();
    }
    else {
        dispatch(postProduct(productData),window.location.reload(false));
        clear();
    }
    
}

const clear=()=>{
    currentId= null;
    setProductdata({
        product:"",
        price:"",
        category:"",
        availableQty:"",
        minimumQty:"",
        mesuringUnit:"",
        selectedfile:""

    })


}

return(
      
    <Paper className={classes.paper}>
        
    <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
    <Typography variant="h6">{currentId ? 'Edit' :'Add'} Item </Typography>
    <Tooltip title="Enter item name">
        <TextField name ='product' 
        variant="outlined"
        label="Item Name"
        fullWidth
        value={productData.product}
        onChange={(e) =>setProductdata({...productData, product : e.target.value })}
        />
    </Tooltip>

    <Tooltip title="Enter Amount">
        <TextField name ='price' 
        variant="outlined"
        label="Amount"
        type='number'
        fullWidth
        value={productData.price}
        onChange={(e) =>{
            setHelperText(' ');
            setProductdata({...productData, price : e.target.value })
    
    }}
        />
        </Tooltip>

        <Tooltip title="Available Quantity">
        <TextField name ='availableQty' 
        variant="outlined"
        label="Available Quantity"
        type = "number"
        fullWidth
        value={productData.availableQty}
        onChange={(e) =>{
            setHelperText(' ');
            setProductdata({...productData, availableQty : e.target.value})}}
        />
        </Tooltip>

        <Tooltip title="Minimum Quantity">
        { <TextField name ='minimumQty' 
        variant="outlined"
        label= "Minimum Quantity"
        type="number"
        fullWidth
        value={productData.minimumQty}
        onChange={(e) =>{
            setHelperText(' ');
            setProductdata({...productData, minimumQty : e.target.value })}
        
    }
        /> }
        </Tooltip>

        <Tooltip title="Choose relevant category">
<select 

name ='category'

variant="outlined"
label="Spare Parts"
fullWidth
value={productData.category}
onChange={(e) =>{
    setHelperText(' ');
    setProductdata({...productData, category : e.target.value })

}}

>
 <option selected>Select from spare parts</option>
<option value="Bicycle Equipments">Bicycle Equipments</option>
<option value="Motor Bike Parts">Motor Bike Parts</option>
<option value="Vehicle Oils">Vehicle Oils</option>
<option value="Vehicle Body">Vehicle Body</option>

</select>
</Tooltip>

<Tooltip title="Choose relevant measuring unit">
<select 

name ='mesuringUnit'

variant="outlined"
label="Mesuring unit"
fullWidth
value={productData.mesuringUnit}
onChange={(e) =>setProductdata({...productData, mesuringUnit : e.target.value })}

>
 <option selected>Select measuring unit</option>
<option value="pieces">Pieces</option>
<option value="l">liters</option>
<option value="packets">Packets</option>
<option value="bottle">Bottles</option>
<option value="g">Gram</option>

</select>
</Tooltip>


        <div className={classes.fileInput}>
            <FileBase
            
            type ="file"
            multiple ={false}
            onDone ={({base64})=>setProductdata({...productData,selectedfile:base64})}
            
            />

<div>
<FormHelperText style={{color: "red"}}>{helperText}</FormHelperText>
</div>

            <Button className={classes.buttonSubmit} variant="contained" type="submit" color="primary" size ="large" fullWidth>
              SUBMIT  </Button>

              <Button variant="contained" color="secondary" size ="small"  onClick ={clear} fullWidth>
              Clear Item </Button>
        
        </div>
        
    </form>
   
</Paper>


)

   
}

export default ProductForm;
