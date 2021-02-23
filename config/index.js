require('dotenv').config(); //requerimos dotenv a la vez que ejecutamos la funcion config

const config = { // Definimos un objeto config
	//llamamos la variable ENV desde el process.env y hacemos una validacion de seguridad
	// para indicar que no estemos en modo de producción
	env: process.env.ENV,
	// de igual forma llamamos al puerto
	port: process.env.PORT,
};

//exportamos el objeto config
module.exports = { config };