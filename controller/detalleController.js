const { check, validationResult } = require('express-validator');
const conexion = require('../config/conexion');
var express = require('express') //llamamos a Express
var detalle = express()


//--- define las detalle de la API
// se puede probar con Postman
//http://localhost:8000/
detalle.get('/', function (req, res) {
  res.json({ mensaje: '¡Hola Mundo!' })
})

//http://localhost:8000/detalles
detalle.get('/detalles', function (req, res) {
  //res.json({ mensaje: '¡Listando registros!' })  
  let sql = "select * from detalles order by id"
  conexion.query(sql, (err, rows) => {
    if (err) throw err;
    else {
      res.json(rows)
    }
  })

})//endget

detalle.get('/detalle_prestamo/:id', function (req, res) {
  conexion.query("SELECT u.documento, u.nombres, u.apellidos, u.telefono, u.direccion, p.id, p.entrega, p.devolucion FROM detalles u INNER JOIN prestamos p on p.detalles_id=u.id where u.id= ?", [req.params.id], (err, rows) => {
    if (err) throw err;
    else {
      res.json(rows)
    }
  })
})

//-- Obtiene un usuario especifico 
//---- get one user
//http://localhost:8000/detalles/5
detalle.get('/detalles/:id', function (req, res) {
  conexion.query("select * from detalles where id = ?", [req.params.id], (err, rows) => {
    if (err) throw err;
    else {
      res.json(rows)
    }
  })
})

detalle.get('/detalles_libros/:id', function (req, res) {
    conexion.query("SELECT l.id, l.titulo, l.precio FROM usuarios u inner JOIN prestamos p on p.usuarios_id=u.id inner join detalles d on d.prestamos_id=p.id inner JOIN libros l on l.id=d.libros_id where u.id=?", [req.params.id], (err, rows) => {
      if (err) throw err;
      else {
        res.json(rows)
      }
    })
})



//--- listar detalles
//--guardar
//-- Insertar un usuario
detalle.post('/detalles', function (req, res) {
  let sql = "insert into  detalles set ?"
  const fecha = new Date
  console.log('Registro recibido: ', req.body);
  let poststr = {
    libros_id: req.body.libros_id,
    prestamos_id: req.body.prestamos_id,
    precio: req.body.precio,
    created: fecha,
    modified: fecha
  }
  conexion.query(sql, poststr, function (error, results) {
    if (error) throw error;
    if (results.affectedRows) {
      res.json({ status: 'Registro guardado' })
    }
    else
      res.json({ status: 'No se pudo guardar' })

  });
})//End detalle.post

//--actualizar
detalle.put('/detalles', function (req, res) {
  const fecha = new Date
  let sql = "update detalles set libros_id= ?,prestamos_id= ?,precio = ?, modified = ? where id = ?"
  conexion.query(sql, [req.body.libros_id, req.body.prestamos_id, req.body.precio,fecha,req.body.id], function (error, results) {
    if (error) throw error;
    if (results.affectedRows) {
      res.json({ status: 'Registro actualizado' })
    }
    else
      res.json({ status: 'No se pudo actualizar' })
  });
});



//--eliminar
//---- eliminar un registro
detalle.delete('/detalles/:id', function (req, res) {
  let sql = "delete from detalles where id = ?"
  conexion.query(sql, [req.params.id], function (error, results) {
    if (error) throw error;
    if (results.affectedRows) {
      res.json({ status: 'Registro eliminado' })
    }
    else
      res.json({ status: 'No se pudo eliminar' })
  });
})

//--- Para exportar y se pueda usar en otro lado
module.exports = detalle;
