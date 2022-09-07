import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { UilTruck } from '@iconscout/react-unicons';
import { UilShoppingBag } from '@iconscout/react-unicons';
import { UilPlane } from '@iconscout/react-unicons';
import { UilLocationPinAlt } from '@iconscout/react-unicons';

import {
    BrowserRouter as Router,
    Switch, Route, Link
} from "react-router-dom";

import {
    Drawer, List, ListItem,
    ListItemIcon, ListItemText,
    Container, Typography,
} from "@material-ui/core";

import HomeIcon from "@material-ui/icons/Home";
import InfoIcon from '@material-ui/icons/Info';
import CustomerIcon from '@material-ui/icons/Group';
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
    drawerPaper: { width: 'inherit', marginTop:"4%", paddingTop:"5%", backgroundColor: "rgba(0, 0, 0, 0.15)" },
    link: {
        textDecoration: 'none',
        color: theme.palette.text.primary
    }
}))



function AdminNavbar(){
    const history = useHistory();
    const classes = useStyles();

    const navigateRidermanagement=()=>{
        history.push("/rider")
    }

    const navigateOrdermanagement=()=>{
        history.push("/orders")
    }

    const navigateDeliveredOrders=()=>{
        history.push("/complete")
    }

    const navigateCustomers=()=>{
        history.push("/customer")
    }




    const navigateProductManage=()=>{
        history.push("/productManage")
    }



    //shanuka prabodha
    return (

        <div style={{ zIndex:"-99" }}>
        <Router>

            <div >
                <Drawer
                    style={{ width: '240px' }}
                    variant="persistent"
                    anchor="left"
                    open={true}
                    classes={{ paper: classes.drawerPaper }}
                >
                    <List>
                        <div style={{textAlign:"center", marginBottom:"5%"}}>
                            <Typography style={{color:"white", fontSize:"30px"}}> Admin</Typography>
                        </div>
                        <Link to="/rider" className={classes.link}>
                            <ListItem button onClick={()=>navigateRidermanagement()}>
                                <ListItemIcon>
                                    <UilPlane style={{color:"white"}} />
                                </ListItemIcon>
                                <ListItemText  primary={"Rider Management"} style={{color:"white"}} />
                            </ListItem>
                        </Link>
                        <Link to="/orders" className={classes.link}>
                            <ListItem button onClick={()=>navigateOrdermanagement()}>
                                <ListItemIcon>
                                    <UilTruck style={{color:"white"}} />
                                </ListItemIcon>
                                <ListItemText primary={"Order Management"} style={{color:"white"}} />
                            </ListItem>
                        </Link>

                        <Link to="/productManage" className={classes.link}>
                            <ListItem button onClick={()=>navigateProductManage()}>
                                <ListItemIcon>
                                    <UilShoppingBag style={{color:"white"}} />
                                </ListItemIcon>
                                <ListItemText primary={"Products Management"} style={{color:"white"}} />
                            </ListItem>
                        </Link>
                        <Link to="/customer" className={classes.link}>
                            <ListItem button onClick={()=>navigateCustomers()}>
                                <ListItemIcon>
                                    <CustomerIcon style={{color:"white"}} />
                                </ListItemIcon>
                                <ListItemText primary={"Customers"} style={{color:"white"}} />
                            </ListItem>
                        </Link>


                        <Link to="/complete" className={classes.link}>
                            <ListItem button onClick={()=>navigateDeliveredOrders()}>
                                <ListItemIcon>
                                    <UilLocationPinAlt style={{color:"white"}} />
                                </ListItemIcon>
                                <ListItemText primary={"Delivered Orders"} style={{color:"white"}} />
                            </ListItem>
                        </Link>
                    </List>
                </Drawer>



            </div>
        </Router>
        </div>
    );
}

export default AdminNavbar


