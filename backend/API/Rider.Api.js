const express = require('express')
const router = express.Router();
const controller = require('../Controllers/Rider.Controller')

module.exports = function (){
    router.post('/create' , controller.createRider)
    router.put('/update/:id',controller.updateRider)
    router.delete('/delete/:id',controller.deleteRider)
    router.get('/getAllRiders' , controller.getAllRiders)
    router.get('/getRider/:id' , controller.getRider)

    return router;
}