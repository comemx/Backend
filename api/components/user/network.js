/*

In this file is where we put all the routes, here we put the endpoints and information that has to do with the http protocol

  - GET - Collect information from the server.
  - POST - Add information to the server.
  - PUT - Replace information on the server.
  - PATCH - Update part of the information.
  - DELETE - Delete information from the server.
  - OPTIONS - Ask for information about methods (know if we can execute any of the previous methods).

*/

const express = require('express');
const response = require('../../../network/response');
const controller = require('./controller');
const router = express.Router();
const { upload } = require('../../../libs/multer');

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

  router.put('/:id', async (req, res) => {
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

router.post('/editimage/:id', upload, async (req, res) =>{
  const { id } = req.params
  try {
    const userImage = await controller.editImage(id, req.file)
    response.success(req, res, userImage, 201)
  } catch (error) {
    response.error(req, res, error.message, 400, error)
  }
})

module.exports = router;