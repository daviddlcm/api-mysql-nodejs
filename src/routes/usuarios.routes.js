const express = require('express');
const router = express.Router();
const usuarioController = require("../controllers/usuarios.controller")

router.get("/usuarios", usuarioController.index);
router.get("/usuarios/:id", usuarioController.getById);
router.post("/usuarios",usuarioController.createUser)
router.delete("/usuarios/:id",usuarioController.delete)
router.put("/usuarios/:id",usuarioController.update)
module.exports = router;