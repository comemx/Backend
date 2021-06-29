/*

In this file is where we put all the routes, here we put the endpoints and information that has to do with the http protocol

  - GET - Collect information from the server.
  - POST - Add information to the server.
  - PUT - Replace information on the server.
  - PATCH - Update part of the information.
  - DELETE - Delete information from the server.
  - OPTIONS - Ask for information about methods (know if we can execute any of the previous methods).

  - CODE INDEX

    1 [PUT] ( SEND ) RECOVER PASSWORD LINK USER
    2 [PUT] ( CREATE ) NEW PASSWORD USER
    3 [PUT] ( SEND ) RECOVER PASSWORD LINK BUSINESSMAN
    4 [PUT] ( CREATE ) NEW PASSWORD BUSINESSMAN

  - MODULE EXPORTS

*/

const express = require('express');
const response = require('../../../network/response');
const controller = require('./controller');
const router = express.Router();
const validations = require('../../../middleware/validations.js');

//------------------------------------------------------------------------------------------------
//CODE INDEX
//------------------------------------------------------------------------------------------------
//1 ( SEND ) RECOVER PASSWORD LINK USER
//------------------------------------------------------------------------------------------------

router.put('/forgot-password-user', validations.validate(validations.recoverPassword), async (req, res) => {
  try {
    const { email } = req.body
    const data = await controller.recoverPassword(email)
    response.success(req, res, data, 200)
  } catch (error) {
    response.error(req, res, error.message, 400, error)
  }
})

//------------------------------------------------------------------------------------------------
//2 ( CREATE ) NEW PASSWORD USER
//------------------------------------------------------------------------------------------------

router.put('/new-password-user', validations.validate(validations.generatePassword), async (req, res) => {
    try {
      const { password } = req.body
      const recoverPasswordToken = req.headers["passwordtoken"];
      const data = await controller.createNewPassword(password, recoverPasswordToken)
      response.success(req, res, data, 201)
    } catch (error) {
      response.error(req, res, error.message, 400, error)
    }
})

//------------------------------------------------------------------------------------------------
//3 ( SEND ) RECOVER PASSWORD LINK LOCATARIO BUSINESSMAN
//------------------------------------------------------------------------------------------------

router.put('/forgot-password-businessman', validations.validate(validations.recoverPassword), async (req, res) => {
  try {
    const { email } = req.body
    const data = await controller.recoverPasswordBusinessman(email)
    response.success(req, res, data, 200)
  } catch (error) {
    response.error(req, res, error.message, 400, error)
  }
})

//------------------------------------------------------------------------------------------------
//4 ( CREATE ) NEW PASSWORD USER BUSINESSMAN
//------------------------------------------------------------------------------------------------

router.put('/new-password-businessman', validations.validate(validations.generatePassword), async (req, res) => {
  try {
    const { password } = req.body
    const recoverPasswordToken = req.headers["passwordtoken"];
    const data = await controller.createNewPasswordBusinessman(password, recoverPasswordToken)
    response.success(req, res, data, 201)
  } catch (error) {
    response.error(req, res, error.message, 400, error)
  }
})

//------------------------------------------------------------------------------------------------
//MODULE EXPORTS
//------------------------------------------------------------------------------------------------

module.exports = router;