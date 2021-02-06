const mongoose = require('mongoose');

//url sitio de mongoose
const MongoURI = "mongodb+srv://test:1234@cluster0.zrgp9.mongodb.net/Empresa?retryWrites=true&w=majority";

const MongoServer = async() => {
    try{
       await mongoose.connect(MongoURI, {
	useNewUrlParser: true
    });
       console.log("Conectado a la DB de mongoDB");
    } catch(e) {
        console.log(e);
        throw e;
  }
};

module.exports = MongoServer;

