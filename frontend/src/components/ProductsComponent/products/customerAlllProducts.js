import React from 'react';
import Posts from './product/customerAllProduct'
import{useSelector} from 'react-redux'
import {Grid,CircularProgress} from '@material-ui/core'

import Styles from './styles'


const ProductPosts = ({setCurrentId})=>{  
    const eventposts = useSelector((state)=>state.ProductReducer) 
    const classes = Styles();
    console.log(eventposts);


    return(
        
        !eventposts.length ? <CircularProgress /> : (

            

            <Grid className={classes.container} container alignItems ="stretch" spacing={3} style={{height:'700px', width :'170%',overflow:'auto',marginTop:"10px"}}>
                {
                    eventposts.map((post)=>(
                        <Grid key={post._id} item xs={12} sm={4}>

                            <Posts  post={post} setCurrentId={setCurrentId} />
                        
                        </Grid>

                    ))}

            </Grid>
        )

        
    )
    
}

export default ProductPosts;