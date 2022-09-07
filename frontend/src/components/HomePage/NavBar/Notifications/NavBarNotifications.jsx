import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBell} from "@fortawesome/free-regular-svg-icons";
import React, {useEffect, useState} from "react";
import Badge from "@material-ui/core/Badge";
import Popover from "@material-ui/core/Popover";
import { makeStyles } from '@material-ui/core/styles';
import NotificationCard from "./NotificationCard";
import Box from '../../../../images/box.png';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
}));


export default function NavBarNotifications() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [notifications, setNotifications] = useState([]);
    

    useEffect(()=>{
         axios.get('http://localhost:8070/notification/').then((notification)=>{
            setNotifications(notification.data);
        });
    },[])


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    return(
        <div className="icon-set">
            <div className="mx-3">
                {notifications.length>0?
                    <Badge badgeContent=" " color="secondary" variant="dot" onClick={handleClick}>
                        <FontAwesomeIcon icon={faBell} size="lg"/>
                    </Badge>
                    :
                    <FontAwesomeIcon icon={faBell} size="lg" onClick={handleClick}/>
                }
            </div>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}

                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                PaperProps={{
                    style: { width: '18%', backgroundColor: "#50587F", overflow: "auto", maxHeight: "335px", padding:"1% 0" },
                }}

            >
                <span className="notification-title">Notifications</span>

                <div className="notification-list">
                    {notifications.length>0?notifications.map((notify)=>{
                        return(
                            <NotificationCard
                                id = {notify._id}
                                product = {notify.product}
                                category = {notify.category}
                                closeProp = {handleClose}
                            />
                        )
                    }):
                        <div style={{textAlign:"center", marginTop:"10%"}}>
                            <img src={Box} style={{width:"100px", height:"auto"}}/>
                            <p style={{color: "white", fontSize:"15px", fontWeight:"300", margin:"5% 0%"}}>There are no any new notifications.</p>
                        </div>
                    }
                </div>

            </Popover>
        </div>
    );
}