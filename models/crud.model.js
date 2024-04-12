const mongoose = require("mongoose")

const crudSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contact: {
        type: Number,
        required: true,
        unique: true
    },
    image:{
        type:String
    }

})
const crudModel = mongoose.model("Crud", crudSchema)
module.exports = crudModel