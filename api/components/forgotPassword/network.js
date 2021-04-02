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
    3 [PUT] ( UPDATE ) USER IMAGE
    4 [DELETE] ( DELETE ) USER
    5 [POST] ( LOGIN ) USER
    6 [GET] ( SHOW ) ALL USERS
    7 [GET] ( SHOW ) USER BY ID

  - MODULE EXPORTS

*/

const express = require('express');
const response = require('../../../network/response');
const controller = require('./controller');
const router = express.Router();
const { upload } = require('../../../libs/multer');
const verifyToken = require('../../../auth/verifyToken');

//------------------------------------------------------------------------------------------------
//CODE INDEX
//------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------
//1 ( RECOVER ) USER PASSWORD
//------------------------------------------------------------------------------------------------

router.put('/forgot', async (req, res) => {
  try {
    const { email } = req.body
    const data = await controller.recoverPassword(email)
    response.success(req, res, data, 200)
  } catch (error) {
    response.error(req, res, error.message, 400, error)
  }
})
















router.post('/registro', async (req, res) => {
  const {fullname, email, password} = req.body
    try {
      const user = await controller.createUser(fullname, email, password)
      response.success(req, res, user, 201)
    } catch (error) {
      response.error(req, res, error.message, 400, error)
    }
})

//------------------------------------------------------------------------------------------------
//2 ( UPDATE ) USER
//------------------------------------------------------------------------------------------------

router.put('/:id', verifyToken, async (req, res) => {
  const { id } = req.params
  const { body: user } = req
  user._id = id
  try {
    console.log("network update user")
    const data = await controller.updateUser(user)
    response.success(req, res, data, 200)
  } catch (error) {
    response.error(req, res, error.message, 400, error)
  }
})

//------------------------------------------------------------------------------------------------
//3 ( UPDATE ) USER IMAGE
//------------------------------------------------------------------------------------------------

router.post('/editimage/:id', verifyToken, upload.single('image'), async (req, res) =>{
  const { id } = req.params
  try {
    const userImage = await controller.editUserImage(id, req.file)
    response.success(req, res, userImage, 201)
  } catch (error) {
    response.error(req, res, error.message, 400, error)
  }
})

//------------------------------------------------------------------------------------------------
//4 ( DELETE ) USER
//------------------------------------------------------------------------------------------------

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const user = await controller.deleteUser(id)
    response.success(res, res, `User ${id} has been removed`)
  } catch (error) {
    response.error(req, res, error.message, 400, error)
  }
})

//------------------------------------------------------------------------------------------------
//5 ( LOGIN ) USER
//------------------------------------------------------------------------------------------------

/* router.post('/login', async (req, res, next) => {
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
}) */

//------------------------------------------------------------------------------------------------
//6 ( SHOW ) ALL USERS
//------------------------------------------------------------------------------------------------

router.get('/', async (req, res) => {
  try {
    const data = await controller.getAllUsers()
    response.success(req, res, data, 200)
  } catch (error) {
    response.error(req, res, 'Something wrong happend', 500, error)
  }
})

//------------------------------------------------------------------------------------------------
//7 ( SHOW ) USER BY ID
//------------------------------------------------------------------------------------------------

router.get('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const data = await controller.getOneUserById(id)
    response.success(req, res, data, 200)
  } catch (error) {
    response.error(req, res, error.message, 400)
  }
})

//------------------------------------------------------------------------------------------------
//8 GOOGLE
//------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------
//MODULE EXPORTS
//------------------------------------------------------------------------------------------------

module.exports = router;