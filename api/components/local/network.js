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
//1 ( CREATE ) LOCAL
//------------------------------------------------------------------------------------------------

router.post('/addlocal/:id', verifyToken, upload.array('image', 3), async (req, res) => {
  const { id } = req.params
  const { localName, phoneNumber, address, coordinates, days } = req.body
  try {
      const local = await controller.createLocal( id, localName, phoneNumber, address, coordinates, days, req.files )
      console.log(req.files)
      response.success(req, res, local, 201)
    } catch (error) {
      response.error(req, res, error.message, 400, error)
    }
})

//------------------------------------------------------------------------------------------------
//2 ( UPDATE ) LOCAL
//------------------------------------------------------------------------------------------------

router.put('/:id', verifyToken, upload.array('image', 3), (req, res) => {
  const { id } = req.params
  const { localName, phoneNumber, address, coordinates, days } = req.body

  controller.updateLocal(id, localName, phoneNumber, address, coordinates, days, req.files)
    .then(data => {
      response.success(req, res, data, 200)
    })
    .catch(error => {
      response.success(req, res, error.message, 400, error)
    })
})

//------------------------------------------------------------------------------------------------
//( UPDATE ) LOGO
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
//3 ( DELETE ) LOCAL
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
//4 ( SHOW ) ALL LOCALS
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
//5 ( SHOW ) LOCAL BY ID
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
// 6. [POST] - ADD FAVOTITE POSTS
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
// 7. [delete] - DELETE FAVOTITE POSTS
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
//
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