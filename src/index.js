require("dotenv").config();
const express = require("express")
const app = express();
const PORT = process.env.PORT || 3000;

//esto es un middleware
app.use(express.json());

//rutas
const usuariosRoutes = require("./routes/usuarios.routes")
app.use("/api", usuariosRoutes);

app.listen(3000,()=>{
    console.log("servidor corriendo en el puerto "+PORT);
})