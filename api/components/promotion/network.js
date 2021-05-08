/*

In this file is where we put all the routes, here we put the endpoints and information that has to do with the http protocol

  - GET - Collect information from the server.
  - POST - Add information to the server.
  - PUT - Replace information on the server.
  - PATCH - Update part of the information.
  - DELETE - Delete information from the server.
  - OPTIONS - Ask for information about methods (know if we can execute any of the previous methods).

  - CODE INDEX

    1 [POST] ( CREATE ) PROMOTION
    2 [PUT] ( UPDATE ) PROMOTION
    3 [PUT] ( UPDATE ) PROMOTION IMAGE
    4 [DELETE] ( DELETE ) PROMOTION
    5 [GET] ( SHOW ) ALL PROMOTIONS
    6 [GET] ( SHOW ) PROMOTION BY ID

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
//1 ( CREATE ) PROMOTION
//------------------------------------------------------------------------------------------------

router.post('/:id', validations.validate(validations.createAndUpdateFoodPromotionsValidation), verifyToken, async (req, res) => {
  const { id } = req.params
  const { name, price, description } = req.body
  
  try {
      const food = await controller.createFood(id, name, price, description)
      response.success(req, res, food, 201)
    } catch (error) {
      response.error(req, res, error.message, 400, error)
    }
})

//------------------------------------------------------------------------------------------------
//2 ( UPDATE ) PROMOTION
//------------------------------------------------------------------------------------------------

router.put('/:id', validations.validate(validations.createAndUpdateFoodPromotionsValidation), verifyToken, (req, res) => {
  const { id } = req.params
  const { name, price, description } = req.body

  controller.updatePromotion(id, name, price, description)
    .then(data => {
      response.success(req, res, data, 200)
    })
    .catch(error => {
      response.success(req, res, error.message, 400, error)
    })
})

//------------------------------------------------------------------------------------------------
//3 ( UPDATE ) PROMOTION IMAGE
//------------------------------------------------------------------------------------------------

router.post('/editimage/:id', verifyToken, upload.single('image'), async (req, res) =>{
  const { id } = req.params
  try {
    const foodImage = await controller.editPromotionImage(id, req.file)
    response.success(req, res, foodImage, 201)
  } catch (error) {
    response.error(req, res, error.message, 400, error)
  }
})

//------------------------------------------------------------------------------------------------
//4 ( DELETE ) PROMOTION
//------------------------------------------------------------------------------------------------

router.delete('/:id',verifyToken, async (req, res) => {
  const { id } = req.params

  try {
    const food = await controller.deleteFood(id)
    response.success(req, res, "Promotion succesfully remove")
  } catch (error) {
    response.error(req, res, error.message, 400, error)
  }
})

//------------------------------------------------------------------------------------------------
//5 ( SHOW ) ALL PROMOTIONS
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
//6 ( SHOW ) PROMOTION BY ID
//------------------------------------------------------------------------------------------------

router.get('/:id', verifyToken, async (req, res) => {
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
//MODULE EXPORTS prueba
//------------------------------------------------------------------------------------------------

module.exports = router;