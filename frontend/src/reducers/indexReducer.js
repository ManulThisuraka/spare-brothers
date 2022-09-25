import {combineReducers} from 'redux';
import ProductReducer from './productReducer';
import CartReducer from './cartReducer';


export default combineReducers({
    ProductReducer,
    CartReducer
});