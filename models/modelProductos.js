const mongoose = require('mongoose');

//Definir el esquema de la coleccion Productos
mongoose.model('productos',{
 claveProducto: {
   type: Number,
   required: [true, 'Se necesita de una clave'],
   unique: true
},
 nombreProducto: {
  type: String,
  required: [true, 'Se necesita de un nombre'],
  lowercase: true,
  minlength: [3, 'Al menos 3, caracteres por favor']
},
 precio: {
  type: Number,
  required: [true, 'Se necesita un precio']
},
 color: {
   type: String,
   required: [true, 'Se necesita especificar el color'],
   lowercase: true
},
 existencia: {
   type: mongoose.SchemaTypes.Boolean,
   require: [true, 'Especifica la existencia del producto'],
   default: false
}
});
