import React from "react";
import MyDeleveredTable from "./Table/MyDeleveredTable";
import RiderNavigation from "../RiderNavigation";
import CartBackgroundRight from "../../../images/apples.png";
import Rider from '../../../images/Rider.png'

export default function MyDeliveredOrders() {
    return (
        <div>
            <RiderNavigation/>
            <div className="margin-adjust">
                <h1 className="page-title">My Delivered Orders</h1>
                <br></br>
                <br></br>
                <MyDeleveredTable/>
                <img src={Rider} className="cart-background-right"/>
            </div>

        </div>
    )
}