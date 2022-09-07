import {BrowserRouter as Router,Route} from "react-router-dom";

import Homepage from "./components/HomePage/HomePage";
import CartComponent from "./components/Cart/CartComponent";

import LoginPageComponent from "./components/LoginPage/LoginPageComponent";
import RegistrationPagecomponent from "./components/RegistrationPage/RegistrationPagecomponent";  
import Profilecomponenet from "./components/ProfilePage/Profilecomponenet";

import AdminNavbar from "./components/Admin/AdminNavigation";
import RiderNavigation from "./components/Rider/RiderNavigation";

import Rider from "./components/Admin/Rider/Rider";
import DeleteRider from "./components/Admin/Rider/Table/DeleteRider";

import WishlistComponent from "./components/Wishlist/WishlistComponent";
import ManageProducts from "../src/components/ProductsComponent/adminProductManage"
import ShoppingProducts from '../src/components/ProductsComponent/CustomerAllShopping'
import ManageOrders from "./components/Admin/OrderManagement/ManageOrders";
import DeliveredOrders from "./components/Admin/DeliveredOrders/DeliveredOrders";
import DeliveryRequest from "./components/Rider/DeliverRequests/DeliveryRequest";
import MyDeliveredOrders from "./components/Rider/MyDeliveredOrders/MyDeliveredOrders";
import WishlistProductMain from "./components/Wishlist/WishlistProductPage/WishlistProductMain";
import Gateway from "./components/Payment/Gateway";
import Inssufficient  from './components/ProductsComponent/insufficientProducts'
import WishListTable from './components/Wishlist/WishlistProductPage/WishListTable';
import Customer from "./components/Customer/Customer";
import DeliveryDetails from "./components/DeliveryDetails/DeliveryDetails";
import CustomerMyOrders from "./components/Customer/CustomerMyOrder/CustomerMyOrders";
import UnRegisterShoppingProducts from './components/ProductsComponent/unregisterAllproducts';
import NavBar from "./components/HomePage/NavBar/NavBar";

import {useEffect, useState} from "react";
import axios from "axios";
import CategoryProduct from "./components/ProductsComponent/categoryProduct"

import orderReport from "./components/Admin/DeliveredOrders/OrderReport";
import Chart from "./components/Admin/DeliveredOrders/Charts";
import UnRegisterCategoryProducts from './components/ProductsComponent/unregisterCategory';



function App() {
    const [userType, setUserType] = useState('');
    const [id, setId] = useState([]);

    useEffect(()=>{
        const getusertype = async () => {
            const access_token = localStorage.getItem('token')
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + access_token
                }
            }
            axios.get('http://localhost:8070/user/post', config).then((response) => {
                if (response.data.message) {
                    alert(response.data.message)
                } else {
                    setUserType(response.data.user.usertype);
                    setId(response.data.user.riders)
                }
            })
                .catch()
        };
        getusertype();

    },[]);

  return (
    <div>

      <Router>
          <NavBar getUserType={userType} userId={{id}}/>

          <Route path="/" exact component={Homepage}/>
          <Route path="/cart" exact component={CartComponent}/>
          <Route path='/signin' exact component={LoginPageComponent}/>
          <Route path='/signup' exact component={RegistrationPagecomponent}/>
          <Route path='/profile' exact component={Profilecomponenet}/>
          <Route path="/admin" exact component={AdminNavbar} />
          <Route path="/rider-login" exact component={RiderNavigation} />
          <Route path="/rider" exact component={Rider} />
          <Route path="/orders" exact component={ManageOrders} />
          <Route path="/delete" exact component={DeleteRider} />
          <Route path="/complete" exact component={DeliveredOrders} />
          <Route path="/requests" exact component={DeliveryRequest} />
          <Route path="/rider-items" exact component={MyDeliveredOrders} />
          <Route path="/repo" exact component={orderReport} />
          <Route path="/chart" exact component={Chart} />

          {/*<Route path="/gateway" exact component={Gateway} />*/}


          <Route path="/wishlist" exact component={WishlistComponent} />
          <Route path="/productManage" exact component={ManageProducts} />
          <Route path="/ShoppingAll" exact component={ShoppingProducts} />
          <Route path="/wishlist/:id" exact component={WishlistProductMain} />
          <Route path="/customer" exact component={Customer} />
          <Route path="/deliverydetails" exact component={DeliveryDetails} />
          <Route path="/myorder" exact component={CustomerMyOrders} />
          <Route path="/wishlist-report" exact component={WishListTable} />


          <Route path="/insufficient" exact component={Inssufficient} />
          <Route path="/unregisterAll" exact component={UnRegisterShoppingProducts} />

          <Route path="/categoryProduct" exact component={CategoryProduct} />
          <Route path="/uncategoryProduct" exact component={UnRegisterCategoryProducts} />

      </Router>
    </div>
  );
}

export default App;
