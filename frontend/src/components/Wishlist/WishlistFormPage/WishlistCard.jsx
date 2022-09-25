import { UilTimes } from '@iconscout/react-unicons';
import { UilPen } from '@iconscout/react-unicons'
import axios from "axios";
import {useState} from "react";

export default function WishlistCard(props){

    const [item, setItem] = useState({});

    function getProduct(){
        axios.get(`http://localhost:8070/wishlist/${props.id}`).then((item)=>{
            setItem(item.data);
        });

        props.changeDetails(item);

    }

    function deleteItem(){
        axios.delete(`http://localhost:8070/wishlist/${props.id}`).then((product)=>{
            console.log('Successfully deleted.');
            window.location.reload();
        }).catch((err)=>{
            console.log(err);
        })
    }

    function selectedCard(id){
        window.location = `/wishlist/${id}`;
    }

    return(
        <div>
            <div className="wishlist-card">
                <div className="card-title" onClick={() => { selectedCard(props.id) }}>
                    <h5>{props.name}</h5>
                    <span>{props.despriction} </span>
                    <div>Quantity - {props.qty} </div>
                </div>
                <div className="card-buttons">
                    <div className="red-square" style={{top:"10%"}}>
                        <UilTimes onClick={deleteItem} />
                    </div>
                    <div className="red-square" style={{bottom:"10%"}}>
                        <UilPen onClick={() => getProduct()} size="20" />
                    </div>
                </div>
            </div>
        </div>
    );
}