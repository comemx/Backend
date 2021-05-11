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
    3 [POST] ( UPDATE ) LOCAL IMAGES
    4 [POST] ( UPDATE ) LOCAL LOGO
    5 [DELETE] ( DELETE ) LOCAL
    6 [GET] ( SHOW ) ALL LOCALS
    7 [GET] ( SHOW ) LOCAL BY ID
    8 [POST] (ADD) FAVOTITE POSTS
    9 [DELETE] (DELETE) FAVOTITE POSTS
    10 [POST] (CREATE) PHOTO MENU

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
//1 ( CREATE ) LOCAL
//------------------------------------------------------------------------------------------------

router.post('/addlocal/:id', verifyToken, async (req, res) => {
  const { id } = req.params
  const { localName, phoneNumber, address, location, days, categories } = req.body
  try {
      const local = await controller.createLocal( id, localName, phoneNumber, address, location, days, categories )
      response.success(req, res, local, 201)
    } catch (error) {
      response.error(req, res, error.message, 400, error)
    }
})

//------------------------------------------------------------------------------------------------
//2 ( UPDATE ) LOCAL
//------------------------------------------------------------------------------------------------

router.put('/:id', validations.validate(validations.createLocalValidation), verifyToken, (req, res) => {
  const { id } = req.params
  const { localName, phoneNumber, address, coordinates, days } = req.body

  controller.updateLocal(id, localName, phoneNumber, address, coordinates, days)
    .then(data => {
      response.success(req, res, data, 200)
    })
    .catch(error => {
      response.success(req, res, error.message, 400, error)
    })
})

//------------------------------------------------------------------------------------------------
//3 ( UPDATE ) LOCAL IMAGES
//------------------------------------------------------------------------------------------------

router.post('/local-images/:id', verifyToken, upload.array('image', 3), async (req, res) =>{
  const { id } = req.params
  try {
    const logoImage = await controller.editLocalImages(id, req.files)
    response.success(req, res, logoImage, 201)
  } catch (error) {
    response.error(req, res, error.message, 400, error)
  }
})

//------------------------------------------------------------------------------------------------
//4 ( UPDATE ) LOGO
//------------------------------------------------------------------------------------------------

router.post('/logo/:id', verifyToken, upload.single('logo'), async (req, res) =>{
  const { id } = req.params
  try {
    const logoImage = await controller.editLogoImage(id, req.file)
    response.success(req, res, logoImage, 201)
  } catch (error) {
    response.error(req, res, error.message, 400, error)
  }
})

//------------------------------------------------------------------------------------------------
//5 ( DELETE ) LOCAL
//------------------------------------------------------------------------------------------------

router.delete('/:id',verifyToken, async (req, res) => {
  const { id } = req.params

  try {
    const user = await controller.deleteLocal(id, req.userData.id)
    response.success(res, res, `Local ${id} has been removed`)
  } catch (error) {
    response.error(req, res, error.message, 400, error)
  }
})

//------------------------------------------------------------------------------------------------
//6 ( SHOW ) ALL LOCALS
//------------------------------------------------------------------------------------------------

router.get('/', async (req, res) => {
  const localName = req.query.localName || null
  const phoneNumber = req.query.phoneNumber || null
  const address = req.query.address || null
  const days = req.query.days || null

  try {
    const result = await controller.getAllLocals(localName, phoneNumber, address, days)
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
//7 ( SHOW ) LOCAL BY ID
//------------------------------------------------------------------------------------------------

router.get('/:id', async (req, res) => {
  try {
    const result = await controller.getLocalById(req.params.id)
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
//8 ( ADD ) FAVOTITE POSTS
//------------------------------------------------------------------------------------------------

router.post('/add-favorite/:id', verifyToken, async (req, res) => {
  const { id } = req.params

  try {
    const data = await controller.favoritePost(id, req.userData.id)
    response.success(req, res, data, 200)
  } catch (error) {
    response.error(req, res, error.message, 400, error)
  }
})

//------------------------------------------------------------------------------------------------
//9 ( DELETE ) FAVOTITE POSTS
//------------------------------------------------------------------------------------------------

router.delete('/delete-favorite/:id', verifyToken, async (req, res) => {
  const { id } = req.params

  try {
    const data = await controller.favoritePost(id, req.userData.id)
    response.success(req, res, data, 200)
  } catch (error) {
    response.error(req, res, error.message, 400, error)
  }
})

//------------------------------------------------------------------------------------------------
//10 (CREATE) PHOTO MENU
//------------------------------------------------------------------------------------------------

router.post('/photo_menu/:id', verifyToken, upload.array('photoMenu', 2), async (req, res) =>{
  const { id } = req.params
  try {
    const logoImage = await controller.editMenuImage(id, req.files)
    response.success(req, res, logoImage, 201)
  } catch (error) {
    response.error(req, res, error.message, 400, error)
  }
})

//------------------------------------------------------------------------------------------------
//MODULE EXPORTS
//------------------------------------------------------------------------------------------------

module.exports = router;