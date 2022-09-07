import React from "react";
import "../../../styles/rider.css";
import ManageTable from "./Table/ManageTable";
import AdminNavigation from "../AdminNavigation";
import RiderBackground from '../../../images/riderBackfround.png'
function Rider(){

    return (

        <div style={{zIndex:"-99"}}>
            <AdminNavigation/>
            <div className="margin-adjust" >
                <h1 className="page-title">Rider Management</h1>

                <ManageTable/>
            </div>
            <img src={RiderBackground} className="cart-background-right"/>
        </div>
    )

}

export default Rider;