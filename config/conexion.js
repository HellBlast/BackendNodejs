//se carga el paquete o llama a la dependencia
const mysql = require('mysql2');//paquete mysql
const conexion = mysql.createConnection(
    {
        host:'localhost',
        user:'root',
        port: '3306',
        password:'',
        database:'biblioteca'
    }
);

// se abre oa conexion a la BD
conexion.connect(
    err=>{
        if(err){
            console.log('Error al conectar a la BD: '+err)
        }
        else{
            console.log('Conectado correctamente a ala BD')
        }
    }
);
// se exporta para ser usada en cualquier parte del proyecto
module.exports=conexion;
