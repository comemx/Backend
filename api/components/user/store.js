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

  module.exports = {
    add: addUser,
    getOneByFilter
  }