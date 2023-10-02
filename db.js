const mongoose=require("mongoose")

const MONGOURI=process.env.MONGODB

mongoose
  .connect(MONGOURI,{
  useNewUrlParser:true,
  useUnifiedTopology:true
})
.then(()=>{
  console.log("Connected to MongoDB")
})
.catch((error)=>{
  console.log("Error connecting to MongoDB : ",error)
})