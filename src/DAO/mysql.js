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

//Usuario
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

//Curso
router.post("/agregarCurso", (req,res) =>{
    const id = req.body.id
    const fechaHoraInicio = req.body.fechaHoraInicio
    const fechaHoraFin = req.body.fechaHoraFin
    const titulo = req.body.titulo
    const lugar = req.body.lugar

    const sqlInsertCompromiso = "INSERT INTO Compromiso (fechaHoraInicio, fechaHoraFin, ID, lugar) VALUES (?,?,?,?);";
    const sqlInsertCurso = "INSERT INTO Curso (fechaHoraInicio, fechaHoraFin, ID, lugar, titulo) VALUES (?,?,?,?,?);"

    db.query(sqlInsertCompromiso, [fechaHoraInicio, fechaHoraFin, id, lugar], () => {
        db.query(sqlInsertCurso , [fechaHoraInicio, fechaHoraFin, id, lugar, titulo] ,(err) => {
            console.log(err);
            res.send(err);
        })
    })
});

//Obtener ID
router.get("/getIdProducto", (_, res) => {
    const sqlSelect = "SELECT ultimo_valor FROM Consecutivo WHERE nombre = 'producto'"
    db.query(sqlSelect, (_, result) => {
    console.log(result);
    res.send(result)
    })
})

router.post("/setIdProducto", (_, res) => {
    const sqlUpdate = "UPDATE Consecutivo SET ultimo_valor = ultimo_valor+1 WHERE nombre = 'producto'"
    db.query(sqlUpdate, (err, _) => {
        if(err){
            console.log(err);
            res.send(err);
        }
    })
})

router.get('/getNextCompromisos', (req,res) => {
    const sqlUpdate = "UPDATE Consecutivo SET ultimo_valor=ultimo_valor+1 WHERE nombre='compromiso'"
    const sqlSelect = "SELECT ultimo_valor FROM Consecutivo WHERE nombre = 'compromiso';"
    db.query(sqlUpdate, () => {
        db.query(sqlSelect, [req.query.correo], (err, result) => {
            console.log(result);
            res.send(result);
        })
    })
})

module.exports = router;