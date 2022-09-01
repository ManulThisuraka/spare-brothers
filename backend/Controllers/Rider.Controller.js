const RiderModel = require('../models/Rider.model')

const createRider = async(req,res)=>{
    if(req.body){
        const riderData = new RiderModel(req.body)
        await riderData.save()
            .then(data=>{
                    res.status(200).send({data:data});
            })
            .catch(error=>{
                res.status(500).send({error: error.message})
            })
    }else{
      
        res.send("no data")
    }
}

const updateRider = async(req,res)=>{
   const id = req.params.id
    await RiderModel.findByIdAndUpdate(id,req.body)
        .then((data)=>{
            res.status(200).send("Updated")
        })
        .catch((error)=>{
            res.status(500).send({error:error.message})
        })
}


const deleteRider = async (req,res)=>{

    await RiderModel.findByIdAndRemove(req.params.id)
        .then((data)=>{
            res.status(200).send("Deleted")
        })
        .catch((error)=>{
            res.status(500).send({error:error.message})
        })
}


const getAllRiders = async (req,res)=>{

    await RiderModel.find({})
        .then((data)=>{
            res.status(200).send({data:data})
        })
        .catch((error)=>{
            res.status(500).send({error:error})
        })
}


const getRider = async (req,res)=>{

    await RiderModel.findById({_id: req.params.id})
        .then((data)=>{
            res.status(200).send({data:data})
        })
        .catch((error)=>{
            res.status(500).send({error:error})
        })
}



module.exports={
    createRider,
    updateRider,
    deleteRider,
    getAllRiders,
    getRider
}