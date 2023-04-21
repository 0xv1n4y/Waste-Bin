const mongoose=require('mongoose')
const documentSchema=new mongoose.Schema({
    value:{
        type:String,
        requred:true
    }
})

module.exports=mongoose.model("Document",documentSchema)