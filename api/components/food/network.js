/*

In this file is where we put all the routes, here we put the endpoints and information that has to do with the http protocol

  - GET - Collect information from the server.
  - POST - Add information to the server.
  - PUT - Replace information on the server.
  - PATCH - Update part of the information.
  - DELETE - Delete information from the server.
  - OPTIONS - Ask for information about methods (know if we can execute any of the previous methods).

  - CODE INDEX

  - MODULE EXPORTS

*/

const express = require('express');
const response = require('../../../network/response');
const controller = require('./controller');
const router = express.Router();
const { upload } = require('../../../libs/multer');
const verifyToken = require('../../../auth/verifyToken');

//------------------------------------------------------------------------------------------------
//1 ( CREATE ) LOCAL
//------------------------------------------------------------------------------------------------

router.post('/:id', verifyToken, upload.single('image'), async (req, res) => {
  const { id } = req.params
  const { name, price, description } = req.body
  
  try {
      const food = await controller.createFood(id, name, price, description, req.file)
      response.success(req, res, food, 201)
    } catch (error) {
      response.error(req, res, error.message, 400, error)
    }
})

//------------------------------------------------------------------------------------------------
//2 ( UPDATE ) LOCAL
//------------------------------------------------------------------------------------------------

router.put('/:id', verifyToken, upload.single('image'), (req, res) => {
  const { name, price, description } = req.body

  controller.updateFood(req.params.id, name, price, description, req.file)
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

router.delete('/:id',verifyToken, async (req, res) => {
  const { id } = req.params

  try {
    const food = await controller.deleteFood(id)
    response.success(req, res, "Food succesfully remove")
  } catch (error) {
    response.error(req, res, error.message, 400, error)
  }
})

//------------------------------------------------------------------------------------------------
//4 ( SHOW ) ALL LOCALS
//------------------------------------------------------------------------------------------------

router.get('/', async (req, res) => {
  const name = req.query.name || null
  const price = req.query.price || null
  const description = req.query.description || null

  try {
    const result = await controller.getAllFoods(name, price, description)
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
    const result = await controller.getFoodById(req.params.id)
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
//
//------------------------------------------------------------------------------------------------

router.get('/locals-foods/:id', verifyToken, async (req, res) => {
  const { id } = req.params

  try {
    const data = await controller.getFoodsOfLocal(id)
    response.success(req, res, data, 200)
  } catch (error) {
    response.error(req, res, error.message, 400)
  }
})


//------------------------------------------------------------------------------------------------
//MODULE EXPORTS
//------------------------------------------------------------------------------------------------

module.exports = router;