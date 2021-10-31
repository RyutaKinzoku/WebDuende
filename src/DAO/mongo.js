
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
        res.send(docs);
    })
})

router.get('/obtenerProducto', async (req,res) => {
    modelos.Producto.find({id: req.query.idProducto}, (err, docs) => {
        if(err){
            res.send(err);
        }
        res.send(docs);
    })
})

router.post('/agregarProducto', subida.single('imagen'), async function (req, res) {
    const producto = new modelos.Producto({
        id: Number(req.body.idProducto),
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: Number(req.body.precio),
        imagen: req.file.filename,
        cantidad: req.body.cantidad
    })
    try{
        let resul = await producto.save();
        console.log(resul);
        res.send(resul === producto);
    } catch (err){
        console.log(err);
        res.send(false);
    }
})

router.post('/eliminarProducto', async (req,res) =>{
    const eliminados = await modelos.Producto.deleteOne({id: req.body.idProducto});
    res.sendStatus(eliminados.deletedCount);
})

module.exports = router;