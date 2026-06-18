const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {createPokemon,getAllPokemon,getPokemonById,updatePokemon,deletePokemon} = require("../controllers/pokemonController");
const multer = require("multer");
const storage = multer.diskStorage({

    destination:(req,file,cb)=>{
        cb(null,"uploads/");
    },

    filename:(req,file,cb)=>{
        cb(null,Date.now()+"-"+file.originalname);
    }

});

const upload = multer({storage});

router.post(
    "/",
    authMiddleware,
    upload.single("image"),
    createPokemon
);

router.get("/",authMiddleware,getAllPokemon);
router.get("/:id",authMiddleware,getPokemonById);
router.put("/:id",authMiddleware,updatePokemon);
router.delete("/:id",authMiddleware,deletePokemon);
module.exports = router;