/*

It is in charge of managing the database, here it is specified, where and when the information is saved

  - CODE INDEX

    1.1.1 [POST] ( CREATE ) CATEGORIE
    2.2.2 [PUT] ( UPDATE ) CATEGORIE
    3.3.3 [DELETE] ( DELETE ) CATEGORIE

  - MODULE EXPORTS

*/

const localCategories = require('../../../storage/models/categories')
const localModel = require('../../../storage/models/local')

//------------------------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------------------------

const addCategories = async (id, body) => {
  const newCategorie = new localCategories(body)
  const localData = await localModel.findById(id)
  localData.categories.push(newCategorie)
  localData.save()
  localModel.updateOne()
  return newCategorie.save()
}

//------------------------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------------------------

const update = async (id, body) => {
  let retrievedCategori = await localCategories.findOne({
    _id: id
  })

  let entrie = Object.entries(retrievedCategori)
  entrie = Object.entries(body)

  retrievedCategori = Object.fromEntries(entrie)

  console.log(retrievedCategori)
  const newdLocal = await localCategories.findByIdAndUpdate(id, retrievedCategori)
  return newdLocal
}

//------------------------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------------------------

const remove = (id) => {
  return localCategories.deleteOne({
    _id: id
  })
}

//------------------------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------------------------

const allCategories = async () => {
  const data = await localCategories.find()
  return data
}

//------------------------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------------------------

const getOneCategorieByIdDb = async (id) => {
  const posts = await localCategories.findOne({ _id: id })
  return posts
}

//------------------------------------------------------------------------------------------------
//MODULE EXPORTS
//------------------------------------------------------------------------------------------------

module.exports = {
  addCategories,
  update,
  remove,
  allCategories,
  getOneCategorieByIdDb,
}