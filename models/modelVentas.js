const mongoose = require('mongoose');

//Definit el esquemavde la coleccion ventas
mongoose.model('ventas', {
 claveVentas: {
  type: Number,
  require: true,
  unique: true
},

 claveVendedor: {
  type: mongoose.SchemaTypes.Number,
  require: true,
  ref: 'vendedor'
},

 claveProducto: {
  type: mongoose.SchemaTypes.Number,
  require: true,
  ref: 'productos'
},

 kilos: {
  type: Number,
  require: true
},

 date: {
   type: Date, default: Date.now
},

 pagado: {
  type: mongoose.SchemaTypes.Boolean,
  require: true,
  default: false
}
});


