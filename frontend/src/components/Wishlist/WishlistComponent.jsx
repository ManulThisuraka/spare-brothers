import "../../styles/wishlist.css";
import WishlistMain from "./WishlistFormPage/WishlistMain";
// import image1 from "../../images/image1.png";
import {useLocation} from "react-router-dom";


export default function WishlistComponent(){



    return(
        <div>
            <div className="container">
                <WishlistMain />
            </div>
            {/* <img src={image1} className="cart-background"/> */}
        </div>
    );
}