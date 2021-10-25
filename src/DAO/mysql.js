import { application } from 'express';

const express = require('express');
const router = express.Router();

const db = mysql.createPool({
    host : "remotemysql.com",
    user : "EwecdhGRNt",
    password : "QD86330FgN",  
    port: 3306,
    database: "EwecdhGRNt"
});

router.get('/login', (req, res) => {
    const sqlselect = "SELECT * FROM Usuario WHERE correo = ? AND contrasena = ?;"
    db.query(sqlSelect , [req.query.correo , req.query.contrasena] ,(err, result) => {
        console.log(result)
        res.render('IniciarSesion', {usuario: result.data[0]});
    })
})

export default router;