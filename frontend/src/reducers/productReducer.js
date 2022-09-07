export default(productReducer = [],action)=>{
    switch(action.type){
        case 'FEATCH_ALL' :
            return action.payload;
        
        case 'CREATE' :
            return[...postMessage,action.payload];
            
        case 'UPDATE':
            return productReducer.map((product)=>product._id === action.payload._id ? action.payload:product);

        case 'DELETE' :
            return productReducer.filter((product)=>product._id !== action.payload._id );
            case 'FETCH_SEARCH' :
                return action.payload;

                case 'FEATCH_INSUFF' :
            return action.payload;

            case 'FETCH_CATAGORY' :
                return action.payload;

        case 'UPDATE_QTY':

            return productReducer.map((product)=>product._id === action.payload._id ? action.payload:product);

                case 'UPDATE_QTY':
                    return productReducer.map((product)=>product._id === action.payload._id ? action.payload:product);
        
                
        default:
            return productReducer;    
    }
}





