import {Request,Response} from 'express';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import config from "../config";
import { connect } from "../database";


export const getProducts = async (req:Request,res:Response):Promise<Response> =>{
    console.log(req.body)
    const conn = await connect()
    const response =  await conn.query('Select b.rat as rating,products.name as productName,products.img,products.price,users.nombre as sellerName, users.apellido as sellerLastName from products join usuarios as users on users.idusuarios = products.idSeller inner join ( select products_idproducts,round(sum(valueRating)/count(*),1) as rat from rating group by products_idproducts) as b on b.products_idproducts = products.idproducts')
    conn.end()
    return res.json({msg:'success',products:response[0]})
}