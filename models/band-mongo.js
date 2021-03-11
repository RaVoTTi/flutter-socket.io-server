const {Schema , model} = require('mongoose');



const bandsSchema = new Schema ({
    id      : String,
    name    : String,
    votes   : Number,
}); 

const Bands = new model('bands', bandsSchema);

module.exports = { Bands }


