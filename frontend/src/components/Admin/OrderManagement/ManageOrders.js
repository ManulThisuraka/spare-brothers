import React from "react";
import AdminNavigation from "../AdminNavigation";
import OrderTable from "./OrderTable/OrderTable";
// import RiderBackground from '../../../images/Rider.png'
export default function ManageOrders(){
    return(
        <div>
            <AdminNavigation/>
            <div className="margin-adjust">
                <h1 className="page-title">Order Management</h1>

                <OrderTable/>

            </div>
            {/* <img src={RiderBackground} className="cart-background-right"/> */}
        </div>
    )
}