
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
router.use(express.json())
router.use(bodyParser.urlencoded({extended: true}));

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

router.get('/listaPublicaciones', async (req,res) => {
    if(req.query.idCategoria == null){
        modelos.Publicacion.find({}, (err, docs) => {
            if(err){
                res.send(err);
            }
            res.send(docs);
        })
    } else {
        modelos.Publicacion.find({idCategoria: req.query.idCategoria}, (err, docs) => {
            if(err){
                res.send(err);
            }
            res.send(docs);
        })
    }
})

router.get('/listaCompras', async (_,res) => {
    modelos.Orden.find({}, (err, docs) => {
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
        await producto.save();
    } catch (err){
        res.send(err);
    }
})

router.post('/agregarOrden', subida.single('comprobante'), async function (req, res) {
    var productosLista = req.body.productos.split("¨");
    var atributosProducto =[];
    for(var producto of productosLista){
        atributosProducto.push(producto.split("|"));
    }
    atributosProducto.pop();
    var trueProductos = [];
    for (var producto of atributosProducto) {
        var newProducto = new modelos.Producto({
            id: Number(producto[0]),
            nombre: producto[1],
            descripcion: producto[2],
            precio: Number(producto[3]),
            imagen: producto[5],
            cantidad: producto[4]
        })
        trueProductos.push(newProducto);
    }
    const orden = new modelos.Orden({
        id: Number(req.body.idOrden),
        direccion: req.body.direccion,
        correoUsuario: req.body.comprador,
        productos: trueProductos,
        comprobante: req.file.filename
    })
    try{
        await orden.save();
        res.send(res);
    } catch (err){
        res.send(err);
    }
})

router.post('/eliminarProducto', async (req,res) =>{
    try{
        await modelos.Producto.deleteOne({id: req.body.idProducto});
    } catch (err){
        res.send(err);
    }
})

router.post('/eliminarPublicacion', async (req,res) =>{
    try{
        await modelos.Publicacion.deleteOne({id: req.body.idPublicacion});
    } catch (err){
        res.send(err);
    }
}) 

router.post('/eliminarOrden', async (req,res) =>{
    const eliminados = await modelos.Orden.deleteOne({id: req.body.idOrden});
    res.sendStatus(eliminados.deletedCount);
})

router.post('/modificarProducto', async (req, res) =>{
    console.log(req.body);
    console.log(req.file);
    try{
        if (req.body.imagen){
            modelos.Producto.updateOne({id: req.body.idProducto}, 
                {
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                precio: Number(req.body.precio),
                cantidad: req.body.cantidad
                }
            )
        } else {
            modelos.Producto.updateOne({id: req.body.idProducto}, 
                {
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                precio: Number(req.body.precio),
                imagen: req.file.filename,
                cantidad: req.body.cantidad
                }
            )
        }
    } catch (err){
        res.send(err);
    }
})

router.post('/agregarPublicacion', subida.single('imagen'), async function (req, res) {
    const publicacion = new modelos.Publicacion({
        id: Number(req.body.id),
        imagen: req.file.filename,
        descripcion: req.body.descripcion,
        tags: req.body.tags.split(","),
        categoria: Number(req.body.categoria),
        subcategoria: Number(req.body.subcategoria),
    })
    try{
        await publicacion.save();
    } catch (err){
        res.send(err);
    }
})

module.exports = router;