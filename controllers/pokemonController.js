const Pokemon = require("../models/Pokemon");
const axios = require("axios");
const cloudinary = require("../config/cloudinary");

const createPokemon = async(req,res)=>{
    try{
        const {pokemonName} = req.body;
        const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        );

        const data = response.data;

        let imageUrl = "";
        if(req.file){
            const result = await cloudinary.uploader.upload(
                req.file.path
            );

            imageUrl = result.secure_url;
        }

        const pokemon = await Pokemon.create({
            pokemonName:data.name,
            type:data.types[0].type.name,
            height:data.height,
            weight:data.weight,
            ability:data.abilities[0].ability.name,
            region:data.location_area_encounters,
            image:imageUrl
        });
        res.status(201).json(pokemon);
    }
    catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};

const getAllPokemon = async(req,res)=>{
    const pokemon = await Pokemon.find();
    res.json(pokemon);

};

const getPokemonById = async(req,res)=>{
    const pokemon = await Pokemon.findById(req.params.id);
    res.json(pokemon);

};

const updatePokemon = async(req,res)=>{
    const pokemon = await Pokemon.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.json(pokemon);
};

const deletePokemon = async(req,res)=>{
    await Pokemon.findByIdAndDelete(req.params.id);
    res.json({
        message:"Pokemon Deleted"
    });
};

module.exports = {createPokemon,getAllPokemon,getPokemonById,updatePokemon,deletePokemon};