const mongoose = require("mongoose");

const pokemonSchema = new mongoose.Schema({

    pokemonName:{
        type:String,
        required:true
    },

    type:{
        type:String
    },

    height:{
        type:Number
    },

    weight:{
        type:Number
    },

    image:{
        type:String
    },

    ability:{
        type:String
    },

    region:{
        type:String
    }
});

module.exports = mongoose.model("Pokemon",pokemonSchema);