const expres = require('express');

var app = expres();

app.use('/', function(req, res){
    res.send('hola');
})

app.listen(3000);
console.log('la aplicacion esta escuchando en el puerto 3000');