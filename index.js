//import module
const express= require("express")
const path=  require("path")
const hbs= require("hbs")
const mongoose = require('mongoose');
var bodyParser = require('body-parser')


//import files
const Routes= require("./routes/routes");

//create app instance
const app= express()

//static file serve
app.use(express.static(path.join(__dirname, './public')))

//middleware
app.use(bodyParser.urlencoded({ extended: true }))

//database configugration
mongoose.connect('mongodb://127.0.0.1:27017/crudapp')
.then((response)=>{
    console.log("database connected successfully");
}).catch((err)=>{
    console.log(err);
})

//routes
app.use(Routes)

//view engine
app.set("view engine", "hbs")
hbs.registerPartials(path.join(__dirname, './views/partials'))

//port
const PORT= process.env.PORT || 8000

//server start
app.listen(PORT, ()=>{
    console.log(`server is listening on ${PORT}`);
})