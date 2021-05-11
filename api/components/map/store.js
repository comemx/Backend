/*

It is in charge of managing the database, here it is specified, where and when the information is saved

  - CODE INDEX

    1.1.1 [GET] ( SEARCH ) ON INPUT
    2.2.2 [GET] ( SEARCH ) ON CATEGORIES
    3.3.3 [GET] ( GET ) THE FIRST 10 LOCALS NEAR MY POSITION

  - MODULE EXPORTS

*/

const localModel = require('../../../storage/models/local')

//------------------------------------------------------------------------------------------------
//1.1.1 ( SEARCH ) ON INPUT
//------------------------------------------------------------------------------------------------

const search = async (categories, long, lat) => {
  try {
    const data = await localModel.find({published: true, categories: {$regex: `.*${categories}`, $options:"i"}, location:{$near:{$geometry:{type:"Point",coordinates:[`${long}`,`${lat}`]},$maxDistance:2000}}})
    if (data.length === 0) {
      return 'No se encontraron resultados'
    } else {
      return data
    }
  } catch (error) {
    throw new Error (error)
  }
}

//------------------------------------------------------------------------------------------------
//2.2.2 ( SEARCH ) ON CATEGORIES
//------------------------------------------------------------------------------------------------

const nearbyCategories = async (categories, long, lat) => {
  try {
    const data = await localModel.find({published: true, categories: categories, location:{$near:{$geometry:{type:"Point",coordinates:[`${long}`,`${lat}`]},$maxDistance:2000}}})
    if (data.length === 0) {
      return 'No se encontraron resultados'
    } else {
      return data
    }
  } catch (error) {
    throw new Error (error)
  }
}

//------------------------------------------------------------------------------------------------
//3.3.3 ( GET ) THE FIRST 10 LOCALS NEAR MY POSITION
//------------------------------------------------------------------------------------------------

const nearbyTen = async (long, lat) => {
  try {
    const data = await localModel.find({published: true, location:{$near:{$geometry:{type:"Point",coordinates:[`${long}`,`${lat}`]},$maxDistance:2000}}}).limit(10)
    if (data.length === 0) {
      return 'No se encontraron resultados'
    } else {
      return data
    }
  } catch (error) {
    throw new Error (error)
  }
}

//------------------------------------------------------------------------------------------------
//MODULE EXPORTS
//------------------------------------------------------------------------------------------------

module.exports = {
  search,
  nearbyCategories,
  nearbyTen
}