const { check, validationResult } = require('express-validator');
const conexion = require('../config/conexion');
var express = require('express') //llamamos a Express
var libro = express()


//--- define las prestamo de la API
// se puede probar con Postman
//http://localhost:8000/
libro.get('/', function (req, res) {
  res.json({ mensaje: '¡Hola Mundo!' })
})

//http://localhost:8000/usuarios
libro.get('/libros', function (req, res) {
  //res.json({ mensaje: '¡Listando libros!' })  
  let sql = "select * from libros order by id"
  conexion.query(sql, (err, rows) => {
    if (err) throw err;
    else {
      res.json(rows)
    }
  })

})//endget

//-- Obtiene unlibro especifico 
//---- get one user
//http://localhost:8000/libros/5
libro.get('/libros/:id', function (req, res) {
  conexion.query("select * from libros where id = ?", [req.params.id], (err, rows) => {
    if (err) throw err;
    else {
      res.json(rows)
    }
  })
})


//--- listar libros
//--guardar
//-- Insertar un libro
libro.post('/libros', function (req, res) {
  let sql = "insert into  libros set ?"
  const fecha = new Date
  console.log('libro recibido: ', req.body);
  let poststr = {
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    precio: req.body.precio,
    ejemplares: req.body.ejemplares,
    autor: req.body.autor,
    editoriales_id: req.body.editoriales_id,
    categorias_id: req.body.categorias_id,
    created: fecha,
    modified: fecha
  }
  conexion.query(sql, poststr, function (error, results) {
    if (error) throw error;
    if (results.affectedRows) {
      res.json({ status: 'libro guardado' })
    }
    else
      res.json({ status: 'No se pudo guardar el libro' })

  });
})//End libro.post

//--actualizar
libro.put('/libros', function (req, res) {
  const fecha = new Date
  let sql = "update libros set titulo= ?,descripcion= ?,precio = ?, ejemplares = ?,autor=?, editoriales_id =?, categorias_id =?, modified = ? where id = ?"
  conexion.query(sql, [req.body.titulo, req.body.descripcion, req.body.precio, req.body.ejemplares, req.body.autor, req.body.editoriales_id, req.body.categorias_id, fecha, req.body.id], function (error, results) {
    if (error) throw error;
    if (results.affectedRows) {
      res.json({ status: 'libro actualizado' })
    }
    else
      res.json({ status: 'No se pudo actualizar el libro' })
  });
});



//--eliminar
//---- eliminar un libro
libro.delete('/libros/:id', function (req, res) {
  let sql = "delete from libros where id = ?"
  conexion.query(sql, [req.params.id], function (error, results) {
    if (error) throw error;
    if (results.affectedRows) {
      res.json({ status: 'libro eliminado' })
    }
    else
      res.json({ status: 'No se pudo eliminar el libro' })
  });
})

//--- Para exportar y se pueda usar en otro lado
module.exports = libro;
