/*

A controller is a function that you write to control data.

With a self-written controller, you can modify the data the way you want,
in this file is all the logic, everything that is modify, change or check, is done in that file.

  - CODE INDEX

    1.1 [PUT] ( SEND ) RECOVER PASSWORD LINK USER
    2.2 [PUT] ( CREATE ) NEW PASSWORD USER
    3.3 [PUT] ( SEND ) RECOVER PASSWORD LINK BUSINESSMAN
    4.4 [PUT] ( CREATE ) NEW PASSWORD BUSINESSMAN

  - MODULE EXPORTS

*/

const storage = require('./store')
const bcrypt = require('bcrypt')
const { config } = require('../../../config/index')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');
const { transporter } = require('../../../auth/mailer')

//------------------------------------------------------------------------------------------------
//CODE INDEX
//------------------------------------------------------------------------------------------------
//1.1 ( SEND ) RECOVER PASSWORD LINK USER
//------------------------------------------------------------------------------------------------

const recoverPassword = async (email) => {
  if (!email) {
    throw new Error('An email is required')
  }

  const emailExists = await storage.getOneByFilter({ email })

  if (emailExists.length >= 1) {
    try {
      const user = emailExists
      const recoverPasswordToken = jwt.sign({ user: user[0]._id, email: user[0].email, fullname: user[0].fullname}, `${config.recover_password}` ,{
        expiresIn: '30m'
      })
      const verificationLink = `${config.verification_link}${recoverPasswordToken}`
      
      const filter = {
        _id: user[0]._id
      }
      
      const userRefresh = {
        resetToken: recoverPasswordToken
      }

      const finalResponse ={
        Message: `Password recovery link sent correctly to the email ${user[0].email}`,
        Link: verificationLink,
      }
  
  // create reusable transporter object using the default SMTP transport
  
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'zmgcomida@gmail.com', // generated ethereal user
            pass: 'kgfpybjmeuldhqhr', // generated ethereal password
        },
    });
  
     // send mail with defined transport object
     await transporter.sendMail({
      from: '"comemx" <zmgcomida@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Recuperar contraseña", // Subject line
      //text: "Hello world?", // plain text body
      html:`
  
      <span> Hola, ${user[0].fullname}:</span>
  
      <p>Recibimos una solicitud para restablecer tu contraseña de <strong>comemx</strong>.
      Ingresa al siguiente link para restablecer la contraseña:</p>
  
      <a href="${verificationLink}"> ${verificationLink}</a>
      `
    });
  
      const userUpdate = await storage.update(filter, userRefresh)
      if (userUpdate) {
        return finalResponse
      } else {
        throw new Error('Update not done, user not found')
      }
    } catch (error){
      throw new Error('Something goes wrong')
    }
  } else {
    throw new Error('No search results')
  }
}

//------------------------------------------------------------------------------------------------
//2.2 ( CREATE ) NEW PASSWORD USER
//------------------------------------------------------------------------------------------------

const createNewPassword = async (password, recoverPasswordToken) => {
  if (!password || !recoverPasswordToken) {
    throw new Error('Missing data')
  }

  const recoverPasswordTokenData = jwt.verify(recoverPasswordToken, `${config.recover_password}`)
  const userId = recoverPasswordTokenData.user
  const userlData = await storage.getOneByFilter({ _id: userId })

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
    return "Password changed successfully"
  } else {
    throw new Error('User not found')
  }
}

//------------------------------------------------------------------------------------------------
//3.3 ( SEND ) RECOVER PASSWORD LINK BUSINESSMAN
//------------------------------------------------------------------------------------------------

const recoverPasswordBusinessman = async (email) => {
  if (!email) {
    throw new Error('An email is required')
  }

  const emailExists = await storage.getOneByFilterBusinessman({ email })

  if (emailExists.length >= 1) {
    try {
      const user = emailExists
      const recoverPasswordToken = jwt.sign({ user: user[0]._id, email: user[0].email, fullname: user[0].fullname}, `${config.recover_password}` ,{
        expiresIn: '30m'
      })
      const verificationLink = `${config.verification_link}${recoverPasswordToken}`
      
      const filter = {
        _id: user[0]._id
      }
      
      const userRefresh = {
        resetToken: recoverPasswordToken
      }

      const finalResponse ={
        Message: `Password recovery link sent correctly to the email ${user[0].email}`,
        Link: verificationLink,
      }
  
  // create reusable transporter object using the default SMTP transport
  
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'zmgcomida@gmail.com', // generated ethereal user
            pass: 'kgfpybjmeuldhqhr', // generated ethereal password
        },
    });
  
     // send mail with defined transport object
     await transporter.sendMail({
      from: '"comemx" <zmgcomida@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Recuperar contraseña", // Subject line
      //text: "Hello world?", // plain text body
      html:`
  
      <span> Hola, ${user[0].fullname}:</span>
  
      <p>Recibimos una solicitud para restablecer tu contraseña de <strong>comemx</strong>.
      Ingresa al siguiente link para restablecer la contraseña:</p>
  
      <a href="${verificationLink}"> ${verificationLink}</a>
      `
    });
  
      const userUpdate = await storage.updateBusinessman(filter, userRefresh)
      if (userUpdate) {
        return finalResponse
      } else {
        throw new Error('Update not done, user not found')
      }
    } catch (error){
      throw new Error('Something goes wrong')
    }
  } else {
    throw new Error('No search results')
  }
}

//------------------------------------------------------------------------------------------------
//4.4 ( CREATE ) NEW PASSWORD BUSINESSMAN
//------------------------------------------------------------------------------------------------

const createNewPasswordBusinessman = async (password, recoverPasswordToken) => {
  if (!password || !recoverPasswordToken) {
    throw new Error('Missing data')
  }

  const recoverPasswordTokenData = jwt.verify(recoverPasswordToken, `${config.recover_password}`)
  const userId = recoverPasswordTokenData.user
  const userlData = await storage.getOneByFilterBusinessman({ _id: userId })

   const newPassword = await bcrypt.hash(password, 10)

  const filter = {
    _id: userlData[0]._id
  }

  const userRefresh = {
    password: newPassword,
    resetToken: ""
  }

  const userUpdate = await storage.updateBusinessman(filter, userRefresh)
  if (userUpdate) {
    return "Password changed successfully"
  } else {
    throw new Error('User not found')
  }
}

//------------------------------------------------------------------------------------------------
//MODULE EXPORTS
//------------------------------------------------------------------------------------------------

module.exports = {
  recoverPassword,
  createNewPassword,
  recoverPasswordBusinessman,
  createNewPasswordBusinessman
}