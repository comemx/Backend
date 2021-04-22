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
const verifyToken = require('../../../auth/verifyToken');


//------------------------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------------------------

router.get('/published-premises', async (req, res) => {
  try {
    const data = await controller.publishedPremises()
    response.success(req, res, data, 200)
  } catch (error) {
    response.error(req, res, 'Something wrong happend', 500, error)
  }
})

//------------------------------------------------------------------------------------------------
//MODULE EXPORTS
//------------------------------------------------------------------------------------------------

module.exports = router;