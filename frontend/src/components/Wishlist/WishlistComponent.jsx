import "../../styles/wishlist.css";
import WishlistMain from "./WishlistFormPage/WishlistMain";
import WishlistBackground from "../../images/wishlistBackground.png";
import {useLocation} from "react-router-dom";


export default function WishlistComponent(){



    return(
        <div>
            <div className="container">
                <WishlistMain />
            </div>
            <img src={WishlistBackground} className="cart-background"/>
        </div>
    );
}