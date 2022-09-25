import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid, TextField, Button, Tooltip } from '@material-ui/core';

import EventPosts from '../ProductsComponent/products/AdminAllProducts';
import EventForm from '../ProductsComponent/products/form/productManageForm';
import Styles from './styles';
import { useDispatch } from 'react-redux';
import { getProduct, searchproduct } from '../../actions/productAction'
import AdminNavbar from "../Admin/AdminNavigation"
import NavBar from "../HomePage/NavBar/NavBar";
import productPage from '../../images/girl.png'


const ManageProducts = () => {


    const [currentId, setCurrentId] = useState(null);
    const [searchTerm, setSearchTerm] = useState(null);

    const classes = Styles();
    const dispatch = useDispatch();
    useEffect(() => {

        if (searchTerm) {
            dispatch(searchproduct(searchTerm));
        }
        else {
            dispatch(getProduct());
        }

        console.log(searchTerm)

    }, [currentId, searchTerm, dispatch]);



    return (

        <div style={{ marginLeft: '240px' }}>

            <AdminNavbar />
            <Container maxwidth='lg'>


                <AppBar className={classes.appBar} position="static" color='inherit'>
                    <Typography className={classes.heading} variant="h2" align="center">  Manage Items</Typography>


                </AppBar>

                <Grow in>

                    <Container>
                        <div className='row'>
                            <div className='col-lg-6' style={{ textAlign: 'left' }} >

                                <Button style={{ color: 'green', background: 'white', marginRight: "-10%", width: 'fit-content' }} href='/insufficient'>
                                    Insufficient products

                                </Button>

                            </div>

                            <div className='col-lg-6' style={{ textAlign: 'right' }}>
                            <Tooltip title="Search item by name">
                                <TextField style={{ color: 'white', background: 'white', width: '300px' }}
                                    id="outlined-basic"
                                    label="Search"
                                    variant="outlined"
                                    value={searchTerm}
                                    size="small"
                                    onChange={(e) => { setSearchTerm(e.target.value) }}

                                />
                            </Tooltip>
                            </div>

                        </div>

                        <Grid container justify="space-between" alignItems="stretch" spacing={3} style={{ marginTop: '13px' }} >

                            <Grid item xs={12} sm={7}>


                                <EventPosts setCurrentId={setCurrentId} />
                            </Grid >


                            <Grid item xs={12} sm={4} >


                                <EventForm currentId={currentId} />
                            </Grid>

                        </Grid>
                    </Container>

                </Grow>


            </Container>
            {/* <img src={productPage} className="product-background" /> */}
        </div>
    );
}

export default ManageProducts;