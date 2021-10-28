const express = require('express')
const router = express.Router();
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser')
const { query, request} = require('express')

const db = mysql.createPool({
    host : "remotemysql.com",
    user : "EwecdhGRNt",
    password : "QD86330FgN",  
    port: 3306,
    database: "EwecdhGRNt"
});

router.use(cors());
router.use(express.json())
router.use(bodyParser.urlencoded({extended: true}));

router.get('/obtenerUsuario', (req,res) => {
    const sqlSelect = "SELECT * FROM Usuario WHERE correo = ?;"
    console.log(sqlSelect)
    db.query(sqlSelect, [req.query.correo], (err, result) => {
        console.log(result);
        res.send(result);
    })
})

router.post("/agregarUsuario", (req,res) =>{
    const correo = req.body.correo 
    const nombre = req.body.nombre 
    const primerApellido = req.body.primerApellido 
    const segundoApellido = req.body.segundoApellido 
    const telefono = req.body.telefono 
    const cedula = req.body.cedula 
    const contrasena = req.body.contrasena 
    const rol = req.body.rol

    const sqlInsert = "INSERT INTO Usuario (correo, nombre, primerApellido, segundoApellido, telefono, cedula, contrasena, rol) VALUES (?,?,?,?,?,?,?,?);";
    db.query(sqlInsert , [correo, nombre, primerApellido, segundoApellido, telefono, cedula, contrasena, rol] ,(err, result) => {
        console.log(err);
        res.send(err);
    })
});

module.exports = router;