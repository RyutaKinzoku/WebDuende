/*const mysql = require("mysql");

var conPool = mysql.createPool({
    host : "remotemysql.com",
    user : "EwecdhGRNt",
    password : "QD86330FgN",  
    port: 3306,
    database: "EwecdhGRNt"
});

conPool.getConnection(function(err, con){
    con.release();
    if (err) throw err;
    console.log("MySQL conectado");
});

const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser')
const { query, request} = require('express')
const router = express.Router();

const db = mysql.createPool({
    host : "remotemysql.com",
    user : "EwecdhGRNt",
    password : "QD86330FgN",  
    port: 3306,
    database: "EwecdhGRNt"
});

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));


app.listen(3000, () => {
    console.log("running on port 3000");
});

router.get('/login', (req,res) => {
    const sqlSelect = "SELECT * FROM User WHERE username = ? AND password = ?;"
    console.log(sqlSelect)
    db.query(sqlSelect , [req.query.username , req.query.password] ,(err, result) => {
        console.log(result)
        res.send(result);
    })
})

export default router;*/