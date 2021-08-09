import {Request,Response} from 'express';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import config from "../config";
import { connect } from "../database";

//insertar un producto
export const insertCar =async(req:Request,res:Response):Promise<Response>=>{
    if(!req.body || !req.header){
        return res.status(400).json({ msg: 'Envia toda la informacion' })
      }
      let conn:any =null;
      const pool = await connect();
      try {
        const toke = req.headers["x-access-token"]?.toString();

        if(!toke) return res.status(403).json({ message: "sin token" })
    
        const decoded:any = jwt.verify(toke,config.SECRET);
    
        if(!decoded) return res.status(404).json({ message:' token invalido ' })
        conn = await pool.getConnection();
        console.log(req.body)
        const getCar:any = await conn.query('Select * from car where usuarios_idusuarios = ? and products_idproducts = ?',[decoded.id,req.body.idproduct])
        const carResult = getCar[0][0];
        if(!carResult){
            const addcar = await conn.query('insert into car (usuarios_idusuarios,products_idproducts,cantidad)values(?,?,?)',[decoded.id,req.body.idproduct,req.body.cantidad]);
        }
        else{
            const addcar = await conn.query('update car set cantidad = ? where usuarios_idusuarios = ? and products_idproducts = ?;',[(parseInt(req.body.cantidad) + parseInt(carResult.cantidad)) ,decoded.id,req.body.idproduct]);
        }
        await conn.commit();
        return res.status(200).json({msg:'success'})
    
      } catch (error) {
        return res.status(400).send(error)
      }
    
}

//borrar un producto
export const deleteItemCar =async(req:Request,res:Response):Promise<Response>=>{
    if(!req.body || !req.header){
        return res.status(400).json({ msg: 'Envia toda la informacion' })
      }
      let conn:any =null;
      const pool = await connect();
      try {
        const toke = req.headers["x-access-token"]?.toString();

        if(!toke) return res.status(403).json({ message: "sin token" })
    
        const decoded:any = jwt.verify(toke,config.SECRET);
    
        if(!decoded) return res.status(404).json({ message:' token invalido ' })
        conn = await pool.getConnection();
        console.log(req.body)
        const addcar = await conn.query('delete from car where usuarios_idusuarios = ? and products_idproducts = ?',[decoded.id,req.body.idproduct]);
        await conn.commit();
        return res.status(200).json({msg:'success'})
    
      } catch (error) {
        return res.status(400).send(error)
      }
    
}

//eliminar todo el carrito
export const deleteAllCar =async(req:Request,res:Response):Promise<Response>=>{
    if(!req.header){
        return res.status(400).json({ msg: 'Envia toda la informacion' })
      }
      let conn:any =null;
      const pool = await connect();
      try {
        const toke = req.headers["x-access-token"]?.toString();

        if(!toke) return res.status(403).json({ message: "sin token" })
    
        const decoded:any = jwt.verify(toke,config.SECRET);
    
        if(!decoded) return res.status(404).json({ message:' token invalido ' })
        conn = await pool.getConnection();
        const addcar = await conn.query('delete from car where usuarios_idusuarios = ?',[decoded.id]);
        await conn.commit();
        return res.status(200).json({msg:'success'})
    
      } catch (error) {
        return res.status(400).send(error)
      }
    
}

//Actualizar producto

export const updateCar =async(req:Request,res:Response):Promise<Response>=>{
    if(!req.body || !req.header){
        return res.status(400).json({ msg: 'Envia toda la informacion' })
      }
      let conn:any =null;
      const pool = await connect();
      try {
        const toke = req.headers["x-access-token"]?.toString();

        if(!toke) return res.status(403).json({ message: "sin token" })
    
        const decoded:any = jwt.verify(toke,config.SECRET);
    
        if(!decoded) return res.status(404).json({ message:' token invalido ' })
        conn = await pool.getConnection();
        const addcar = await conn.query('update car set cantidad = ? where usuarios_idusuarios = ? and products_idproducts = ?;',[req.body.cantidad,decoded.id,req.body.idproduct]);
        await conn.commit();
        return res.status(200).json({msg:'success'})
    
      } catch (error) {
        return res.status(400).send(error)
      }
    
}


//get car



export const getCar =async(req:Request,res:Response):Promise<Response>=>{
    if(!req.header){
        return res.status(400).json({ msg: 'Envia toda la informacion' })
      }
      let conn:any =null;
      const pool = await connect();
      try {
        const toke = req.headers["x-access-token"]?.toString();

        if(!toke) return res.status(403).json({ message: "sin token" })
    
        const decoded:any = jwt.verify(toke,config.SECRET);
    
        if(!decoded) return res.status(404).json({ message:' token invalido ' })
        conn = await pool.getConnection();
        const result = await conn.query('SELECT * FROM dwi_api.car inner join products on products.idproducts = products_idproducts where usuarios_idusuarios = ?;',[decoded.id]);
        await conn.commit();
        return res.status(200).json({msg:'success',car:result[0]})
    
      } catch (error) {
        return res.status(400).send(error)
      }
    
}