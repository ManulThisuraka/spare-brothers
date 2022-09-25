import NavBar from "../HomePage/NavBar/NavBar";
import ItemList from "./ItemSection/ItemList";
import "../../styles/cart.css";
import CartBackground from "../../images/cartBackground.png";
import CartBackgroundRight from "../../images/apples.png";
import PriceList from "./PriceSection/PriceList";
import {useState} from "react";

function CartComponent() {

    const [searchTerm, setSearchTerm] = useState();
    const [count, setCount] = useState();
    
    return (
        <div>
            <div className="container">
                <div className="row align-items-center justify-content-center">
                    <div className="col-lg-6" style={{borderRight:"1px solid #707070"}}>
                        <ItemList
                            searchTerm={searchTerm}
                            itemCount ={count=> setCount(count)}
                        />
                    </div>
                    <div className="col-lg-6">
                        <PriceList
                            buttonPressed={searchTerm=> setSearchTerm(searchTerm)}
                            productCount ={count}
                        />
                    </div>
                </div>
            </div>
            {/* <img src={CartBackground} className="cart-background"/>
            <img src={CartBackgroundRight} className="cart-background-right"/> */}
        </div>
    );
}

export default CartComponent;