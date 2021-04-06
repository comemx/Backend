/*

A controller is a function that you write to control data.

With a self-written controller, you can modify the data the way you want,
in this file is all the logic, everything that is modify, change or check, is done in that file.

  - CODE INDEX

  - MODULE EXPORTS

*/

const storage = require('./store')
const bcrypt = require('bcrypt')
const { config } = require('../../../config/index')
const jwt = require('jsonwebtoken')
const { transporter } = require('../../../auth/mailer')

//------------------------------------------------------------------------------------------------
//CODE INDEX
//------------------------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------------------------

const recoverPassword = async (email) => {
  if (!email) {
    throw new Error('An email is required')
  }

  try {
    const emailExists = await storage.getOneByFilter({ email })
    const user = emailExists
    const recoverPasswordToken = jwt.sign({ user: user[0]._id, email: user[0].email, fullname: user[0].fullname}, `${config.recover_password}` ,{
      expiresIn: '30m'
    })
    const verificationLink = `${config.verification_link}${recoverPasswordToken}`
    
    const filter = {
      _id: user[0]._id
    }
    
    const userRefresh = {
      resetToken: verificationLink
    }


      // send mail with defined transport object
  await transporter.sendMail({
    from: '"Forgot password" <zmgcomida@gmail.com>', // sender address
    to: "orlandos.casta@gmail.com", // list of receivers
    subject: "Forgot password Subject line", // Subject line
    //text: "Hello world?", // plain text body
    html:`
    <b> Please click on the following link, or paste this into your browser to complete the process:</b>
    <a href="${verificationLink}"> ${verificationLink}</a>
    `
  });





    const userUpdate = await storage.update(filter, userRefresh)
    if (userUpdate) {
      return userUpdate
    } else {
      throw new Error('User not found')
    }
  

  } catch (error){
    throw new Error('Missing data')
  }

}

//------------------------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------------------------

const createNewPassword = async (password, recoverPasswordToken) => {
  if (!password || !recoverPasswordToken) {
    throw new Error('Missing data')
  }

  const recoverPasswordTokenData = jwt.verify(recoverPasswordToken, `${config.recover_password}`)
  const userId = recoverPasswordTokenData.user
  const userlData = await storage.getOneByFilter({ _id: userId })

  console.log("userlData", userlData[0].password)
   const newPassword = await bcrypt.hash(password, 10)


  const filter = {
    _id: userlData[0]._id
  }

  const userRefresh = {
    password: newPassword,
    resetToken: ""
  }

  const userUpdate = await storage.update(filter, userRefresh)
  if (userUpdate) {
    return userUpdate
  } else {
    throw new Error('User not found')
  }

  /* if (userUpdate) {
    if (userUpdate.password) {
      const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(userUpdate.password, 10, async (err, hashed) => {
          if (err) {
            reject(err)
          } else {
            resolve(hashed)
          }
        })
      })
      
      userUpdate.password = hashedPassword
    }
    const filter = {
      _id: userUpdate._id
    }
    const userUpdated = await storage.update(filter, userUpdate)
    if (userUpdated) {
      return userUpdated
    } else {
      throw new Error('User not found')
    }
  } else {
    throw new Error('Error updating user')
  } */
}

//------------------------------------------------------------------------------------------------
//MODULE EXPORTS
//------------------------------------------------------------------------------------------------

module.exports = {
  recoverPassword,
  createNewPassword,
}