const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");

const app = express();
dotenv.config();
app.use(cors());

app.use(bodyParser.json());
const PORT = process.env.PORT || 8070;
const URL = process.env.MONGODB_URL;

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
const productRouter = require('./routes/productRoutes')

mongoose.connect(URL,{
  useCreateIndex:true,
  useNewUrlParser:true,
  useUnifiedTopology:true,
  useFindAndModify:false,

})

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Mongo DB Connection success");
});

// User routes
const userRouter = require("./src/routes/User");
app.use('/user',userRouter)

app.route('/').get((req,res)=>{
    res.send('SLIIT SPM');
})

const RiderAPI = require('./API/Rider.Api.js')
app.use('/rider',RiderAPI())

const OrderAPI = require('./API/Order.Api.js')
app.use('/order',OrderAPI())

const CompleteOrderAPI = require('./API/completeOrder.Api')
app.use('/complete',CompleteOrderAPI())


const PaymentAPI = require('./API/Payment.Api')
app.use('/make', PaymentAPI())

const WishlistItems = require("./routes/wishlistRouter");
app.use('/wishlist',WishlistItems);

//Product Router
app.use('/product',productRouter)

const CartItems = require("./routes/cartRouter");
const {log} = require("nodemon/lib/utils");
app.use("/cart", CartItems);

const Coupons = require('./routes/couponRoute');
app.use('/coupon',Coupons);

const Notifications = require('./routes/notificationsRoute');
app.use('/notification',Notifications);

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
