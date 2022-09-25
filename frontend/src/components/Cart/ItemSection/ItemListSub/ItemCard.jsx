import {useEffect, useState} from "react";
import { UilPlus } from '@iconscout/react-unicons';
import { UilMinus } from '@iconscout/react-unicons';
import { UilTimes } from '@iconscout/react-unicons';
import axios from "axios";
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();


export default function ItemCard(props) {

    const [count, setCount] = useState(1);
    const [productCount, setProductCount] = useState({
        count: 2
    });

    let productId = props.id;

    function increaseCount() {
        setCount(count + 1);
        setProductCount({
            count: count+2
        });
        updateCount();
    }



    function decreaseCount() {
        setCount(count - 1);
        setProductCount({
            count: count-2
        });
        updateCount()
    }

    useEffect(()=>{
        axios.put(`http://localhost:8070/cart/${productId}`,{count: 1}).then(()=>{
            console.log('Success')
        }).catch((err)=>{
            console.log(err)
        });

        props.productCount(productCount);
    },[]);

    function updateCount(){

        axios.put(`http://localhost:8070/cart/${productId}`,productCount).then(()=>{
            console.log('Success')
        }).catch((err)=>{
            console.log(err)
        })
    }


    return (
        <div>
            <div className="item-card" data-aos="zoom-in" data-aos-duration="800">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="red-square" onClick={props.deleteProduct}><UilTimes /></div>
                        <img src={props.image} className="cart-image" />
                    </div>
                    <div className="col-lg-6 cart-details">
                        <div style={{paddingLeft:"28%"}}>
                            <span className="cart-title">{props.name}</span> <br />
                            <span className="cart-desc">{props.category}</span> <br />
                            <div className="price">Rs. {props.price * count}.00</div>
                        </div>
                    </div>
                    <div className="col-lg-2">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="red-square" style={{ position: "absolute", right: "5%", top: "10%" }} onClick={increaseCount}><UilPlus /></div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div style={{ position: "absolute", right: "7%", top: "50px" }}>
                                    {count>9?count:"0"+count}
                                </div>

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="red-square" style={{ position: "absolute", right: "5%", bottom: "10%" }} onClick={decreaseCount}><UilMinus /></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}