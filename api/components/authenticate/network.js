/*

In this file is where we put all the routes, here we put the endpoints and information that has to do with the http protocol

  - GET - Collect information from the server.
  - POST - Add information to the server.
  - PUT - Replace information on the server.
  - PATCH - Update part of the information.
  - DELETE - Delete information from the server.
  - OPTIONS - Ask for information about methods (know if we can execute any of the previous methods).

  - CODE INDEX

    1 [POST] ( CREATE ) USER
    2 [PUT] ( UPDATE ) USER

  - MODULE EXPORTS

*/

const express = require('express');
const response = require('../../../network/response');
const controller = require('./controller');
const router = express.Router();

//------------------------------------------------------------------------------------------------
//CODE INDEX
//------------------------------------------------------------------------------------------------
//1 ( CREATE ) USER
//------------------------------------------------------------------------------------------------

router.post('/verify', async (req, res) => {
  const refreshToken = req.headers["verifyauthorization"];
  console.log(refreshToken)
    try {
      const token = await controller.verifyRefreshToken(refreshToken)
      const finalResponse = {
        Message: 'New generated token',
        accessToken: token
      }
      response.success(req, res, finalResponse, 201)
    } catch (error) {
      response.error(req, res, error.message, 400, error)
    }
})


//------------------------------------------------------------------------------------------------
//5 ( LOGIN ) USER
//------------------------------------------------------------------------------------------------

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body
  try {
    const token = await controller.loginUser(email, password)
    const finalResponse = {
      Message: 'Auth success',
      accessToken: token.accessToken,
      refreshToken: token.refreshToken
    }
    if (token) {
      response.success(req, res, finalResponse, 200)
    } else {
      throw new Error('Login failed')
    }
  } catch (error) {
    response.error(req, res, error.message, 401, error)
  }
})

//------------------------------------------------------------------------------------------------
//MODULE EXPORTS
//------------------------------------------------------------------------------------------------

module.exports = router;