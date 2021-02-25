const express = require('express');
const response = require('../../../network/response');
const controller = require('./controller');
const router = express.Router();

router.post('/signup', async (req, res) => {
    const { fullname, email, username, password} = req.body
    try {
      //const resultImage = await cloudinary.v2.uploader.upload(req.file.path)
      const user = await controller.add(fullname, email, username, password)
      response.success(req, res, user, 201)
    } catch (error) {
      response.error(req, res, error.message, 400, error)
    }
  })

module.exports = router;