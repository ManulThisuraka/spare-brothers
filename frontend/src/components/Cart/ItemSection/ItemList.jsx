import ItemCard from "./ItemListSub/ItemCard";
import Button from '@material-ui/core/Button';
import {useEffect, useState} from "react";
import axios from "axios";
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

export default function ItemList(props){

    const [products, setProducts] = useState([]);
    const [productCount,setProductCount] = useState();



    const searchTerm = props.searchTerm;

    function deleteAll(){
        axios.delete("http://localhost:8070/cart/").then(()=>{
            alert("Deleted successfully.")
        })
    }

    useEffect(() => {
        axios.get('http://localhost:8070/cart/').then((res) => {
            setProducts(res.data);
        });

        props.itemCount(productCount);
        
    },[]); // delete correction

    function deleteProduct(productId) {
        axios.delete(`http://localhost:8070/cart/${productId}`).then((product)=>{
            console.log("Product deleted");
        }).catch((err)=>{
            console.log(err);
        })
    }

    return(
        <div>
            <div className="row top-section">
                <div className="col-lg-8">
                    <span className="items-title">Buy your chosen products.</span>
                </div>
                <div className="col-lg-4">
                    <Button style={buttonStyle} onClick={deleteAll}>Clear All</Button>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <div className="item-list">
                        {products.filter((product)=>{
                            if(searchTerm==""|| searchTerm==null){
                                return product;
                            } else if(product.name == searchTerm || String(product.name).toLowerCase() == searchTerm){
                                return product;
                            }
                        }).map((product)=>{
                            return(
                                    <ItemCard
                                        id = {product._id}
                                        name = {product.name}
                                        category = {product.category}
                                        price = {product.price}
                                        image = {product.image}
                                        productCount = {productCount => setProductCount(productCount)}
                                        deleteProduct = {()=>{
                                            axios.delete(`http://localhost:8070/cart/${product._id}`).then((product)=>{
                                                console.log("Product deleted");
                                            }).catch((err)=>{
                                                console.log(err);
                                            })
                                        }}
                                    />

                            );
                        })}
                    </div>
                </div>
            </div>

        </div>
    )
}