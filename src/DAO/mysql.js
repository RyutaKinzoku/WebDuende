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

router.get('/login', (req,res) => {
    const sqlSelect = "SELECT * FROM Usuario WHERE correo = ?;"
    console.log(sqlSelect)
    db.query(sqlSelect, [req.query.correo], (err, result) => {
        console.log(result);
        res.send(result);
    })
})

module.exports = router;