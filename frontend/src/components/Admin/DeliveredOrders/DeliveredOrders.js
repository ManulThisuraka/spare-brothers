import React from "react";
import AdminNavigation from "../AdminNavigation";
import DeliveredOrderTable from "./Table/DeliveredOrderTable";
import orderReport from "./OrderReport";
import Charts from "./Charts";


export default function DeliveredOrders() {
    return (
        <div>
            <AdminNavigation/>
            <div className="margin-adjust">
                <h1 className="page-title">Delivered Orders</h1>
                <br></br>
                <br></br>

                <DeliveredOrderTable/>

            </div>

        </div>
    )
}