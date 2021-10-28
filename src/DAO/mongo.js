
const express = require('express')
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const modelos = require('./modelosMongo');
const mongoose = require('mongoose');

const urlencodedParser = bodyParser.urlencoded({ extended: false })
const jsonParser = bodyParser.json()

const URI = "mongodb+srv://admin:admin@web-duende.rfjvk.mongodb.net/web-duende?retryWrites=true&w=majority";

const conexionMongo = async() =>{
    await mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then(db => console.log('MongoDB conectado'))
    .catch(err => console.log(err));
}

conexionMongo();

router.get('/listaProductos', async (_,res) => {
    modelos.Producto.find({}, (err, docs) => {
        if(err){
            res.send(err);
        }
        console.log(docs);
        res.send(docs);
    })
    /*const producto = new modelos.Producto({
        id: 6,
        nombre: "Vino",
        descripcion: "Vino y copa",
        precio: 1000,
        imagen: "../../public/imagenes/vino.jpg",
        cantidad: 100
    })
    console.log(producto);
    await producto.save();*/
})

module.exports = router;


/*
const mongoose = require("mongoose");

const cors =  require('cors')

const express = require('express');
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json()
const router = express.Router();

const productoEsquema = require('./modelosMongo').Producto;

const urlencodedParser = bodyParser.urlencoded({ extended: false })

const app = express();
const port = 3003;
const uri = "mongodb+srv://admin:admin@web-duende.rfjvk.mongodb.net/web-duende?retryWrites=true&w=majority";

app.use(cors());

mongoose.connect(uri).then(() => console.log("Connected to Mongo"))
    .catch((error) => console.log(error));

app.get("/", (req, res) => {
    res.send("123456");
});

app.listen(port, () =>
    console.log("running on port", port));

router.get("/get", function (req,res){
    productoEsquema.find({}, (err, result) => {
        if (err){
            res.send(err);
        }
        console.log(result);
        res.send(result);
    })
})
*/