const { check, validationResult } = require('express-validator');
const conexion = require('../config/conexion');
var express = require('express') //llamamos a Express
var editorial= express()


 //--- define las prestamo de la API
// se puede probar con Postman
//http://localhost:8000/
editorial.get('/', function(req, res) {
    res.json({ mensaje: '¡Hola Mundo!' })  
  })
  
  //http://localhost:8000/usuarios
   editorial.get('/editoriales', function(req, res) {
    //res.json({ mensaje: '¡Listando editoriales!' })  
    let sql="select * from editoriales order by id"
   conexion.query(sql,(err,rows)=>{
       if(err) throw err;
       else{
           res.json(rows)
       }
   })
  
  })//endget
  
  //-- Obtiene uneditorial especifico 
  //---- get one user
  //http://localhost:8000/editoriales/5
  editorial.get('/editoriales/:id', function(req, res) {
    conexion.query("select * from editoriales where id = ?", [req.params.id],(err,rows)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
   })
  
  
  //--- listar editoriales
  //--guardar
  //-- Insertar un editorial
  editorial.post('/editoriales', function(req, res) {
    let sql = "insert into  editoriales set ?"
    const fecha=new Date
    console.log('editorial recibido: ',req.body);
    let poststr = {
        nombre: req.body.nombre,
        created: fecha,
        modified: fecha
    }
    conexion.query(sql, poststr, function (error, results) {
    if (error) throw error;
    if (results.affectedRows) {
     res.json({status: 'editorial guardado'})
   }
   else
     res.json({status: 'No se pudo guardar el editorial'})
    
  });  
  })//End editorial.post
  
  //--actualizar
  editorial.put('/editoriales', function (req, res) {
    const fecha=new Date
  let sql = "update editoriales set nombre= ?, modified = ? where id = ?"
    conexion.query(sql, [req.body.nombre,fecha,req.body.id], function (error, results) {
       if (error) throw error;
       if (results.affectedRows) {
        res.json({status: 'editorial actualizado'})
      }
      else
        res.json({status: 'No se pudo actualizar el editorial'})
     });
  });
  
  
  
  //--eliminar
  //---- eliminar un editorial
  editorial.delete('/editoriales/:id', function(req, res) {
    let sql ="delete from editoriales where id = ?"
    conexion.query(sql, [req.params.id], function (error, results) {
       if (error) throw error;
       if (results.affectedRows) {
         res.json({status: 'editorial eliminado'})
       }
       else
         res.json({status: 'No se pudo eliminar el editorial'})
     });
  })
  
  //--- Para exportar y se pueda usar en otro lado
  module.exports=editorial;
