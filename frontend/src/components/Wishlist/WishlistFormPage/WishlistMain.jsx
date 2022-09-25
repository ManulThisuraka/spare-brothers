import WishlistCard from "./WishlistCard";
import WishlistForm from "./WishlistForm";
import {useEffect, useState} from "react";
import axios from "axios";
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

export default function WishlistMain(){

    const [list, setList] = useState([]);

    const [product, setProduct] = useState({});

    useEffect(()=>{
        axios.get('http://localhost:8070/wishlist/').then(res=>{
            setList(res.data);
        });

    },[]);

    return(
        <div>
            <div className="row">
                <div className="col-lg-6" data-aos="fade-right" data-aos-duration="1000">
                    <WishlistForm
                        wishlistDetails = {product}
                    />
                </div>
                <div className="col-lg-6 card-section" data-aos="fade-left" data-aos-duration="1000">
                    {list.map((item)=>{
                        return(
                            <div>
                            <WishlistCard
                                id = {item._id}
                                name = {item.wishlistName}
                                despriction = {item.wishlistDescription}
                                qty = {item.wishlistProducts.length}
                                changeDetails = {product => setProduct(product)}
                            />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}