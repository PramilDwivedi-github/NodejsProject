const mongoose = require("mongoose")

const pass = "Pramil@123"

const connectToDb = async ()=>{
    try{
        const conn = await mongoose.connect(`mongodb+srv://newsAppUser:hellomotto@pramilpractice.imluq.mongodb.net/newsapp?retryWrites=true&w=majority`,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
          })
        if(conn){
            console.log("connected at"+conn.connection.host);
        }
        else{
            console.log("failed to connect")
        }
    }
    catch(err){
        console.log(err)
    }
  

    

}

module.exports = connectToDb