/*

In this file is where we put all the routes, here we put the endpoints and information that has to do with the http protocol

  - GET - Collect information from the server.
  - POST - Add information to the server.
  - PUT - Replace information on the server.
  - PATCH - Update part of the information.
  - DELETE - Delete information from the server.
  - OPTIONS - Ask for information about methods (know if we can execute any of the previous methods).

  - CODE INDEX

    1 [POST] ( CREATE ) LOCAL
    2 [PUT] ( UPDATE ) LOCAL
    3 [DELETE] ( DELETE ) LOCAL
    4 [GET] ( SHOW ) ALL LOCALS
    5 [GET] ( SHOW ) LOCAL BY ID

  - MODULE EXPORTS

*/

const express = require('express');
const response = require('../../../network/response');
const controller = require('./controller');
const router = express.Router();
const { upload } = require('../../../libs/multer');
const checkAuth = require('../../../auth/check-auth');

//------------------------------------------------------------------------------------------------
//1 ( CREATE ) LOCAL
//------------------------------------------------------------------------------------------------

router.post('/addlocal', upload.array("image", 3), async (req, res) => {
  try {
      const { localName, phoneNumber, address, days } = req.body
      const local = await controller.addLocal(localName, phoneNumber, address, days, req.files)
      console.log(req.files)
      response.success(req, res, local, 201)
    } catch (error) {
      response.error(req, res, error.message, 400, error)
    }
  })

//------------------------------------------------------------------------------------------------
//2 ( UPDATE ) LOCAL
//------------------------------------------------------------------------------------------------

router.put('/:id', upload.array("image", 3), (req, res) => {
  const { localName, phoneNumber, address, days } = req.body

  controller.updateLocal(req.params.id, localName, phoneNumber, address, days, req.files)
    .then(data => {
      response.success(req, res, data, 200)
    })
    .catch(error => {
      response.success(req, res, error.message, 400, error)
    })
})

//------------------------------------------------------------------------------------------------
//3 ( DELETE ) LOCAL
//------------------------------------------------------------------------------------------------

router.delete('/:id', (req, res) => {
  controller.deleteLocal(req.params.id)
    .then(data => {
      response.success(req, res, data, 200)
    })
    .catch(error => {
      response.error(req, res, error.message, 400, error)
    })
})

//------------------------------------------------------------------------------------------------
//4 ( SHOW ) ALL LOCALS
//------------------------------------------------------------------------------------------------

router.get('/', async (req, res) => {
  const localName = req.query.localName || null
  const phoneNumber = req.query.phoneNumber || null
  const address = req.query.address || null
  const days = req.query.days || null

  try {
    const result = await controller.getAllPost(localName, phoneNumber, address, days)
    if (result === false) {
      response.status(400).json({
        message: 'Post not found'
      })
    }
    response.success(req, res, result, 200)
  } catch (error) {
    response.error(req, res, error.message, 400, error)
  }
})

//------------------------------------------------------------------------------------------------
//5 ( SHOW ) LOCAL BY ID
//------------------------------------------------------------------------------------------------

router.get('/:id', async (req, res) => {
  try {
    const result = await controller.getPost(req.params.id)
    if (result === false) {
      response.status(400).json({
        message: 'Post not found'
      })
    }
    response.success(req, res, result, 200)
  } catch (error) {
    response.error(req, res, error.message, 400, error)
  }
})

//------------------------------------------------------------------------------------------------
//MODULE EXPORTS
//------------------------------------------------------------------------------------------------

module.exports = router;