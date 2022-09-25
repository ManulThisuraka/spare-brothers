import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {InputLabel, MenuItem, Select} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import {makeStyles} from "@material-ui/core/styles";
import React, {useRef, useState} from "react";
import axios from "axios";
import { UilSearch } from '@iconscout/react-unicons'


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const buttonStyle = {
    color: "#fff",
    backgroundColor: "#FA334E",
    fontFamily: 'Poppins',
    fontWeight: 400,
    borderRadius: '6px',
    width: '100px',
    boxShadow: '0px 0px 3px #FA334E',
    textTransform: 'capitalize'
}

export default function WishlistProductAdd(props){

    const id = props.id;

    const classes = useStyles();
    const [type, setType] = useState('');
    const [products, setProducts] = useState([]);
    const [wishlist, setWishlist] = useState({
        wishlistProducts: []
    });

    const handleChange = (event) => {
        setType(event.target.value);
    };

    const addToWishlist = (event)=>{
        const {name, value} = event.target;
        setWishlist(prevValue=> ({
            ...prevValue,
            [name] : value
            })
        );
    };

    function sendDetails(){
        axios.put(`http://localhost:8070/wishlist/${id}/add`,wishlist).then(()=>{
            window.location.reload();
        }).catch((err)=>{
            console.log(err)
        });
    }

    function getCategory(){
        axios.get(`http://localhost:8070/product/anitem/${type}`).then((products)=>{
            setProducts(products.data.category);

        });
    }


    return(
        <div className="wishlist-form" style={{height:"fit-content", marginTop:"0"}}>
            <h4 style={{fontSize:"35px"}}>Collect new products</h4>

            <div className="wishlist-text" style={{display:"flex"}}>
                <div style={{flex:"15"}}>

                    <InputLabel id="demo-simple-select-label" style={{textAlign:"left"}}>Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={type}
                            onChange={handleChange}
                            fullWidth
                            style={{textAlign:"left"}}
                        >
                            <MenuItem value={"Vegetables"} >Vegetables</MenuItem>
                            <MenuItem value={"Meat"}>Meat</MenuItem>
                            <MenuItem value={"Seafood"}>SeaFoods</MenuItem>
                            <MenuItem value={"Grocery"}>Grocery</MenuItem>
                            <MenuItem value={"Detergent"}>Detergent</MenuItem>
                        </Select>

                </div>

                <div style={{flex:"1"}}>

                </div>

                <div style={{flex:"2"}}>
                    <div style={{backgroundColor:"#FA334E", color:"#fff", width:"45px", height:"45px", borderRadius:"9px", cursor:"pointer" }} onClick={getCategory}><UilSearch size="28" style={{position:"relative", top:"20%", right:"3%"}} /></div>
                </div>

            </div>
            <div className="wishlist-text">
                <InputLabel id="demo-simple-select-label" style={{textAlign:"left"}}>Products</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={wishlist.wishlistProducts}
                    onChange={addToWishlist}
                    fullWidth
                    name="wishlistProducts"
                    style={{textAlign:"left"}}
                    multiple
                >
                    {products && !!products.length && products.map((item)=>{

                        return(
                            <MenuItem value={item}>{item.product}</MenuItem>
                        )


                    })}

                </Select>
            </div>

            <div className="wishlist-button">
                <Button onClick={sendDetails} style={buttonStyle}>Collect</Button>
            </div>
        </div>
    );
}