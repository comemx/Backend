/*

It is in charge of managing the database, here it is specified, where and when the information is saved

  - CODE INDEX

    1.1.1 [POST] ( CREATE ) LOCAL
    2.2.2 [PUT] ( UPDATE ) LOCAL
    3.3.3 [DELETE] ( DELETE ) LOCAL
    4.4.4 [GET] ( SHOW ) ALL LOCALS
    5.5.5 [GET] ( SHOW ) LOCAL BY ID

  - MODULE EXPORTS

*/

const localModel = require('../../../storage/models/local')
const userModel = require('../../../storage/models/user')
const businessmanModel = require('../../../storage/models/businessman')

//------------------------------------------------------------------------------------------------
//1.1.1 ( CREATE ) LOCAL
//------------------------------------------------------------------------------------------------
const getAllPublishedPremises = () => {
  return localModel.find({ published: true})
}

//------------------------------------------------------------------------------------------------
//MODULE EXPORTS
//------------------------------------------------------------------------------------------------

module.exports = {
  getAllPublishedPremises
}