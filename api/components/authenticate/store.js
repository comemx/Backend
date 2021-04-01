/*

It is in charge of managing the database, here it is specified, where and when the information is saved

  - CODE INDEX

    1.1.1 [POST] ( CREATE ) USER
    2.2.2 [PUT] ( UPDATE ) USER

  - MODULE EXPORTS
  
  */
 
 const userModel = require('../../../storage/models/user')
 const authenticateModel = require('../../../storage/models/authenticate')
 
 //------------------------------------------------------------------------------------------------
 //CODE INDEX
 //------------------------------------------------------------------------------------------------
 //1.1.1 ( CREATE ) USER
 //------------------------------------------------------------------------------------------------

 const getOneByFilter = async (filter) => {
  const data = await userModel.find(filter)
  return data
}

 const verifyExists = async (filter) => {
   const result = await authenticateModel.exists(filter)
    console.log("2", result)
   return result
 }


 const add = async (user) => {
   const myUser = new userModel(user)
   try {
     return await myUser.save()
    } catch (error) {
      throw new User(error)
  }
}



const pushToken = async (refreshTokenForDatabase) => {
  const myRefreshToken = new authenticateModel(refreshTokenForDatabase)
  try {
    return await myRefreshToken.save()
  } catch (error) {
    throw new User(error)
  }
}

//------------------------------------------------------------------------------------------------
//MODULE EXPORTS
//------------------------------------------------------------------------------------------------

module.exports = {
  add,
  pushToken,
  verifyExists,
  getOneByFilter,
}