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
const { upload } = require('../../../libs/multerArray');
const checkAuth = require('../../../auth/check-auth');

//------------------------------------------------------------------------------------------------
//1 client user creation
//------------------------------------------------------------------------------------------------

router.post('/addlocal ', upload, async (req, res) => {
  const { localName, phoneNumber, address, days } = req.body
    try {
      const local = await controller.add(localName, phoneNumber, address, days, req.file)
      response.success(req, res, local, 201)
    } catch (error) {
      response.error(req, res, error.message, 400, error)
    }
  })

//------------------------------------------------------------------------------------------------
//2 client user modification
//------------------------------------------------------------------------------------------------
 
//------------------------------------------------------------------------------------------------
//3 client user image modification
//------------------------------------------------------------------------------------------------



//------------------------------------------------------------------------------------------------
//4 client user deletion
//------------------------------------------------------------------------------------------------



//------------------------------------------------------------------------------------------------
//5 client user login
//------------------------------------------------------------------------------------------------



module.exports = router;