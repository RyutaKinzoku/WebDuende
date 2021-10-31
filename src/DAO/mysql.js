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

//Compromisos
router.get('/getCursos', (_,res) => {
    const sqlSelectCursos = "SELECT * FROM Curso;"
    db.query(sqlSelectCursos, (err, result) => {
        console.log(result);
        res.send(result);
    });
});

router.get('/getCitas', (_,res) => {
    const sqlSelectCitas = "SELECT * FROM Cita;"
    db.query(sqlSelectCitas, (err, result) => {
        console.log(result);
        res.send(result);
    });
});

router.get('/getEntregas', (_,res) => {
    const sqlSelectEntregas = "SELECT * FROM Entrega;"
    db.query(sqlSelectEntregas, (err, result) => {
        console.log(result);
        res.send(result);
    });
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

//Entrega
router.post("/agregarEntrega", (req,res) =>{
    const id = req.body.id
    const fechaHoraInicio = req.body.fechaHoraInicio
    const fechaHoraFin = req.body.fechaHoraFin
    const lugar = req.body.lugar
    const correoUsuario = req.body.correoUsuario
    const idOrdenCompra = req.body.idOrdenCompra

    const sqlInsertCompromiso = "INSERT INTO Compromiso (fechaHoraInicio, fechaHoraFin, ID, lugar) VALUES (?,?,?,?);";
    const sqlInsertServicioIndividual = "INSERT INTO ServicioIndividual (fechaHoraInicio, fechaHoraFin, ID, lugar, correoUsuario) VALUES (?,?,?,?,?);";
    const sqlInsertEntrega = "INSERT INTO Entrega (fechaHoraInicio, fechaHoraFin, ID, lugar, correoUsuario, idOrdenCompra) VALUES (?,?,?,?,?,?);"
    db.query(sqlInsertCompromiso, [fechaHoraInicio, fechaHoraFin, id, lugar], () => {
        db.query(sqlInsertServicioIndividual, [fechaHoraInicio, fechaHoraFin, id, lugar, correoUsuario], () => {
            db.query(sqlInsertEntrega , [fechaHoraInicio, fechaHoraFin, id, lugar, correoUsuario, idOrdenCompra] ,(err) => {
                console.log(err);
                res.send(err);
            })
        })
    })
});

//Cita
router.post("/agregarCita", (req,res) =>{
    const id = req.body.id
    const fechaHoraInicio = req.body.fechaHoraInicio
    const fechaHoraFin = req.body.fechaHoraFin
    const lugar = req.body.lugar
    const correoUsuario = req.body.correoUsuario
    const idPublicacion = req.body.idPublicacion

    const sqlInsertCompromiso = "INSERT INTO Compromiso (fechaHoraInicio, fechaHoraFin, ID, lugar) VALUES (?,?,?,?);";
    const sqlInsertServicioIndividual = "INSERT INTO ServicioIndividual (fechaHoraInicio, fechaHoraFin, ID, lugar, correoUsuario) VALUES (?,?,?,?,?);";
    const sqlInsertCita = "INSERT INTO Cita (fechaHoraInicio, fechaHoraFin, ID, lugar, correoUsuario, idPublicacion) VALUES (?,?,?,?,?,?);"
    db.query(sqlInsertCompromiso, [fechaHoraInicio, fechaHoraFin, id, lugar], () => {
        db.query(sqlInsertServicioIndividual, [fechaHoraInicio, fechaHoraFin, id, lugar, correoUsuario], () => {
            db.query(sqlInsertCita , [fechaHoraInicio, fechaHoraFin, id, lugar, correoUsuario, idPublicacion] ,(err) => {
                console.log(err);
                res.send(err);
            })
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