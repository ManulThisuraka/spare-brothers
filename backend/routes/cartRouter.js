const router = require("express").Router();
const Item = require("../models/cartModel");

router.route("/").post((req,res)=>{
   const productID = req.body.productID
   const name = req.body.name;
   const price = req.body.price;
   const category = req.body.category;
   const status = req.body.status;
   const image = req.body.image;
   const measuringUnit = req.body.measuringUnit;
   const availableQuantity = req.body.availableQuantity;
   const minimumQuantity = req.body.minimumQuantity;

   const newItem = new Item({
      productID,
      name,
      price,
      image,
      category,
      status,
      measuringUnit,
      availableQuantity,
      minimumQuantity
   });

   newItem.save().then((item)=>{
      res.json("Product Added successfully");
   }).catch((err)=>{
      console.log(err);
   });
})

router.route("/").get((req,res)=>{
   Item.find().then((items)=>{
      res.json(items);
   }).catch((err)=>{
      console.log(err)
   })
});

router.route("/:id").delete((req,res)=>{
   const id = req.params.id;
   Item.findByIdAndRemove(id).then((item)=>{
      res.json(item.name+" deleted successfully");
   }).catch((err)=>{
      console.log(err)
   })
});

router.route("/").delete((req, res)=>{
   Item.deleteMany().then(()=>{
      res.json("Deleted Successfully.");
   }).catch((err)=>{
      console.log(err);
   })
});

router.route("/total").get(async(req,res)=>{
   let total = 0;
   let itemID = []
   const items = await Item.find();
   items.map((item)=>{
      total = total+(item.price*item.productCount)
      itemID.push(item._id)
   });
   res.send({total:total,itemIDs : itemID});
});


router.route("/:id").put((req,res)=>{
   Item.findByIdAndUpdate(req.params.id,{
      productCount: req.body.count
   }).then(()=>{
      res.send("Success")
   }).catch((err)=>{
      console.log(err);
   })
});

module.exports = router;