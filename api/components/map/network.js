/*

In this file is where we put all the routes, here we put the endpoints and information that has to do with the http protocol

  - GET - Collect information from the server.
  - POST - Add information to the server.
  - PUT - Replace information on the server.
  - PATCH - Update part of the information.
  - DELETE - Delete information from the server.
  - OPTIONS - Ask for information about methods (know if we can execute any of the previous methods).

  - CODE INDEX

    1 [GET] ( SEARCH ) ON INPUT
    2 [GET] ( SEARCH ) ON CATEGORIES
    3 [GET] ( GET ) THE FIRST 10 LOCALS NEAR MY POSITION

  - MODULE EXPORTS

*/

const express = require('express');
const response = require('../../../network/response');
const controller = require('./controller');
const router = express.Router();

//------------------------------------------------------------------------------------------------
//1 ( SEARCH ) ON INPUT
//------------------------------------------------------------------------------------------------

router.get('/search', async (req, res) => {
  const { categories } = req.body
  const {long, lat} = req.query

  try {
    const data = await controller.searchLocals(categories, long, lat)
    response.success(req, res, data, 200)
  } catch (error) {
    response.error(req, res, 'Something wrong happend', 500, error)
  }
})

//------------------------------------------------------------------------------------------------
//2 ( SEARCH ) ON CATEGORIES
//------------------------------------------------------------------------------------------------



//------------------------------------------------------------------------------------------------
//3 ( GET ) THE FIRST 10 LOCALS NEAR MY POSITION
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