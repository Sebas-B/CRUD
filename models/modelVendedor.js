const mongoose = require('mongoose');

//Definir el esquema de la coleccion vendedor
mongoose.model('vendedor',{
  claveVendedor: {
    type: Number,
    required: [true, 'Se necesita una clave'],
    unique: true
},
  nombre: {
    type: String,
    required: [true, 'Se necesita un nombre'],
    lowercase: true,
    minlength: [3, 'Al menos 3 caracteres'],
    maxlength: [20, 'Maximo 20 caracteres']
},
  apellidos: {
    type: String,
    required: [true, 'Se necesita un apellido'],
    lowercase: true,
    minlength: [3, 'Al menos 3 caracteres'],
    maxlength: [20, 'Maximo 20 caracteres']
},
  edad: {
    type: Number,
    required: [true, 'Se necesita llenar este campo']
},
  genero: {
    type: String,
    required: [true, 'se necesita llenar este campo']
}
});
