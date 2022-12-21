const { check, validationResult } = require('express-validator');
const conexion = require('../config/conexion');
var express = require('express') //llamamos a Express
var prestamo = express()


 //--- define las prestamo de la API
// se puede probar con Postman
//http://localhost:8000/
prestamo.get('/', function(req, res) {
    res.json({ mensaje: '¡Hola Mundo!' })  
  })
  
  //http://localhost:8000/usuarios
   prestamo.get('/prestamos', function(req, res) {
    //res.json({ mensaje: '¡Listando prestamos!' })  
    let sql="select * from prestamos order by id"
   conexion.query(sql,(err,rows)=>{
       if(err) throw err;
       else{
           res.json(rows)
       }
   })
  
  })//endget
  
  //-- Obtiene unprestamo especifico 
  //---- get one user
  //http://localhost:8000/prestamos/5
  prestamo.get('/prestamos/:id', function(req, res) {
    conexion.query("select * from prestamos where id = ?", [req.params.id],(err,rows)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
   })
  
  
  //--- listar prestamos
  //--guardar
  //-- Insertar un prestamo
  prestamo.post('/prestamos', function(req, res) {
    let sql = "insert into  prestamos set ?"
    const fecha=new Date
    console.log('Prestamo recibido: ',req.body);
    let poststr = {
        fecha: req.body.fecha,
        devolucion : req.body.devolucion,
        entrega: req.body.entrega,
        usuarios_id: req.body.usuarios_id,
        created: fecha,
        modified: fecha
    }
    conexion.query(sql, poststr, function (error, results) {
    if (error) throw error;
    if (results.affectedRows) {
     res.json({status: 'Prestamo guardado'})
   }
   else
     res.json({status: 'No se pudo guardar el prestamo'})
    
  });  
  })//End prestamo.post
  
  //--actualizar
  prestamo.put('/prestamos', function (req, res) {
    const fecha=new Date
  let sql = "update prestamos set fecha= ?,devolucion= ?,entrega = ?,usuarios_id=?,  modified = ? where id = ?"
    conexion.query(sql, [req.body.fecha,req.body.devolucion,req.body.entrega,req.body.usuarios_id,fecha,req.body.id], function (error, results) {
       if (error) throw error;
       if (results.affectedRows) {
        res.json({status: 'Prestamo actualizado'})
      }
      else
        res.json({status: 'No se pudo actualizar el prestamo'})
     });
  });
  
  
  
  //--eliminar
  //---- eliminar un prestamo
  prestamo.delete('/prestamos/:id', function(req, res) {
    let sql ="delete from prestamos where id = ?"
    conexion.query(sql, [req.params.id], function (error, results) {
       if (error) throw error;
       if (results.affectedRows) {
         res.json({status: 'Prestamo eliminado'})
       }
       else
         res.json({status: 'No se pudo eliminar el prestamo'})
     });
  })
  
  //--- Para exportar y se pueda usar en otro lado
  module.exports=prestamo;
