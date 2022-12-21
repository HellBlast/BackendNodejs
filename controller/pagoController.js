const { check, validationResult } = require('express-validator');
const conexion = require('../config/conexion');
var express = require('express') //llamamos a Express
var pago= express()


 //--- define las prestamo de la API
// se puede probar con Postman
//http://localhost:8000/
pago.get('/', function(req, res) {
    res.json({ mensaje: '¡Hola Mundo!' })  
  })
  
  //http://localhost:8000/usuarios
   pago.get('/pagos', function(req, res) {
    //res.json({ mensaje: '¡Listando pagos!' })  
    let sql="select * from pagos order by id"
   conexion.query(sql,(err,rows)=>{
       if(err) throw err;
       else{
           res.json(rows)
       }
   })
  
  })//endget
  
  //-- Obtiene unpago especifico 
  //---- get one user
  //http://localhost:8000/pagos/5
  pago.get('/pagos/:id', function(req, res) {
    conexion.query("select * from pagos where id = ?", [req.params.id],(err,rows)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
   })
  
  
  //--- listar pagos
  //--guardar
  //-- Insertar un pago
  pago.post('/pagos', function(req, res) {
    let sql = "insert into  pagos set ?"
    const fecha=new Date
    console.log('pago recibido: ',req.body);
    let poststr = {
        fecha: req.body.fecha,
        valor : req.body.valor,
        concepto: req.body.concepto,
        usuarios_id: req.body.usuarios_id,
        created: fecha,
        modified: fecha
    }
    conexion.query(sql, poststr, function (error, results) {
    if (error) throw error;
    if (results.affectedRows) {
     res.json({status: 'pago guardado'})
   }
   else
     res.json({status: 'No se pudo guardar el pago'})
    
  });  
  })//End pago.post
  
  //--actualizar
  pago.put('/pagos', function (req, res) {
    const fecha=new Date
  let sql = "update pagos set fecha= ?,valor= ?,concepto = ?,usuarios_id=?,  modified = ? where id = ?"
    conexion.query(sql, [req.body.fecha,req.body.valor,req.body.concepto,req.body.usuarios_id,fecha,req.body.id], function (error, results) {
       if (error) throw error;
       if (results.affectedRows) {
        res.json({status: 'pago actualizado'})
      }
      else
        res.json({status: 'No se pudo actualizar el pago'})
     });
  });
  
  
  
  //--eliminar
  //---- eliminar un pago
  pago.delete('/pagos/:id', function(req, res) {
    let sql ="delete from pagos where id = ?"
    conexion.query(sql, [req.params.id], function (error, results) {
       if (error) throw error;
       if (results.affectedRows) {
         res.json({status: 'pago eliminado'})
       }
       else
         res.json({status: 'No se pudo eliminar el pago'})
     });
  })
  
  //--- Para exportar y se pueda usar en otro lado
  module.exports=pago;
