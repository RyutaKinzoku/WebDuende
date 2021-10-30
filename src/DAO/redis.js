import { application } from 'express';

const express = require('express');
const router = express.Router();
const redis = require("redis");
const mysql = require('./mysql.js');

const db = redis.createClient ({
    port : '30203',
    host : 'gusc1-present-bear-30203.upstash.io',
    password: 'e69b9301e5754f3fa3e98e6c7a22a3a2'
});

db.on('error', function (err) {
    console.log('No se pudo conectar con Redis' + err);
});
db.on('connect', function (err) {
    console.log('RedisDB conectado');
});


router.post("/agregarProductoCarrito", (req, res) =>{
    let cantidad = req.body.cantidad;
    let idProducto = req.body.idProducto;
    let correo = req.body.correo;
    db.hmset(correo+'',idProducto+'',cantidad+'');
})

router.post("/eliminarProductoCarrito", (req,res) => {
    let idProducto = req.body.idProducto;
    let correo = req.body.correo;
    db.del(correo+'',idProducto+'');
})

router.post("/eliminarCarrito", (req, res) =>{
    let correo = req.body.correo;
    db.del(correo+'');
})

router.get("/obtenerProductosCarrito", (req,res) => {
  /*let correo = req.body.correo;
  var getPares = function( callback ) { 
      var pares = [];     
  db.hkeys(correo+'', function (_error, value) {
      if (value.length !== 0){
        for (let index = 0; index < value.length; index++) {
          db.hmget(correo + '', value[index] + '', function (_error, cantidad, ) {
            let par = [value[index], cantidad.pop()];
            pares.push(par);
            if (index === value.length-1){
              callback(pares)
            }
          });
        };
      } else {
        callback(value);
      }
    })
  };
  var savePares = function(pares){
    var sql = "SELECT * FROM producto WHERE idProducto = ?";
    function getItems(callback){
      if (pares.length !== 0){
        for (let index = 0; index < pares.length; index++) {
          const id = pares[index][0];
          let items = []; 
          mysql.pool.query(sql,[id], function (err, result) {
            if (err) throw err;
            items.push( result);
            if (index === pares.length-1){
              callback(items);
            }
            return true;
          });
        }
      } else {
        callback([]);
      }
    }
    function saveItems(items){
      res.render('carrito', {items, pares, currentUser: global.usuario});
    }
    getItems(saveItems);
  }
  getPares(savePares);*/
})

export default router;