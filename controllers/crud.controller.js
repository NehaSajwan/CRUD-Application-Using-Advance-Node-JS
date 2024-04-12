const crudModel = require("../models/crud.model")
const path = require("path")
const fs = require("fs")


let crudValidation = {
    name: {
        errorOccur: false,
        message: ""
    },
    email: {
        errorOccur: false,
        message: ""
    },
    contact: {
        errorOccur: false,
        message: ""
    },
    error: false
}

const index = async (req, res) => {
    let employees = await crudModel.find()
    res.render("index", { employees })
}

const create = (req, res) => {

    if (crudValidation.error) {
        let crudValidationClone = { ...crudValidation }
        

        crudValidation = {
            name: {
                errorOccur: false,
                message: ""
            },
            email: {
                errorOccur: false,
                message: ""
            },
            contact: {
                errorOccur: false,
                message: ""
            },
            error: false
        }
        return res.render("create", { crudValidation: crudValidationClone })
    }
    res.render("create")
}

const edit = async (req, res) => {
    let employee = await crudModel.findOne({ _id: req.params.id })
    if (!employee) {
       
        return res.redirect('/')
    }
    if (crudValidation.error) {
        let crudValidationClone = { ...crudValidation }
        

        crudValidation = {
            name: {
                errorOccur: false,
                message: ""
            },
            email: {
                errorOccur: false,
                message: ""
            },
            contact: {
                errorOccur: false,
                message: ""
            },
            error: false
        }
        return res.render("edit", { crudValidation: crudValidationClone, employee })
    }
    res.render("edit", { employee })
}

const store = async (req, res) => {
    let result = await validation(req.body)
    if (result.error) {
        return res.redirect("/create")
    }
    await crudModel.create({
        name: req.body.name,
        email: req.body.email,
        contact: req.body.contact,
        image: req.file.path.replace("public", " ")
    })

    res.redirect("/")
}

const update = async (req, res) => {
    let result= await validation(req.body)

    if(result.error){
        return res.redirect(`/edit/${req.params.id }`)
       
    }

    if (req.file) {
        let employee = await crudModel.findOne({ _id: req.params.id })
        if (employee.image) {
            let url = path.join(__dirname, '../public/', employee.image)
            if (fs.existsSync(url)) {
                fs.unlinkSync(url)
            }
        }
        await crudModel.updateOne({ _id: req.params.id }, {
            name: req.body.name,
            email: req.body.email,
            contact: req.body.contact,
            image: req.file.path.replace("public", " ")
        })

    } else {
        await crudModel.updateOne({ _id: req.params.id }, {
            name: req.body.name,
            email: req.body.email,
            contact: req.body.contact
        })

    }


    res.redirect("/")
}
const destroy = async (req, res) => {
    await crudModel.deleteOne({ _id: req.params.id })

    res.redirect("/")
}
const validation = async (body) => {
    for (const key in body) {

        if (!body[key]) {
            crudValidation[key].errorOccur = true
            crudValidation[key].message = "please enter your " + key
            crudValidation.error = true

        }
    }
    return crudValidation
}


module.exports = {
    index,
    create,
    edit,
    store,
    destroy,
    update
}