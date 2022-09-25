import React, {useEffect, useState} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { UilTruck } from '@iconscout/react-unicons';
import { UilParcel } from '@iconscout/react-unicons'

import {
    BrowserRouter as Router,
    Switch, Route, Link
} from "react-router-dom";

import {
    Drawer, List, ListItem,
    ListItemIcon, ListItemText,
    Container, Typography,
} from "@material-ui/core";

import InfoIcon from '@material-ui/icons/Info';

import NavBar from "../HomePage/NavBar/NavBar";

import { useHistory } from "react-router";
import HomeIcon from "@material-ui/icons/Home";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    drawerPaper: { width: 'inherit', paddingTop:"5%", marginTop:"4%", backgroundColor: "rgba(0, 0, 0, 0.15)" },
    link: {
        textDecoration: 'none',
        color: theme.palette.text.primary
    }
}));


function RiderNavigation(){
    const history = useHistory();
    const classes = useStyles();

    const [userType, setUserType] = useState('');

    const navigateOrdersRequests=()=>{
        history.push("/requests")
    }

  const navigateMy=()=>{
        history.push("/rider-items")
    }

    return (

        <Router>

            <div style={{ display: 'flex' }}>
                <Drawer
                    style={{ width: '240px' }}
                    variant="persistent"
                    anchor="left"
                    open={true}
                    classes={{ paper: classes.drawerPaper }}
                >
                    <div style={{textAlign:"center", marginBottom:"5%"}}>
                        <Typography style={{color:"white", fontSize:"30px"}}> Rider</Typography>
                    </div>
                    <List>
                        <Link to="/requests" className={classes.link}>
                            <ListItem button onClick={()=>navigateOrdersRequests()}>
                                <ListItemIcon>
                                    <UilParcel style={{color:"white"}}/>
                                </ListItemIcon>
                                <ListItemText primary={"Orders Requests"} style={{color:"white"}} />
                            </ListItem>
                        </Link>
                    </List>

                    <Link to="/rider-items" className={classes.link}>
                        <ListItem button onClick={()=>navigateMy()}>
                            <ListItemIcon>
                                <UilTruck style={{color:"white"}} />
                            </ListItemIcon>
                            <ListItemText primary={"My Delivered Orders"} style={{color:"white"}} />
                        </ListItem>
                    </Link>
                </Drawer>



            </div>
        </Router>
    );
}

export default RiderNavigation


