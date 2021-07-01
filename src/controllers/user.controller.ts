import {Request,Response} from 'express';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import config from "../config";
import { connect } from "../database";

const encryptPassword = async(password:any)=>{
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password,salt);
}

const comparePassword = async (password:any,recivedPassword:any)=>{
    return await bcrypt.compare(password,recivedPassword)
}

export const signUp = async (req:Request,res:Response):Promise<Response> =>{
    console.log(req.body)
    if(!req.body.username || !req.body.password){
        return res.status(400).json({ msg: 'Envia toda la información' })
    }
    const conn = await connect()
    const usuarioT = req.body.username;
    const us:any = await conn.query('select * from usuarios where usuario = ?',[usuarioT])
    if(us[0].length > 0){ return res.status(400).json('El usuario ya existe') }
    const user = us[0][0];
    const passEncrypt = await encryptPassword(req.body.password);
    const reqUser = req.body;
    console.log(reqUser)
    reqUser.password = passEncrypt;
    const insertUser =  await conn.query('INSERT INTO dwi_api.usuarios (idusuarios,usuario,password,nombre,apellido,roles_idroles)VALUES(default,?,?,?,?,?)',[reqUser.username,passEncrypt,reqUser.name,reqUser.lastname,reqUser.rol])
    conn.end()
    return res.json({msg:'success'})
}


export const signIn = async (req:Request,res:Response):Promise<Response> =>{
    if(!req.body.usuario || !req.body.password){
        return res.status(400).json({ msg: 'Envia toda la información' })
    }

    const conn = await connect()
    const usuarioT = req.body.usuario;
    const us:any = await conn.query('select * from usuarios where usuario = ?',[usuarioT])
    const user = us[0][0];
    if(!user){
        return res.status(401).json({msg:'Usuario o contraseña inválidos'})
    }

    const matchPassword = await comparePassword(req.body.password ,user.password)
    if(!matchPassword) return res.status(401).json({ token: null, msg:'Usuario o contraseña inválidos' })
    const token = jwt.sign({ id: user.idusuarios }, config.SECRET,{
        expiresIn:28800 //8 horas
    })
    conn.end()
    console.log(`INICIO DE SESION --> ${usuarioT}`)
    return res.json({token})
}

export const infousuario=async(req:Request,res:Response):Promise<Response>=>{
    const token = req.headers['x-access-token']?.toLocaleString();
    if(!token) return res.status(403).json({ message: "sin token" })
    const decoded:any = jwt.verify(token,config.SECRET);
    if(!decoded) return res.status(404).json({ message:' token invalido ' })
    try {
        const conn = await connect();
        const info = await conn.query('SELECT nombre,apellido,roles_idroles from usuarios where idusuarios = ?',[decoded.id]);
        conn.end()
        return res.status(200).json(info[0]);
    } catch (error) {
        return res.status(400).json({ msg: error})
    }
}