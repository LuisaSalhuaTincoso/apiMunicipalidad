var mongoose = require( 'mongoose' );

//Mensaje de un usuario
var MessageSchema = new mongoose.Schema({
    categoria:{type:String, required:true},
    emisor: { type: String, required: true},
    mensaje:{ type : String, required: true },
    //date: { type: Date,"default":Date.now  },
    receptor: { type: String},
    coordenadas: {type: [Number], index: '2dsphere'}
});

mongoose.model('Message', MessageSchema)
