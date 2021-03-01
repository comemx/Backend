/*

It is in charge of managing the database, here it is specified, where and when the information is saved

*/

const Model = require('../../../storage/models/user')

const addUser = async (user) => {
    const myUser = new Model(user)
    try {
      return await myUser.save()
    } catch (error) {
      throw new Error(error)
    }
  }

  const getOneByFilter = async (filter) => {
    const data = await Model.find(filter)
    return data
  }

  const updateUser = async (filter, update) => {
    return await Model.findOneAndUpdate(filter, update, {
      returnOriginal: false
    })
  }
  
  const putImage = async (filter, update) => {
    console.log("informacion", filter, update)
    return await Model.findOneAndUpdate(filter, update, {
      returnOriginal: false
    })
  }

  module.exports = {
    add: addUser,
    getOneByFilter,
    updateUser,
    putImage,
  }