const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth",require("./routes/authRoutes"));
app.use("/api/pokemon",require("./routes/pokemonRoutes"));

app.get("/",(req,res)=>{
    res.send("Pokemon Management API Running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
});