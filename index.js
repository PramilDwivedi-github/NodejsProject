const express = require("express")
const bodyparser = require("body-parser")
const connectToDb = require('./db')
const nodemailer = require('nodemailer')

const User = require("./models/user")
const { findById } = require("./models/user")


const app = express();


app.use(bodyparser.json());

connectToDb();

const transporter = nodemailer.createTransport({
    service: 'gmail',
  auth: {
    user: "pramilvbn46@gmail.com",
    pass: "mmmpppttt",
  }
})


app.post("/user", (req,res)=>{
    const userdata = req.body
    User.findOne({email:userdata.email},(err,data)=>{
        if(data)
        return res.status(201).json("user already exist")
        else{
            const newUser = new User(userdata)

           const saveduser =  newUser.save()
            return res.status(200).json("registered successfully")

        }
    })
 
    
})

app.post("/login",(req,res)=>{
    const data = req.body
    
    const find = User.findOne({email:data.email},(err,info)=>{
        if(info && info.password === data.password)
        return res.status(200).send(info)

        if(info && info.password !== data.password)
        return res.status(200).json("invalid password")
        
        return res.status(201).json("user does not exist")
    })



})


app.post("/forgot",(req,res)=>{
    const email = req.body.email;

    User.findOne({email:email},(err,data)=>{
        if(!data)
        return res.status(201).json("email does not exist")
        


        const mailConfigurations = {
            from: 'pramilvbn46@gmail.com',
            to: "pramildwivedi46@gmail.com",
            subject: 'Sending Email using Node.js',
            text: 'Hi! There, You know I am using the NodeJS '
             + 'your news app password is - '+ data.password
        };
        transporter.sendMail(mailConfigurations,(err,info)=>{
            if(err)
            console.log(err)

            else
            console.log("successfully sent email")

            return res.status(200).json(data.password)
        })
    })
})

app.get("/users",(req,res)=>{
    const all = []
    User.find({},(err,data)=>{
        return res.status(200).send(data)
    })
    
})






app.listen(process.env.PORT ,()=>{
    console.log(`app running at ${process.env.PORT}`);
})