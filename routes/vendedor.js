var express = require('express');
var router = express.Router();

//Conectar a la base de datos
var mongoose = require('mongoose');
require('../models/modelVendedor');
const Vendedor = mongoose.model('vendedor');

//Listar Registros
router.get('/', (req, res) => {
    //Metodo para buscar
  Vendedor.find().then((vendedor) => {
     res.json(vendedor);
  }).catch((error) => {
    if(error)
       throw error;
  });
});

//obtener porID
router.get('/:clavevendedor', (req,res) => {
  Vendedor.findOne(req.params.claveVendedor).then((vendedor) => {
   res.json(vendedor); //solo se muestra un registro
}).catch((error)=>{
   if(error)
       throw error;
  });
});


//Agrgar un registro
router.post('/', (req, res) => {
   console.log(req.body); //verifica los datos

  //Almacena los datos en una variable
var newVendedor = {
   claveVendedor: req.body.claveVendedor,
   nombre: req.body.nombre,
   apellidos: req.body.apellidos,
   edad: req.body.edad,
   genero: req.body.genero
}

var salesman = new Vendedor(newVendedor);

salesman.save().then(() => {
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
  //verificacion de que existe el elemento
  Vendedor.findOne({claveVendedor: req.body.claveVendedor }).then((vendedor) => {

  console.log(req.body);

  vendedor.edad = req.body.edad;
  vendedor.nombre = req.body.nombre;
  vendedor.apellidos = req.body.apellidos;
  vendedor.genero = req.body.genero;

  //Solo se modifican los datos de edad, nombre y apellidos
  vendedor.markModified('edad');
  vendedor.markModified('nombre');
  vendedor.markModified('apellidos');
  vendedor.markModified('genero');

  vendedor.save().then(() => {
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
router.delete('/:claveVendedor', (req,res) => {
  Vendedor.findOneAndRemove(req.params.claveVendedor).then(() => {
   res.send("Se ha eliminado un registro");
}).catch((error)=>{
   if(error)
       throw error;
  });
});

module.exports = router;

