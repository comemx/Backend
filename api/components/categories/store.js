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

const localCategories = require('../../../storage/models/categories')


const addCategories = async (body) => {
  const newCategorie = new localCategories(body)
  return newCategorie.save()
}

module.exports = {
  addCategories,
}