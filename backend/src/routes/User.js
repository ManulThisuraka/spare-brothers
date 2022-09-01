const express = require('express')
let User = require("../models/User");
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const cors = require('cors');
const jwt = require('jsonwebtoken')

const app = express()
const saultRounds = 10

app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))

// Add user registration
app.post("/register", (req,res) =>{
    const username = req.body.username
    const email = req.body.email
    const usertype = req.body.userType
    const riders = req.body.riders

    bcrypt.hash(req.body.password ,saultRounds , (err,hash) =>{

      const password = hash
      const newUser = new User({
        username,
        email,
        password,    
        usertype,
          riders
    })   
    User.findOne({ email: req.body.email }).then((user) =>{
      if(user){
        res.send({Error: "Email aready in use"}) // Add email verification
      }else{
        newUser.save().then((user)=>{
          console.log(user)
          res.send({message: "Registration Success"}) // Add registration verification
      }).catch((err) =>{
          res.send({Error:"user details missing"})
      })}
    }).catch((error)=>{
      res.send(error.message)
    })  
    })
  })

  // Add login details
app.post("/login", async(req,res) =>{
    await User.findOne({ email: req.body.email }).then( //find corresponding email form users list 
        (user) => {
         //since the password in database is in encrypted format we have to get it and decrypt to compre with user entered password
         //That's what we are doing here with bcrypt.compare method 
         bcrypt.compare(req.body.password, user.password , (err , result) =>{ // compare passwords
          if(err || !result){
            res.send({message:"Password not valid"}) // Add password verification
          }else{
            jwt.sign({user} , 'secretkey', (err, token) =>{
              res.json({token , usertype: user.usertype})
            }) 
          }})
        }).catch(
        (error) => {
          res.send({message: "Invalid Email"})
        }
      );
    })

// Get all user details
    app.get("/getAllCustomers",(req, res)=>{

      console.log(req.headers["data"])
      var search = req.headers["data"]

      if(req.headers["data"] == ""){
        User.find({}).then((data)=>{
          res.status(200).send(data)
         
        }).catch((error)=>{
          res.status(500).send(error.message)
        })
        return
      }else{
        User.find({email:{ $regex: search }}).then((data)=>{
          res.status(200).send(data)
         
        }).catch((error)=>{
          res.status(500).send(error.message)
        })
      }

    })

    // Delete user details
    app.delete("/delete/:customerID",(req,res)=>{

      User.findByIdAndDelete({_id:req.params.customerID}).then((data)=>{
        res.status(200).send("Customer deleted succesfully") // Add delete verification
      }).catch((err)=>{
        res.status(500).send(err.message)
      })

    })

// Update profile
    app.put("/profileUpdate", (req,res) =>{

      console.log(req.body.username  ,  req.body.password)

      bcrypt.hash(req.body.password ,saultRounds , (err,hash) =>{
        const newpassword = hash
        
        User.findByIdAndUpdate({_id:req.body.userID},{
          username:req.body.username,
          password:newpassword
        }).then((respond)=>{
          console.log(respond)
          res.send(respond)
        }).catch((err)=>{
          console.log(err)
          res.send({Error:"Profile details updatea failed"})
        })
     
      })
    })



// Get verification token
app.get("/post",verifyToken,(req, res) =>{
 
    if(req.user){
      res.json(req.user)
    }else{
      res.send({message:"Token not valid"}) // Add token verification
    }
  })
  
//verify token
function verifyToken(req , res , next){
//Get auth header value
const bearerHeader = req.headers['authorization'];
const token = bearerHeader && bearerHeader.split(' ')[1]
//checking if there is a token or not
if(token == null){
  return res.sendStatus(401)
}else{
  jwt.verify(token, 'secretkey', (err, authData)=>{
    if(err){
      res.sendStatus(403)
    }else{
      req.user = authData
      next()
    }
  })
}
}


// Get specific user details
app.get("/getOne/:id",(req, res)=>{

    const id = req.params.id
    User.findOne({riders:id}).populate('riders', 'riderName')
        .then((data)=>{
        res.send(data)

    }).catch((error)=>{
        res.status(500).send(error.message)
    })

})

  module.exports = app;