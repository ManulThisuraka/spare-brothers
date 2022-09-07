import React from "react";
import "../../../src/styles/rider.css";
import AdminNavigation from "../Admin/AdminNavigation";
import CustomerTable from "./CustomerTable";
import {
    Card,
    Col,
    Container,
    Row,
    CardBody,
} from 'reactstrap'
function Customer() {

    return (
        // <div >
        //     <AdminNavigation/>
        //     <div className="margin-adjust">
        //         <h1 className="page-title">Customer Management</h1>
        //         <CustomerTable/>
        //     </div>
        // </div>

        <React.Fragment>
            <AdminNavigation />
            <div className="page-content">
                <Container fluid={true}>
                    <Row style={{ paddingTop: "30px" }}>
                        <h4 style={{ color: "#FFFFFF" }}>Customer Management</h4>
                    </Row>
                        <div className="margin-adjust">
                            <CustomerTable />
                        </div>
                </Container>
            </div>
        </React.Fragment>


    )

}

export default Customer;