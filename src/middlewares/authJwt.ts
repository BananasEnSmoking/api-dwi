import { NextFunction } from "express";
import {Request,Response} from 'express';
import jwt from "jsonwebtoken";
import config from '.././config';
import { connect } from "../database";


let Rol:number;

export const verifyToken = async (req:Request, res:Response, next:NextFunction) =>{
try {
    const toke = req.headers["x-access-token"]?.toString();  
if(!toke) return res.status(403).json({ message: "sin token" })
const decoded:any = jwt.verify(toke,config.SECRET);
if(!decoded) return res.status(404).json({ message:' token invalido ' })
    const conn = await connect()
    const usuarioT = req.body.usuario;
    const us:any = await conn.query('select * from usuarios where idUsuarios = ?',[decoded.id])
    const user = us[0]
if (user.length === 0) return res.status(404).json({ message: 'usuario no encontrado' })
Rol = user[0].Roles_idRoles;
conn.end()
next()
} catch (error) {
    return res.status(401).json({ message: 'No autorizado' })
}
}


export const admin = async (req:Request,res:Response,next:NextFunction)=>{
    if(Rol != 1) return res.status(404).json({ message:'rol invalido' })
    else{
        next()
    }
}

export const purchaser = async (req:Request,res:Response,next:NextFunction)=>{
    if(Rol != 2) return res.status(404).json({ message:'rol invalido' })
    else{
        next()
    }
}

export const seller = async (req:Request,res:Response,next:NextFunction)=>{
    if(Rol != 3) return res.status(404).json({ message:'rol invalido' })
    else{
        next()
    }
}