require('dotenv').config(); //requerimos dotenv a la vez que ejecutamos la funcion config

const config = { // Definimos un objeto config
	//llamamos la variable ENV desde el process.env y hacemos una validacion de seguridad
	// para indicar que no estemos en modo de producción
	env: process.env.ENV,
	// de igual forma llamamos al puerto
	port: process.env.PORT,

	mongo: process.env.MONGO,

	bucket_name: process.env.BUCKET_NAME,

	aws_access_key: process.env.AWS_ACCESS_KEY,

	aws_secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,

	s3_endpoint: process.env.S3_ENDPOINT,

	access_token_secret: process.env.ACCESS_TOKEN_SECRET,
	
	refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,

	recover_password: process.env.RECOVER_PASSWORD,

	verification_link: process.env.VERIFICATION_LINK,
};

//exportamos el objeto config
module.exports = { config };