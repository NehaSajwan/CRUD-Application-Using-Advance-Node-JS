//import modules
const express= require("express")
const { index, create, edit, store, destroy, update} = require("../controllers/crud.controller")
const upload = require("../middleware/fileUpload.middleware")

//create router
const router= express.Router()

//homepage
router.get('/', index)

//create
router.get('/create', create)

//edit
router.get('/edit/:id', edit)

//store
router.post("/store", upload.single("image"), store)

//update
router.post("/update/:id",upload.single("image"), update)

//delete
router.post('/destroy/:id', destroy)

module.exports= router
