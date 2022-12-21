const { body, validationResult } = require('express-validator');
const conexion = require('../config/conexion');
var express = require('express')
var rutas = express()

//http://localhost:8000/
rutas.get('/', function (req, res) {
  res.json({ mensaje: '¡Hola Mundo!' })
})

//http://localhost:8000/usuarios
rutas.get('/usuarios', function (req, res) {

  let sql = "select * from usuarios order by id"

  conexion.query(sql, (err, rows) => {
    if (err) throw err;
    else {
      res.json(rows)
    }
  })
})

rutas.get('/usuario_prestamo/:id', function (req, res) {
  conexion.query("SELECT u.documento, u.nombres, u.apellidos, u.telefono, u.direccion, p.id, p.entrega, p.devolucion FROM usuarios u INNER JOIN prestamos p on p.usuarios_id=u.id where u.id= ?", [req.params.id], (err, rows) => {
    if (err) throw err;
    else {
      res.json(rows)
    }
  })
})

//http://localhost:8000/usuarios/5
rutas.get('/usuarios/:id', function (req, res) {
  conexion.query("select * from usuarios where id = ?", [req.params.id], (err, rows) => {
    if (err) throw err;
    else {
      res.json(rows[0])
    }
  })
})

rutas.post('/usuarios', function (req, res) {
    let sql = "insert into usuarios set ?"
    const fecha = new Date
    console.log('Registro recibido: ', req.body);

    let poststr = {
      documento: req.body.documento,
      nombres: req.body.nombres,
      apellidos: req.body.apellidos,
      direccion: req.body.direccion,
      telefono: req.body.telefono,
      correo: req.body.correo,
      modified: fecha
    }
    conexion.query(sql, poststr, function (error, results) {
      if (error) {throw error
      }else{
        if (results.affectedRows) {
          res.json({ status: 'Registro guardado' })
        }
        else
          res.json({ status: 'No se pudo guardar' })
      }
    });
  })

//--actualizar
rutas.put('/usuarios', function (req, res) {
  const fecha = new Date
  let sql = "update usuarios set documento= ?,nombres= ?,apellidos = ?,direccion =?, telefono = ?,correo= ?, modified = ? where id = ?"
 
  conexion.query(sql, [req.body.documento, req.body.nombres, req.body.apellidos, req.body.direccion, req.body.telefono, req.body.correo, fecha, req.body.id], function (error, results) {
    if (error) throw error;
    if (results.affectedRows) {
      res.json({ status: 'Registro actualizado' })
    }
    else
      res.json({ status: 'No se pudo actualizar' })
  });
});

rutas.delete('/usuarios/:id', function (req, res) {
  let sql = "delete from usuarios where id = ?"
  conexion.query(sql, [req.params.id], function (error, results) {
    if (error) throw error;
    if (results.affectedRows) {
      res.json({ status: 'Registro eliminado' })
    }
    else
      res.json({ status: 'No se pudo eliminar' })
  });
})

module.exports = rutas;
