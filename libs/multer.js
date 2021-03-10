const aws = require("aws-sdk");// llamando al modulo
const multer = require("multer");//requerimos multer, el modulo de multer
const multerS3 = require("multer-s3");//llamando al modulo de s3
const { config } = require('../config/index'); //configuracion para variables de entorno

const spacesEndpoint = new aws.Endpoint(`${config.s3_endpoint}`);//devuelve una instancia del s3 endpoint y lo guardamos en una variable

const s3 = new aws.S3({
  endpoint: spacesEndpoint,
});

const upload = multer({
  storage: multerS3({//configuramos como se almacenaran los archivos y donde guardarlos
    s3,//para espesificar el endpoint necesitamos s3 lo espoesificamos aqui, por esto necesitamos el aws-sdk
    bucket: config.bucket_name,//espesificamos el bucket, que es el nombre de tu space en digitalocean
    acl: 'public-read',
    metadata: (req, file, cb) => {// propiedad de multer s3 relacionadas con el archivo perse, METADATA, (datos de los datos)
      cb(null, {//dc es para terminar el paso del archivo
        fieldName: file.fieldname, //espesificamos que el nombre del archivo sea el nombre original
      });
    },
    key: (request, file, cb) => {// propiedad key, coloca el nombre mas la extension
      console.log(file);
      cb(null, file.originalname);// const filetypes = /jpg|png/ https://www.youtube.com/watch?v=AbJ-y2vZgBs&ab_channel=Fazt
    },
  }),
});//nombre del input o campo por el cual se va a subir / single es para un archivo y array para muchos

module.exports = { upload, s3, };