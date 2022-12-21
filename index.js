var express = require('express')
const bodyParser = require('body-parser');
var app = express()
app.use(bodyParser.json())              
var port = process.env.PORT || 8000  
app.set('port',port) 

//-- para dar accesos desde cualquier servidor
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

//--- llamar a los controladores  
app.use('/',require('./controller/usuarioController'));
app.use('/', require('./controller/prestamoController'));
app.use('/', require('./controller/pagoController'));
app.use('/', require('./controller/libroController'));
app.use('/', require('./controller/editorialController'));
app.use('/', require('./controller/categoriaController'));
app.use('/', require('./controller/detalleController'));

//-----------------------------------------------------------
app.get('*', function(req, res){
    res.json({status: 'Pagina no encontrada 404!'})
    res.statusCode = 404;
});

app.listen(app.get('port'),(err)=>{
    if(err){
        console.log('Error iniciando el Servidor: '+err)
    }
    else{
        console.log('Server is runing in port: http://localhost:'+port)
    }
})
  

