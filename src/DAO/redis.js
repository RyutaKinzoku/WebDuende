import { application } from 'express';

const express = require('express');
const router = express.Router();
const redis = require("redis");

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

router.post("/obtenerProductosCarrito", (req,res) => {
    let correo = req.body.correo;
    db.keys(correo+'');
})

router.post("/eliminarCarrito", (req, res) =>{
    let correo = req.body.correo;
    db.del(correo+'');
})

export default router;