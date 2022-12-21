const { check, validationResult } = require('express-validator');
const conexion = require('../config/conexion');
var express = require('express') //llamamos a Express
var categoria= express()


 //--- define las prestamo de la API
// se puede probar con Postman
//http://localhost:8000/
categoria.get('/', function(req, res) {
    res.json({ mensaje: '¡Hola Mundo!' })  
  })
  
  //http://localhost:8000/usuarios
   categoria.get('/categorias', function(req, res) {
    //res.json({ mensaje: '¡Listando categorias!' })  
    let sql="select * from categorias order by id"
   conexion.query(sql,(err,rows)=>{
       if(err) throw err;
       else{
           res.json(rows)
       }
   })
  
  })//endget
  
  //-- Obtiene uncategoria especifico 
  //---- get one user
  //http://localhost:8000/categorias/5
  categoria.get('/categorias/:id', function(req, res) {
    conexion.query("select * from categorias where id = ?", [req.params.id],(err,rows)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
   })
  
  
  //--- listar categorias
  //--guardar
  //-- Insertar un categoria
  categoria.post('/categorias', function(req, res) {
    let sql = "insert into categorias set ?"
    const fecha=new Date
    console.log('categoria recibida: ',req.body);
    let poststr = {
        nombre: req.body.nombre,
        created: fecha,
        modified: fecha
    }
    conexion.query(sql, poststr, function (error, results) {
    if (error) throw error;
    if (results.affectedRows) {
     res.json({status: 'categoria guardada'})
   }
   else
     res.json({status: 'No se pudo guardar la categoria'})
    
  });  
  })//End categoria.post
  
  //--actualizar
  categoria.put('/categorias', function (req, res) {
    const fecha=new Date
  let sql = "update categorias set nombre= ?, modified = ? where id = ?"
    conexion.query(sql, [req.body.nombre,fecha,req.body.id], function (error, results) {
       if (error) throw error;
       if (results.affectedRows) {
        res.json({status: 'categoria actualizada'})
      }
      else
        res.json({status: 'No se pudo actualizar la categoria'})
     });
  });
  
  
  
  //--eliminar
  //---- eliminar un categoria
  categoria.delete('/categorias/:id', function(req, res) {
    let sql ="delete from categorias where id = ?"
    conexion.query(sql, [req.params.id], function (error, results) {
       if (error) throw error;
       if (results.affectedRows) {
         res.json({status: 'categoria eliminada'})
       }
       else
         res.json({status: 'No se pudo eliminar la categoria'})
     });
  })
  
  //--- Para exportar y se pueda usar en otro lado
  module.exports=categoria;
