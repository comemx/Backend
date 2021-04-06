/*

In this file is where we put all the routes, here we put the endpoints and information that has to do with the http protocol

  - GET - Collect information from the server.
  - POST - Add information to the server.
  - PUT - Replace information on the server.
  - PATCH - Update part of the information.
  - DELETE - Delete information from the server.
  - OPTIONS - Ask for information about methods (know if we can execute any of the previous methods).

  - CODE INDEX

    1 [POST] ( VERIFY ) TOKEN
    2 [POST] ( LOGIN ) USER
    3 [POST] ( LOGIN ) BUSINESSMAN
    4 [DELETE] ( LOGOUT ) USER

  - MODULE EXPORTS

*/

const express = require('express');
const response = require('../../../network/response');
const controller = require('./controller');
const router = express.Router();
const verifyToken = require('../../../auth/verifyToken');

//------------------------------------------------------------------------------------------------
//CODE INDEX
//------------------------------------------------------------------------------------------------
//1 ( VERIFY ) TOKEN
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
//2 ( LOGIN ) USER
//------------------------------------------------------------------------------------------------

router.post('/userlogin', async (req, res, next) => {
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
//3 ( LOGIN ) BUSINESSMAN
//------------------------------------------------------------------------------------------------

router.post('/businessmanlogin', async (req, res, next) => {
  const { email, password } = req.body
  try {
    const token = await controller.loginBusinessman(email, password)
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
//4 ( LOGOUT ) USER
//------------------------------------------------------------------------------------------------

router.delete('/logout', async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]
  try {
    const data = await controller.logoutUser(token)
      response.success(req, res, data, 200)
  } catch (error) {
      response.error(req, res, error.message, 401, error)
  }
})

//------------------------------------------------------------------------------------------------
//MODULE EXPORTS
//------------------------------------------------------------------------------------------------

module.exports = router;