/*

Index.js, is in charge of receiving the requests, it is the server,
it will verify that the requests are correct to enter the server or cancel them,
it has important configuration, database, headers, etc. the server.js
sends the information to response.js and route.js

*/

const expres = require('express');
const { config } = require('./config');
const cors = require('cors')
const app = expres();

// [configuration body-parser]

//validación que sí estemos en desarrollo
if(config.env === 'development'){
	console.log('[ Development config ]');
}

// [routes]

// [static files]

// [starting server]
app.use('/', function(req, res){
    res.send('hola mundo');
})

app.listen(config.port, (err) => {
    if (err) console.error();
    else console.log(`[ Server running on port ${config.port} ]`);
});