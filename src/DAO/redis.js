import { application } from 'express';

const express = require('express');
const router = express.Router();

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
    cantidad = req.body.cantidad;
    idProducto = req.body.idProducto;
    correo = req.body.correo;
    db.hmset(correo+'',idProducto+'',cantidad+'');
})

router.post("/eliminarProductoCarrito", (req,res) => {
    idProducto = req.body.idProducto;
    correo = req.body.correo;
    db.del(correo+'',idProducto+'');
})

router.post("/obtenerProductosCarrito", (req,res) => {
    correo = req.body.correo;
    db.keys(correo+'');
})

export default router;