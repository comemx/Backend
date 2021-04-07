/*

In this file is where we put all the routes, here we put the endpoints and information that has to do with the http protocol

  - GET - Collect information from the server.
  - POST - Add information to the server.
  - PUT - Replace information on the server.
  - PATCH - Update part of the information.
  - DELETE - Delete information from the server.
  - OPTIONS - Ask for information about methods (know if we can execute any of the previous methods).

  - CODE INDEX

    1 [POST] ( CREATE ) CATEGORIE
    2 [PUT] ( UPDATE ) CATEGORIE
    3 [DELETE] ( DELETE ) CATEGORIE

  - MODULE EXPORTS

*/

const express = require('express');
const response = require('../../../network/response');
const controller = require('./controller');
const router = express.Router();
const verifyToken = require('../../../auth/verifyToken');

//------------------------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------------------------

router.post('/add-categories/:id', verifyToken, async (req, res) => {
  const { id } = req.params
  try {
      const data = await controller.createCategories(id,req.body)
      console.log(req.body)
      response.success(req, res, data, 201)
    } catch (error) {
      response.error(req, res, error.message, 400, error)
    } 
})

//------------------------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------------------------

router.put('/:id', verifyToken, (req, res) => {
  const { id } = req.params

  controller.updateCategorie(id, req.body)
    .then(data => {
      console.log("network update categorie",req.body)
      response.success(req, res, data, 200)
    })
    .catch(error => {
      response.success(req, res, error.message, 400, error)
    })
})

//------------------------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------------------------

router.delete('/:id', verifyToken, (req, res) => {
  controller.deleteCategorie(req.params.id)
    .then(data => {
      response.success(req, res, data, 200)
    })
    .catch(error => {
      response.error(req, res, error.message, 400, error)
    })
})

//------------------------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------------------------

router.get('/', async (req, res) => {
  try {
      const data = await controller.getAllCategories()
      response.success(req, res, data, 201)
    } catch (error) {
      response.error(req, res, error.message, 400, error)
    } 
})


router.get('/:id', async (req, res) => {
  try {
    const result = await controller.getCategorieById(req.params.id)
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




module.exports = router;