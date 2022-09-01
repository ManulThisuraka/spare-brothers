const router = require('express').Router();
let Products = require('../models/productModel');


router.route("/add").post((req,res)=>{
    if(req.body){
        const product = new Products(req.body);
        product.save()
        .then(data=>{
            
            res.status(200).send({data:data})
        }) 
        .catch(error=>{
            res.status(500).send(error.message);
        })
    }

})

router.route("/readAll").get(async(req,res)=>{
    await Products.find()
    .then((product)=>{
            
        res.json(product)
    }) 
    .catch(error=>{
        res.status(500).send(error.message);
    })
})

router.route("/update/:id").patch(async(req,res)=>{
    let productID = req.params.id;
    if(req.params && req.params.id){
     const{product,price,category,availableQty,minimumQty,mesuringUnit} = req.body;

        
       const updateproduct = {
        product,price,category,availableQty,minimumQty,mesuringUnit
       }

       const update = await Products.findByIdAndUpdate(productID,updateproduct,{new:true})
       .then(data=>{
            
        res.status(200).send({data:data})
    }) 
    .catch(error=>{
        res.status(500).send(error.message);
    })






    }
})


router.route("/delete/:id").delete(async(req,res)=>{
    let productID = req.params.id;
    if(req.params && req.params.id){

        await Products.findByIdAndDelete(productID)

        .then(data=>{
             
         res.status(200).send("product deleted successfully")
     }) 
     .catch(error=>{
         res.status(500).send(error.message);
     })
    }
});

router.route("/anitem/:category").get((req,res)=>{
    Products.find({
        category: req.params.category,
    }).then((items)=>{
        res.send({category: items});
    })
});

router.route("/search").get((req,res)=>{

    let prouctName = req.query.id;

    console.log(prouctName);

    Products.find({product:{ $regex: '.*' + prouctName + '.*',$options: 'i' }}).limit(5)
    .then((product)=>{
            
        res.json(product)
    }) 
    .catch(error=>{
        res.status(500).send(error);
    })
})

router.route("/categoryProduct").get((req,res)=>{

    let prouctCategory = req.query.id;

    console.log(prouctCategory);

    Products.find({category:prouctCategory})
    .then((product)=>{
            
        res.json(product)
    }) 
    .catch(error=>{
        res.status(500).send(error);
    })
})

router.route("/readInsuff").get(async(req,res)=>{
    await Products.find({$expr:{$gt:["$minimumQty","$availableQty"]}})
    .then((product)=>{
            
        res.json(product)
    }) 
    .catch(error=>{
        res.status(500).send(error.message);
    })
});
router.route('/updateqty/:id').put((req,res)=>{

    let productId = req.params.id;

    Products.findByIdAndUpdate(productId,{$inc: {"availableQty": -req.body.productCount}})

        .then((item)=>{

            //res.status(200).send({status:"conference updated"})
            res.json(item.availableQty);

        }).

        catch((err)=>{

            console.log(err);

            res.status(500).send({status:"error with updating"});

        })


})



router.route('/updateqty').put(async(req,res)=>{
let productId = req.params.id;
const{availableQty} = req.body

const updateproduct=(
    availableQty
)

const update= await Products.findByIdAndUpdate(productId,updateproduct)
.then((res)=>{
   res.status(200).send({status:"conference updated"}) 
}).
catch((err)=>{
    console.log(err);
    res.status(500).send({status:"error with updating"});
})

})

module.exports=router;


