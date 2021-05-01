/*

In this file is where we put all the routes, here we put the endpoints and information that has to do with the http protocol

  - GET - Collect information from the server.
  - POST - Add information to the server.
  - PUT - Replace information on the server.
  - PATCH - Update part of the information.
  - DELETE - Delete information from the server.
  - OPTIONS - Ask for information about methods (know if we can execute any of the previous methods).

  - CODE INDEX

    1 [PUT] ( SEND ) RECOVER PASSWORD LINK
    2 [PUT] ( CREATE ) NEW PASSWORD

  - MODULE EXPORTS

*/

const express = require('express');
const response = require('../../../network/response');
const controller = require('./controller');
const router = express.Router();

//------------------------------------------------------------------------------------------------
//CODE INDEX
//------------------------------------------------------------------------------------------------
//1 ( SEND ) RECOVER PASSWORD LINK
//------------------------------------------------------------------------------------------------

router.put('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body
    const data = await controller.recoverPassword(email)
    response.success(req, res, data, 200)
  } catch (error) {
    response.error(req, res, error.message, 400, error)
  }
})

//------------------------------------------------------------------------------------------------
//2 ( CREATE ) NEW PASSWORD
//------------------------------------------------------------------------------------------------

router.put('/new-password', async (req, res) => {
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
//MODULE EXPORTS
//------------------------------------------------------------------------------------------------

module.exports = router;