const express = require('express')
const aplicacion = express()
const mysql = require('mysql2')
const bodyParser = require('body-parser')
const cors = require('cors')

var pool = mysql.createPool({
  connectionLimit: 20,
  host: 'localhost',
  user: 'root',
  password: 'Lucas!2201',
  database: 'dashboard'
})

aplicacion.use(bodyParser.json())
aplicacion.use(bodyParser.urlencoded({ extended: true }))
aplicacion.set("view engine", "ejs")
aplicacion.use(cors())

// ---------------------------------------------------------------------------------------------------------------------------------------------------------




// ---------------------------------------------------------------------------------------------------------------------------------------------------------


aplicacion.get('/api/categories', (peticion, respuesta) => {
  pool.getConnection((err, connection) =>{
    const consulta =`
      SELECT *
      FROM categories;
    `

    connection.query(consulta, (error, filas, campos) =>{
      if (filas.length > 0){
        respuesta.json(filas)
      }
      else{
        respuesta.status(404)
        respuesta.send({
          errors: ["No se encuentra esa publicacion"]
        })
      }
      connection.release()
    })
  })
})

aplicacion.get('/api/records', (peticion, respuesta) => {
  pool.getConnection((err, connection) =>{
    const consulta =`
      SELECT *
      FROM records;
    `

    connection.query(consulta, (error, filas, campos) =>{
      if (filas.length > 0){
        respuesta.json(filas)
      }
      else{
        respuesta.status(404)
        respuesta.send({
          errors: ["No se encuentra esa publicacion"]
        })
      }
      connection.release()
    })
  })
})


aplicacion.delete('/api/records/:id', (req, res)=>{
  pool.getConnection((err, connection)=>{
      if(err) return res.send(err)

      connection.query(`DELETE FROM records WHERE id = ${req.params.id}`, (err, rows)=>{
          if(err) return res.send(err)

          res.send('Deleted succesfully!')
      })
  })
})

aplicacion.get('/api/typs', (peticion, respuesta) => {
  pool.getConnection((err, connection) =>{
    const consulta =`
      SELECT *
      FROM typs;
    `

    connection.query(consulta, (error, filas, campos) =>{
      if (filas.length > 0){
        respuesta.json(filas)
      }
      else{
        respuesta.status(404)
        respuesta.send({
          errors: ["No se encuentra esa publicacion"]
        })
      }
      connection.release()
    })
  })
})

aplicacion.get('/api/categories', (peticion, respuesta) => {
  pool.getConnection((err, connection) =>{
    const consulta =`
      SELECT *
      FROM categories;
    `

    connection.query(consulta, (error, filas, campos) =>{
      if (filas.length > 0){
        respuesta.json(filas)
      }
      else{
        respuesta.status(404)
        respuesta.send({
          errors: ["No se encuentra esa publicacion"]
        })
      }
      connection.release()
    })
  })
})


aplicacion.listen(9000, function(){
  console.log("Servidor iniciado")
})

