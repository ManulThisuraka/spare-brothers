import {UilSearch} from "@iconscout/react-unicons";
import { UilImport } from '@iconscout/react-unicons';
import { UilPlus } from '@iconscout/react-unicons';
import ItemCard from "../../Cart/ItemSection/ItemListSub/ItemCard";
import tomato from "../../../images/tomato.png";
import {Dialog, DialogContent, DialogTitle} from "@material-ui/core";
import DialogContentText from "@material-ui/core/DialogContentText";
import {useEffect, useState} from "react";
import WishlistForm from "../WishlistFormPage/WishlistForm";
import WishlistProductAdd from "./WishlistProductAdd";
import axios from "axios";
import {useParams} from "react-router-dom/cjs/react-router-dom";
import SearchIcon from "../../Cart/PriceSection/SearchIcon";
import {useHistory} from "react-router-dom";

export default function WishlistProductSection(){

    const [open, setOpen] = useState(false);

    const [detals, setDetails] = useState([]);
    const [product, setProduct] = useState([]);
    const [searchTerm, setSerachTerm] = useState();
    const [productCount,setProductCount] = useState();

    console.log(searchTerm);

    const {id} = useParams();

    useEffect(()=>{
       axios.get(`http://localhost:8070/wishlist/${id}`).then((res)=>{
           setDetails(res.data);
           setProduct(res.data.wishlistProducts)
       })
    },[detals,product]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const history = useHistory();

    function sendData(){
        history.push("/wishlist-report",product);
    }

    return(
        <div className="container">
            <div className="wishlist-title-section">
                <div className="wishlist-title">
                    {detals.wishlistName}
                </div>
                <div className="wishlist-button" >
                    <SearchIcon buttonPressed = {searchTerm => setSerachTerm(searchTerm)}/>
                </div>
                <div className="wishlist-button">
                    <div className="red-square" style={{position:"relative", left:"25%"}} onClick={sendData}>
                        <UilImport size={22} style={{position:"relative", right:"10%", top:"4%"}} />
                    </div>
                </div>
                <div className="wishlist-button">
                    <div className="red-square" onClick={handleClickOpen}>
                        <UilPlus size={23} style={{position:"relative", right:"8%", top:"5%"}} />
                    </div>
                </div>
            </div>
            <div className="wishlist-item-section">

                {product.filter(item=>{
                    if(searchTerm==""|| searchTerm== null){
                        return item;
                    }else if(item.product== searchTerm || String(item.product).toLowerCase()== searchTerm){
                        return item
                    }
                }).map((item)=>{
                    return(
                        <ItemCard
                            name = {item.product}
                            category = {item.category}
                            price = {item.price}
                            image = {item.selectedfile}
                            productCount = {productCount => setProductCount(productCount)}
                            deleteProduct = {()=>{
                                axios.delete(`http://localhost:8070/wishlist/${id}/delete/${item._id}`).then((product)=>{
                                    console.log("Product deleted");
                                    window.location.reload();
                                }).catch((err)=>{
                                    console.log(err);
                                })
                            }}
                        />
                    );
                })}

                    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title"  PaperProps={{
                        style: {backgroundColor: "#50587F", height:"fit-content", borderRadius:"11px"},
                    }}>
                        <DialogContent>
                            <DialogContentText>
                                <WishlistProductAdd id={id} />
                            </DialogContentText>
                        </DialogContent>
                    </Dialog>


            </div>
        </div>
    );
}