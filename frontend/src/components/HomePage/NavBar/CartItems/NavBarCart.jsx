import React, { useState, useEffect } from 'react';
import { UilShoppingCartAlt } from '@iconscout/react-unicons';
import { UilUser } from '@iconscout/react-unicons';
import { UilSearch } from '@iconscout/react-unicons';
import Badge from '@material-ui/core/Badge';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import ItemList from '../../../Cart/ItemSection/ItemList';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ItemCard from "../../../Cart/ItemSection/ItemListSub/ItemCard";

import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import * as PropTypes from "prop-types";
import {faBell} from "@fortawesome/free-regular-svg-icons";
import NavBarNotifications from "../Notifications/NavBarNotifications";
import NavUser from "../NavUser";
import NavCartCard from "./NavCartCard";
import NotificationCount from "../../../Admin/OrderManagement/OrderTable/NotificationCount";


const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
}));


FontAwesomeIcon.propTypes = {icon: PropTypes.arrayOf(PropTypes.string)};

function NavBarCart(props) {

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [products, setProducts] = useState([]);
    const [itemCount, setItemCount] = useState();
    const [idr, setId] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8070/cart/').then((res) => {
            setProducts(res.data);
            setItemCount(res.data.length);
        });
        const access_token = localStorage.getItem('token')
        let config = {
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        }
        axios.get('http://localhost:8070/user/post',
            config)
            .then((response) => {
                if (response.data.message) {
                    alert(response.data.message)
                } else {

                    setId(response.data.user.riders)
                }
            })
            .catch()
    },[]); // loop here
       // [products,itemCount]

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <div className="icon-set">


                <div className="mx-3">
                    <UilSearch />
                </div>

                {(props.userType === "Customer" || props.userType === "admin") && (
                <div className="mx-3">
                    <NavBarNotifications />
                </div>
                )}

                {(props.userType === "rider") && (
                    <div className="mx-3">
                        <NotificationCount usertype="rider" id={idr} />
                    </div>
                )}

                {(props.userType === "admin") && (
                    <div className="mx-3">
                        <NotificationCount usertype="admin"  />
                    </div>
                )}


                <div className="mx-3">
                    <NavUser usertype ={props.userType}/>
                </div>

                {(props.userType === "Customer") && (
                <div className="mx-3">
                    <Badge badgeContent={itemCount} color="secondary" variant="contained" onClick={handleClick} >
                        <UilShoppingCartAlt />
                    </Badge>
                </div>
                )}

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
                    style: { width: '18%', backgroundColor: "#50587F", overflow: "auto", maxHeight: "355px", padding:"1% 0 0" },
                }}
                
            >
                    {products.map((product) => {
                        return (
                            <div className="notification-list">
                                <NavCartCard
                                    name = {product.name}
                                    category = {product.category}
                                    price = {product.price}
                                    image = {product.image}
                                />
                            </div>
                        )
                    })}

                <Button component={Link} to="/cart" className={classes.typography} style={{ backgroundColor: "#FA334E", color: "#fff", fontWeight: "700", marginTop:"5%"}} fullWidth variant="contained">
                    View cart.
                </Button>

            </Popover>
        </div>
    )
}

export default NavBarCart;