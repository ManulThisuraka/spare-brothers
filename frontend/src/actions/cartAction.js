
import * as api from '../api/cartApi'



export const createCart= (post) => async(dispatch)=>{ 
    try {

        const {data} = await api.createCart(post) 
        dispatch({type:'CREATE',payload:data});
        
    } catch (error) {
        console.log(error.message)
    }
}
