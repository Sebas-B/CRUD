var express = require('express');
var router = express.Router();

//Conectar a la base de datos
var mongoose = require('mongoose');
require('../models/modelCanciones');
const Canciones = mongoose.model('canciones');


//GET OBTENER LISTADO
//Obtener lista de archivos
router.get('/', (req, res) => {
    //Metodo para buscar
  Canciones.find().then((canciones) => {
     res.json(canciones);
  }).catch((error) => {
    if(error)
       throw error;
  });
});


//FIND BY ID
router.get('/:_id', (req,res) => {
  Canciones.findById(req.params._id).then((canciones) => {

   res.json(canciones); //solo se muestra un registro
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
var newCancion = {
  nombreCancion: req.body.nombreCancion,
  nombreArtista: req.body.nombreArtista,
  nombreAlbum: req.body.nombreAlbum,
  lanzamiento: req.body.lanzamiento,
  escritores: req.body.escritores,
  productores: req.body.productores,
  disquera: req.body.disquera
}

var songs = new Canciones(newCancion);

songs.save().then(() => {
   console.log('Cancion Registrada');
   res.send('Se registro la cancion con exito');
}).catch((error)=> {
  if(error)
    console.log('A ocurrio un error');
    throw error;
});
});


//Metodo PUT
router.put('/', (req, res) => {
  //verificaciin de que existe ek elemento
  Canciones.findOne({_id: req.body._id }).then((canciones) => {
  console.log(req.body);

  canciones.nombreCancion = req.body.nombreCancion;
  canciones.nombreArtista = req.body.nombreArtista;
  canciones.nombreAlbum = req.body.nombreAlbum;
  canciones.lanzamiento = req.body.lanzamiento;
  canciones.escritores = req.body.escritores;
  canciones.productores = req.body.productores;
  canciones.disquera = req.body.disquera;

  //Solo se modifican los datos de fecha y kilos
  canciones.markModified('nombreCancion');
  canciones.markModified('nombreArtista');
  canciones.markModified('nombreAlbum');
  canciones.markModified('lanzamiento');
  canciones.markModified('escritores');
  canciones.markModified('productores');
  canciones.markModified('disquera');

  canciones.save().then(() => {
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
  Canciones.findByIdAndRemove(req.params._id).then(() => {
 res.send("Se ha eliminado un registro");
}).catch((error)=>{
   if(error)
       throw error;
  });
});

module.exports = router;
