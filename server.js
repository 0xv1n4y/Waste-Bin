const  express = require('express')
const app = express()
const port = 3000
const mongoose =require('mongoose')

const Document= require("./models/Document")

mongoose.connect("mongodb+srv://vinay:vinay@cluster0.41gxxly.mongodb.net/student?retryWrites=true&w=majority")
.then(console.log("Connected to Database")).catch((err)=>console.log(err))
app.use(express.static('public'))



app.use(express.urlencoded({extended:true}))

app.set('view engine','ejs')

app.get('/', (req, res) =>{
    const code =`Welcome to WasteBin!
    Use the commands in the top right corner
    to create a new file to share with others.`
 res.render('code-display',{code,language:"plaintext"})
})

app.get("/new",(req,res)=>{
    res.render('new')
})

app.post('/save',async(req,res)=>{
    const value= req.body.value
    try{
        const document=await Document.create({value})
        res.redirect(`/${document.id}`)

    }catch (e){
        res.render('new',{value})
    }
    
})

app.get('/:id',async(req,res)=>{
    const id= req.params.id
    try{
        const document=await Document.findById(id)
        res.render('code-display',{code:document.value,id})


    }catch(e){
        res.redirect('/')
    }
})

app.get('/:id/duplicate',async(req,res)=>{
    const id=req.params.id
    try{
        const document=await Document.findById(id)
        res.render('new',{value:document.value})


    }catch(e){
        res.redirect(`/${id}`)
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))