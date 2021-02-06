var express = require('express');
var router = express.Router();

//Conectar a la base de datos
var mongoose = require('mongoose');
require('../models/modelProductos');
require('../models/modelVentas');

const Ventas = mongoose.model('ventas');
const Productos = mongoose.model('productos');

//Lisrar objetos
router.get('/', (req, res) => {
    //Metodo para buscar
  Productos.find().then((productos) => {
     res.json(productos);
  }).catch((error) => {
    if(error)
       throw error;
  });
});

router.get('/:claveproducto', (req,res) => {
  Productos.findOne(req.params.claveProducto).then((productos) => {
   res.json(productos); //solo se muestra un registro
}).catch((error)=>{
   if(error)
       throw error;
  });
});


//Agrgar un registro
router.post('/', (req, res) => {
   console.log(req.body); //verifica los datos

  //Almacena los datos en una variable
var newProductos = {
   claveProducto: req.body.claveProducto,
   nombreProducto: req.body.nombreProducto,
   precio: req.body.precio,
   color: req.body.color,
   existencia: req.body.existencia
}

var products = new Productos(newProductos);

products.save().then(() => {
   console.log('Venta registrada');
   res.send('Se registro la venta');
}).catch((error)=> {
  if(error)
    console.log('Ocurrio un error');
    throw error;
});
});

router.post('/:_id', async (req, res) => {

   const nuevoProducto = new Productos(req.body)

   const ventas = await Ventas.findById(req.params)

   await nuevoProducto.save()

   nuevoProducto.sales = ventas

   Ventas.Productos.push(nuevoProducto)

   await Productos.save();

});

//Metodo PUT
router.put('/', (req, res) => {
  //verificaciin de que existe ek elemento
  Productos.findOne({claveProducto: req.body.claveProducto }).then((productos) => {

  console.log(req.body);

  productos.precio = req.body.precio;
  productos.existencia = req.body.existencia;
  productos.color = req.body.color;

  //Solo se modifican los datos de fecha y kilos
  productos.markModified('precio');
  productos.markModified('existencia');
  productos.markModified('color');

  productos.save().then(() => {
     res.send('!!se ha modificado un registro!!');
  }).catch((error) => {
    if(error)
      throw error;
});

  }).catch((error) => {
     if (error)
        throw error;
});
});


//Metodo borrar
router.delete('/:_id', (req,res) => {
  Productos.findByIdAndRemove(req.params._id).then((productos) => {
   res.send("Se ha eliminado un registro");
}).catch((error)=>{
   if(error)
       throw error;
  });
});

module.exports = router;
