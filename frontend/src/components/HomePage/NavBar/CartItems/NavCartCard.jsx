import {UilMinus, UilPlus} from "@iconscout/react-unicons";

export default function NavCartCard(props){
    return(
        <div className="notification-card">
            <div className="notification-card-icon">
                <img src={props.image} alt=""/>
            </div>
            <div className="nav-cart-card">
                <h6>{props.name}</h6>
                <div className="nav-cart">Category: {props.category}</div>
                <div className="nav-cart">Price: Rs. {props.price}.00</div>
            </div>
            <div className="notification-card-button">
                <div className="red-square" style={{ position: "absolute", right: "5%", top: "10%", width:"20px", height:"20px" }} ><UilPlus size={20} style={{position:"absolute", top:"1%"}}/></div>
                <div style={{ position: "absolute", right: "5%", top: "30px" }}>
                    01
                </div>
                <div className="red-square" style={{ position: "absolute", right: "5%", bottom: "10%", width:"20px", height:"20px" }} ><UilMinus size={20} style={{position:"absolute", top:"1%"}} /></div>
            </div>
        </div>
    );
}