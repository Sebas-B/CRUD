var express = require('express');
var router = express.Router();

//Conectar a la base de datos
var mongoose = require('mongoose');
require('../models/modelVentas');
const Ventas = mongoose.model('ventas');

//GET OBTENER LISTADO
//Obtener lista de archivos
router.get('/', (req, res) => {
    //Metodo para buscar
  Ventas.find().then((ventas) => {
     res.json(ventas);
  }).catch((error) => {
    if(error)
       throw error;
  });
});

//FIND BY ID
router.get('/:claveventas', (req,res) => {
  Ventas.findOne(req.params.claveVentas).then((ventas) => {
   res.json(ventas); //solo se muestra un registro
}).catch((error)=>{
   if(error)
       throw error;
  });
});


//POST
//Agrgar un registro
router.post('/', (req, res) => {
   console.log(req.body); //verifica los datos

  //Almacena los datos en una variable
var newVentas = {
   claveVentas: req.body.claveVentas,
   claveVendedor: req.body.claveVendedor,
   claveProducto: req.body.claveProducto,
   kilos: req.body.kilos,
   date: req.body.date,
   pagado: req.body.pagado
}

var sales = new Ventas(newVentas);

sales.save().then(() => {
   console.log('Venta registrada');
   res.send('Se registro la venta');
}).catch((error)=> {
  if(error)
    console.log('Ocurrio un error');
    throw error;
});
});


//Metodo PUT
router.put('/', (req, res) => {
  //verificaciin de que existe ek elemento
  Ventas.findOne({claveVentas: req.body.claveVentas }).then((ventas) => {

  console.log(req.body);

  ventas.kilos = req.body.kilos;
  ventas.pagado = req.body.pagado;

  //Solo se modifican los datos de fecha y kilos
  ventas.markModified('kilos');
  ventas.markModified('pagado');

  ventas.save().then(() => {
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
router.delete('/:claveventas', (req,res) => {
  Ventas.findOneAndRemove(req.params.claveVentas).then(() => {

 res.send("Se ha eliminado un registro");
}).catch((error)=>{
   if(error)
       throw error;
  });
});

module.exports = router;

