/*

A controller is a function that you write to control data.

With a self-written controller, you can modify the data the way you want,
in this file is all the logic, everything that is modify, change or check, is done in that file.

  - CODE INDEX

    1.1 [POST] ( CREATE ) LOCAL
    2.2 [PUT] ( UPDATE ) LOCAL
    3.3 [DELETE] ( DELETE ) LOCAL
    4.4 [GET] ( SHOW ) ALL LOCALS
    5.5 [GET] ( SHOW ) LOCAL BY ID

  - MODULE EXPORTS

*/

const storage = require('./store')
//------------------------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------------------------

const createCategories = async (body) => {
    try{
      const newCategorie = await storage.addCategories(body)
  
      finalResponse = {
        newCategorie,
        'System message': 'Categories successfully created'
      }
      
      return (finalResponse)
    } catch (error) {
      throw new Error(error)
    }
  }
//------------------------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------------------------

const updateCategorie = (id, body) => {
  return new Promise((resolve, reject) => {
    /* if (!id || !localName || !phoneNumber || !address || !days) {
      reject('Missing data')
    } */
    console.log("controller update categorie",id, body)

   /*  let imageUrl = ''
  if(arrayOfImage) {
    imageUrl = arrayOfImage.location
  } */

  /* const image = arrayOfImage.map(function (arrayOfImage) {
    return arrayOfImage.location
  }) */

    const categorie = {
      id,
      body
    }

    const result = storage.update(id, body)

    const finalResponse = {
      categorie,
      'System Message': 'Local succesfully updated'
    }
    resolve(finalResponse)
  })
}

module.exports = {
  createCategories,
  updateCategorie,
}



