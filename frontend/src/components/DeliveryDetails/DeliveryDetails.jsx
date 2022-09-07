import React, { useState, useEffect } from 'react';
import DeliveryDetailsForm from './DeliveryDetailsForm';
import CartBackground from "../../images/Payment.png";
import {useLocation} from "react-router-dom";

function DeliveryDetails(){

    const location = useLocation();

    console.log(location.state)

    return(
        <div>
        <div style={{alignItems:"center", justifyContent:"center"}}>
        <DeliveryDetailsForm 
         itemObject={location.state}
         itemsids={location.state.itemIDs}
        />
           
        </div>
        <img src={CartBackground} className="cart-background"/> 
    </div>);
}

export default  DeliveryDetails;