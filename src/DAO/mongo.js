
const express = require('express')
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const modelos = require('./modelosMongo');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const urlencodedParser = bodyParser.urlencoded({ extended: false })
const jsonParser = bodyParser.json()

const URI = "mongodb+srv://admin:admin@web-duende.rfjvk.mongodb.net/web-duende?retryWrites=true&w=majority";

const storage = multer.diskStorage({
    destination: "../../public/assets/images",
    filename: (req, file, callback, filename) => {
      var ext = path.extname(file.originalname);
      try {
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg' ) {
          throw new Error(" no es una imagen \n")
        }
        callback(null, uuidv4() + ext);
      } catch (error) {
        alert("El archivo selecionado" + error.name + "Solo se admiten archivos tipo: \n .png \n .jpg \n .gif \n .jpeg")
      }
    }
}) 
var subida = multer({storage})
router.use(express.static(__dirname));
router.use(jsonParser);

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
})

router.post('/agregarProducto', subida.single('imagen'), async function (req, res) {
    console.log("REQUESTED FILE " + req.file)
    const producto = new modelos.Producto({
        id: Number(req.body.idProducto),
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: Number(req.body.precio),
        //imagen: '',
        //imagen: req.body.imagen.filename + req.body.imagen.mimetype,
        imagen: req.file.filename,
        cantidad: req.body.cantidad
    })
    try{
        await producto.save();
        res.send("Producto agregado")
    } catch (err){
        console.log(err);
        res.send(err);
    }
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