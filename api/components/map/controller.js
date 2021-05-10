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
    
    if(!categories) {
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


//------------------------------------------------------------------------------------------------
//3.3 ( GET ) THE FIRST 10 LOCALS NEAR MY POSITION
//------------------------------------------------------------------------------------------------

const publishedPremises = () => {
  return storage.getAllPublishedPremises()
}

//------------------------------------------------------------------------------------------------
//MODULE EXPORTS
//------------------------------------------------------------------------------------------------

module.exports = {
  searchLocals,
  publishedPremises
}



