const mongoose = require('mongoose');

const URI = "mongodb+srv://admin:admin@web-duende.rfjvk.mongodb.net/web-duende?retryWrites=true&w=majority";

const conexionMongo = async() =>{
    await mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then(db => console.log('MongoDB conectado'))
    .catch(err => console.log(err));
}

module.exports = conexionMongo;