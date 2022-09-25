const router = require('express').Router();
const Notifications = require('../models/notificationModel');

router.route("/").post((req,res)=>{
    const products = req.body;
    const notification = new Notifications(products);

    notification.save().then(()=>{
        res.send("Saved successfully");
    }).catch((error)=>{
        console.log(error);
    })
});

router.route('/').get((req,res)=>{
    Notifications.find().then((notification)=>{
        res.json(notification);
    }).catch((error)=>{
        console.log(error);
    })
});

router.route('/:id').delete((req,res)=>{
    Notifications.findByIdAndRemove(req.params.id).then(()=>{
        res.send("Deleted successfully");
    }).catch((error)=>{
        console.log(error)
    })
});

module.exports = router;