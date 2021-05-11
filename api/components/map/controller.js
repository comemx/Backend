/*

A controller is a function that you write to control data.

With a self-written controller, you can modify the data the way you want,
in this file is all the logic, everything that is modify, change or check, is done in that file.

  - CODE INDEX

    1.1 [GET] ( SEARCH ) ON INPUT
    2.2 [GET] ( SEARCH ) ON CATEGORIES
    3.3 [GET] ( GET ) THE FIRST 10 LOCALS NEAR MY POSITION

  - MODULE EXPORTS

*/

const storage = require('./store')

//------------------------------------------------------------------------------------------------
//1.1 ( SEARCH ) ON INPUT
//------------------------------------------------------------------------------------------------

const searchLocals = async (categories, long, lat) => {
  try {
    if(!categories || !long || !lat) {
      throw new Error('Missing data')
    }

    const newSearch = await storage.search(categories, long, lat)

    finalResponse = {
      newSearch,
      'System message': 'Search successful'
    }
    
    return (finalResponse)

  } catch (error) {
    throw new Error(error)
  }

}

//------------------------------------------------------------------------------------------------
//2.2 ( SEARCH ) ON CATEGORIES
//------------------------------------------------------------------------------------------------

const searchCategories = async (categories, long, lat) => {
  try {
    if(!long || !lat) {
      throw new Error('Missing data')
    }

    const newNerbyCategories = await storage.nearbyCategories(categories, long, lat)

    finalResponse = {
      newNerbyCategories,
      'System message': 'Category search performed successfully'
    }
    
    return (finalResponse)

  } catch (error) {
    throw new Error(error)
  }
}

//------------------------------------------------------------------------------------------------
//3.3 ( GET ) THE FIRST 10 LOCALS NEAR MY POSITION
//------------------------------------------------------------------------------------------------

const nearbyPremises = async (long, lat) => {
  try {
    if(!long || !lat) {
      throw new Error('Missing data')
    }

    const newNerby = await storage.nearbyTen(long, lat)

    finalResponse = {
      newNerby,
      'System message': 'Search for nearby premises successful'
    }
    
    return (finalResponse)

  } catch (error) {
    throw new Error(error)
  }
}

//------------------------------------------------------------------------------------------------
//MODULE EXPORTS
//------------------------------------------------------------------------------------------------

module.exports = {
  searchLocals,
  searchCategories,
  nearbyPremises
}



