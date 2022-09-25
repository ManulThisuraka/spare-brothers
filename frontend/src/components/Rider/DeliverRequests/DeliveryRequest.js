import React from "react";
import RequestTable from "./Table/RequestTable";
import RiderNavigation from "../RiderNavigation";
import '../../../styles/admin.css'
import RiderBackground from "../../../images/riderBackfround.png";

export default function DeliveryRequest(){
    return(
        <div>
            <RiderNavigation/>
            <div className="margin-adjust" >
                <h1 className="page-title">Order Requests</h1>
                <div style={{marginTop:"5%"}}>
                    <RequestTable/>
                </div>


            </div>
            <img src={RiderBackground} className="cart-background-right"/>
        </div>
    )
}