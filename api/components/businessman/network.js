/*

In this file is where we put all the routes, here we put the endpoints and information that has to do with the http protocol

  - GET - Collect information from the server.
  - POST - Add information to the server.
  - PUT - Replace information on the server.
  - PATCH - Update part of the information.
  - DELETE - Delete information from the server.
  - OPTIONS - Ask for information about methods (know if we can execute any of the previous methods).

  - CODE INDEX

    1 [POST] ( CREATE ) BUSINESSMAN
    2 [PUT] ( UPDATE ) BUSINESSMAN
    3 [PUT] ( UPDATE ) BUSINESSMAN IMAGE
    4 [DELETE] ( DELETE ) BUSINESSMAN
    5 [GET] ( SHOW ) ALL BUSINESSMEN
    6 [GET] ( SHOW ) BUSINESSMAN BY ID
    7 [GET] ( SHOW ) BUSINESSMAN lOCALS

  - MODULE EXPORTS

*/

const express = require('express');
const response = require('../../../network/response');
const controller = require('./controller');
const router = express.Router();
const { upload } = require('../../../libs/multer');
const verifyToken = require('../../../auth/verifyToken');
const validations = require('../../../middleware/validations');

//------------------------------------------------------------------------------------------------
//CODE INDEX
//------------------------------------------------------------------------------------------------
//1 ( CREATE ) BUSINESSMAN
//------------------------------------------------------------------------------------------------

router.post('/registro', validations.validate(validations.createUsersValidation), async (req, res) => {
  const {fullname, email, password} = req.body
    try {
      const user = await controller.createUser(fullname, email, password)
      response.success(req, res, user, 201)
    } catch (error) {
      response.error(req, res, error.message, 400, error)
    }
  })

//------------------------------------------------------------------------------------------------
//2 ( UPDATE ) BUSINESSMAN
//------------------------------------------------------------------------------------------------

router.put('/:id', validations.validate(validations.updateBusinessmanValidation), verifyToken, async (req, res) => {
    const { id } = req.params
    const { body: user } = req
    user._id = id
    try {
      const data = await controller.updateUser(user)
      response.success(req, res, data, 200)
    } catch (error) {
      response.error(req, res, error.message, 400, error)
    }
  })

//------------------------------------------------------------------------------------------------
//3 ( UPDATE ) BUSINESSMAN IMAGE
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
//4 ( DELETE ) BUSINESSMAN
//------------------------------------------------------------------------------------------------

router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params
  try {
    const user = await controller.deleteUser(id)
    response.success(res, res, `User ${id} has been removed`)
  } catch (error) {
    response.error(req, res, error.message, 400, error)
  }
})

//------------------------------------------------------------------------------------------------
//6 ( SHOW ) ALL BUSINESSMEN
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
//7 ( SHOW ) BUSINESSMAN BY ID
//------------------------------------------------------------------------------------------------

router.get('/:id', verifyToken, async (req, res) => {
  const { id } = req.params

  try {
    const data = await controller.getOneUserById(id)
    response.success(req, res, data, 200)
  } catch (error) {
    response.error(req, res, error.message, 400)
  }
})

//------------------------------------------------------------------------------------------------
//8 ( SHOW ) BUSINESSMAN lOCALS
//------------------------------------------------------------------------------------------------

router.get('/locals/:id', verifyToken, async (req, res) => {
  const { id } = req.params

  try {
    const data = await controller.getLocalsOfUser(id)
    response.success(req, res, data, 200)
  } catch (error) {
    response.error(req, res, error.message, 400)
  }
})

//------------------------------------------------------------------------------------------------
//MODULE EXPORTS
//------------------------------------------------------------------------------------------------

module.exports = router;