/*

In this file is where we put all the routes, here we put the endpoints and information that has to do with the http protocol

  - GET - Collect information from the server.
  - POST - Add information to the server.
  - PUT - Replace information on the server.
  - PATCH - Update part of the information.
  - DELETE - Delete information from the server.
  - OPTIONS - Ask for information about methods (know if we can execute any of the previous methods).

  1.- CODE INDEX

    1 [POST] client user creation
    2 [PUT] client user modification
    3 [PUT] client user image modification
    4 [DELETE] client user deletion
    5 [POST] client user login
  
  2.- MODULE EXPORTS

*/

const express = require('express');
const response = require('../../../network/response');
const controller = require('./controller');
const router = express.Router();
const { upload } = require('../../../libs/multer');
const checkAuth = require('../../../auth/check-auth');

//------------------------------------------------------------------------------------------------
//1 client user creation
//------------------------------------------------------------------------------------------------

router.post('/signup', upload, async (req, res) => {
  const { fullname, email, username, password} = req.body
    try {
      const user = await controller.add(fullname, email, username, password, req.file)
      response.success(req, res, user, 201)
    } catch (error) {
      response.error(req, res, error.message, 400, error)
    }
  })

//------------------------------------------------------------------------------------------------
//2 client user modification
//------------------------------------------------------------------------------------------------
  router.put('/:id', checkAuth, async (req, res) => {
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
//3 client user image modification
//------------------------------------------------------------------------------------------------

router.post('/editimage/:id', checkAuth, upload, async (req, res) =>{
  const { id } = req.params
  try {
    const userImage = await controller.editImage(id, req.file)
    response.success(req, res, userImage, 201)
  } catch (error) {
    response.error(req, res, error.message, 400, error)
  }
})

//------------------------------------------------------------------------------------------------
//4 client user deletion
//------------------------------------------------------------------------------------------------

router.delete('/:id', checkAuth, async (req, res) => {
  const { id } = req.params
  try {
    const user = await controller.deleteUser(id)
    response.success(res, res, `User ${id} has been removed`)
  } catch (error) {
    response.error(req, res, error.message, 400, error)
  }
})

//------------------------------------------------------------------------------------------------
//5 client user login
//------------------------------------------------------------------------------------------------

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body
  try {
    const token = await controller.loginController(email, password)
    const finalResponse = {
      Message: 'Auth success',
      token
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

module.exports = router;