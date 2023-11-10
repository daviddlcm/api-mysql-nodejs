require("dotenv").config();
const Usuario = require("../models/usuario.model")
const bcrypt = require("bcrypt");
const saltos = process.env.SALTOS;
const index = async (req, res) => {
    try{
        const usuarios = await Usuario.getAll();
        return res.status(200).json({
            message: "usuarios obtenidos correctamente",
            data: usuarios
        })
    }catch(error){
        return res.status(500).json({
        message: "error al obtener datos",
        error:error.message
        })
    }
}
const createUser = async (req,res) =>{
    try{
        const usuario = new Usuario({
            email:req.body.email,
            password: bcrypt.hashSync(req.body.password,parseInt(saltos))
        })
        await usuario.save();
        return res.status(200).json({
            message:"usuario creado correctamente",
            data:usuario
        })
    }catch(error){
        return res.status(500).json({
            message:"error al crear usuario",
            error:error.message
        })
    }
}
const getById = async (req,res) =>{
    try{
        const {id} = req.params;
        const usuario = await Usuario.getById(id);
        if(!usuario){
            return res.status(404).json({
                message:"usuario no encontrado con el id "+id,
            })
        }
        return res.status(200).json({
            message:"usuario obtenido correctamente",
            data:usuario
        })
    }catch(error){
        return res.status(500).json({
            message:"error al obtener un usuario",
            error:error.message
        })
    }
}
const deleteLogico = async (req,res) =>{
    try{
        const  idUsuario = req.params.id;
        await Usuario.deleteById(idUsuario);
        return res.status(200).json({
            message:"usuario eliminado correctamente",
        })
    }catch(error){
        return res.status(500).json({
            message:"error al eliminar un usuario",
            error:error.message
        })
    }
}
const deleteFisico = async (req,res)=>{
    try{
        const idUsuario = req.params.id;
        await Usuario.deleteFisicoById(idUsuario);
        return res.status(200).json({
            message:"se elimino definitivamente correctamente"
        })
    }catch(error){
        return res.status(500).json({
            message:"erro al eliminar un usuario",
            error: error.message
        })
    }
}
const update = async (req,res)=>{
    try{
        const idUsuario = req.params.id;
        //otra forma de hacerlo
        // const datosActualizar = {
        //     email:req.body.email,
        //     password:req.body.password
        // }
        // await Usuario.updateById(idUsuario,datosActualizar);
        await Usuario.updateById(idUsuario,req.body);
        return res.status(200).json({
            message:"se actualizo correctamente"
        })
    }catch(error){
        return res.status(500).json({
            message:"erro al eliminar un usuario",
            error: error.message
        })
    
    }
}
module.exports = {
    index,
    createUser,
    getById,
    delete : deleteLogico,
    update,
}