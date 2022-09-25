import axios from "axios";


const urladd = 'http://localhost:8070/cart/';


export const createCart =(newEvent)=>axios.post(urladd,newEvent);