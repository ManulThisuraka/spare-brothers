export default(cartReducer = [],action)=>{
    switch(action.type){
       case 'CREATE' :
            return[...postMessage,action.payload];
        default:
            return cartReducer;    
    }
}