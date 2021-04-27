const { config } = require('../config/index'); //configuracion para variables de entorno
const aws = require("aws-sdk");// llamando al modulo
const multer = require("multer");//requerimos multer, el modulo de multer
const multerS3 = require("multer-s3");//llamando al modulo de s3
const  { nanoid }  =  require ("nanoid")

const spacesEndpoint = new aws.Endpoint(`${config.s3_endpoint}`);//devuelve una instancia del s3 endpoint y lo guardamos en una variable

const s3 = new aws.S3({
  endpoint: spacesEndpoint,
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
      cb(null, true)
  } else {
      cb(new Error('Invalid Mime Type, only JPEG and PNG'), false);
  }
}

const saslimits = (req, file, cb) => {
  if (file.size >= "622") {
      cb(null, true)
  } else {
      cb(new Error('Archivo demaciado pesado'), false);
  }
}

const upload = multer({
  fileFilter,
  limits: {fileSize: 2000000},
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
      const image_id = nanoid()
      const name_file = file.originalname
      const name = image_id + name_file
      cb(null, name);// const filetypes = /jpg|png/ https://www.youtube.com/watch?v=AbJ-y2vZgBs&ab_channel=Fazt
    },
  }),
});//nombre del input o campo por el cual se va a subir / single es para un archivo y array para muchos

module.exports = { upload, s3, };


/* const deleteFileFromS3 = () => {
  const params = {
    Bucket: 'codeztech', // pass your bucket name
    Key: fileName, // file will be saved as testBucket/contacts.csv
  };
  s3.deleteObject(params, function(err, data) {
    if (err) 
      console.log(err, err.stack);  // error
    else    
     console.log(chalk.green("File Successfully Deleted!"));
  });
};  */



/* 
const deleteFileFromDOPromise = (fileUrl) => {
  const params = {
    Bucket: config.bucket_name,
    Key: fileUrl,
  }

  return new Promise((resolve, reject) => {
    s3.deleteObject(params, (err, data) => {
      if(err) {
        reject(err);
      } else {
        resolve(data);
      }
    })
  })
} */