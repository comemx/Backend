/*

In this document, the validation of data entered within endpoints is modularized, for example the type of data, number of characters, etc,
the helper function is called from the endpoints as middleware and this in turn calls another function that validates certain information.

  - CODE INDEX

    1. HELPER FUNCTION

  - MODULE EXPORTS

*/

const response = require('../network/response')
const yup = require('yup')

//------------------------------------------------------------------------------------------------
//HELPER FUNCTION
//------------------------------------------------------------------------------------------------

function validate(validation) {
    return (req, res, next) => {
        try{
            validation(req.body)
            next()
        } catch (error) {
            response.error(req, res, error.message, 400, error)
        }
    }
}

//------------------------------------------------------------------------------------------------
//validation for { user, businessman } creation
//------------------------------------------------------------------------------------------------

function createUsersValidation(data) {
    const schema = yup.object().shape({
        fullname: yup.string().min(3, "[ Nombre ] acepta como minimo 3 caracteres").max(35, "[ Nombre ] acepta como maximo 35 caracteres").required("[ Nombre ] es requerido"),
        email: yup.string().min(5, "[ Correo ] acepta como minimo 5 caracteres").max(35, "[ Correo ] acepta como maximo 35 caracteres").required("[ Correo ] es requerido"),
        password: yup.string().min(5, "[ Contraseña ] acepta como minimo 5 caracteres").max(35, "[ Contraseña ] acepta como maximo 35 caracteres").required("[ Contraseña ] es requerida"),
    })
    schema.validateSync(data)
}

//------------------------------------------------------------------------------------------------
//validation for { user } update
//------------------------------------------------------------------------------------------------

function updateUsersValidation(data) {
    const schema = yup.object().shape({
        fullname: yup.string().min(3, "[ Nombre ] acepta como minimo 3 caracteres").max(35, "[ Nombre ] acepta como maximo 35 caracteres"),
        email: yup.string().min(5, "[ Correo ] acepta como minimo 5 caracteres").max(35, "[ Correo ] acepta como maximo 35 caracteres"),
        password: yup.string().min(5, "[ Contraseña ] acepta como minimo 5 caracteres").max(35, "[ Contraseña ] acepta como maximo 35 caracteres"),
    })
    schema.validateSync(data)
}

//------------------------------------------------------------------------------------------------
//validation for { businessman } update
//------------------------------------------------------------------------------------------------

function updateBusinessmanValidation(data) {
    const schema = yup.object().shape({
        fullname: yup.string().min(3, "[ Nombre ] acepta como minimo 3 caracteres").max(35, "[ Nombre ] acepta como maximo 35 caracteres"),
        email: yup.string().min(5, "[ Correo ] acepta como minimo 5 caracteres").max(35, "[ Correo ] acepta como maximo 35 caracteres"),
        phoneNumber: yup.number().min(1000000000, "[ Telefono ] acepta como minimo 10 numeros").max(9999999999, "[ Telefono ] acepta como maximo 10 numeros").integer(),
        password: yup.string().min(5, "[ Contraseña ] acepta como minimo 5 caracteres").max(35, "[ Contraseña ] acepta como maximo 35 caracteres"),
    })
    schema.validateSync(data)
}

//------------------------------------------------------------------------------------------------
//validation for { food, promotions } creation and update
//------------------------------------------------------------------------------------------------

function createAndUpdateFoodPromotionsValidation(data) {
    const schema = yup.object().shape({
        name: yup.string().min(3, "[ Nombre ] acepta como minimo 3 caracteres").max(35, "[ Nombre ] acepta como maximo 35 caracteres").required("[ Nombre ] es requerido"),
        price: yup.number().min(1, "[ Precio ] acepta como minimo 1 numero").max(999999, "[ Precio ] acepta como maximo 6 numeros").integer().required("[ Precio ] es requerido"),
        description: yup.string().min(5, "[ Descripcion ] acepta como minimo 5 caracteres").max(35, "[ Descripcion ] acepta como maximo 45 caracteres").required("[ Descripcion ] es requerido"),
    })
    schema.validateSync(data)
}

//------------------------------------------------------------------------------------------------
//validation for { local } creation and update
//------------------------------------------------------------------------------------------------

function createLocalValidation(data) {
    const schema = yup.object().shape({
        localName: yup.string().min(2, "[ Nombre del local ] acepta como minimo 2 caracteres").max(35, "[ Nombre del local ] acepta como maximo 35 caracteres").required("[ Nombre del local ] es requerido"),
        phoneNumber: yup.number().min(1000000000, "[ Telefono ] acepta como minimo 10 numeros").max(9999999999, "[ Telefono ] acepta como maximo 10 numeros").integer().required("[ Telefono ] es requerido"),
        address: yup.string().min(10, "[ Direccion ] acepta como minimo 10 caracteres").max(100, "[ Direccion ] acepta como maximo 100 caracteres").required("[ Direccion ] es requerida"),
        location: yup.object().required("[ Coordenadas ] son requeridas"),
        days: yup.array().required("[ Horarios ] son requeridos"),
        categories: yup.array().required("[ Categorias ] son requeridas"),
    })
    schema.validateSync(data)
}

//------------------------------------------------------------------------------------------------
//send email
//------------------------------------------------------------------------------------------------

function recoverPassword(data) {
    const schema = yup.object().shape({
        email: yup.string().min(5, "[ Correo ] acepta como minimo 5 caracteres").max(35, "[ Correo ] acepta como maximo 35 caracteres").required("[ Correo ] es requerido")
    })
    schema.validateSync(data)
}

function generatePassword(data) {
    const schema = yup.object().shape({
        password: yup.string().min(5, "[ Contraseña ] acepta como minimo 5 caracteres").max(35, "[ Contraseña ] acepta como maximo 35 caracteres")
    })
    schema.validateSync(data)
}
//------------------------------------------------------------------------------------------------
//MODULE EXPORTS
//------------------------------------------------------------------------------------------------

module.exports = {
    validate,
    createUsersValidation,
    updateUsersValidation,
    updateBusinessmanValidation,
    createAndUpdateFoodPromotionsValidation,
    createLocalValidation,
    recoverPassword,
    generatePassword
}