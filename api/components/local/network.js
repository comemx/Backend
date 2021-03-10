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
//2 client user modification
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
//3 client user image modification
//------------------------------------------------------------------------------------------------



//------------------------------------------------------------------------------------------------
//4 client user deletion
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
//5 client user login
//------------------------------------------------------------------------------------------------



module.exports = router;