import {Request,Response} from 'express';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import config from "../config";
import { connect } from "../database";


export const getProducts = async (req:Request,res:Response):Promise<Response> =>{
  if(!req.body || !req.header){
    return res.status(400).json({ msg: 'Envia toda la informacion' })
  }
    const conn = await connect()
    const response =  await conn.query('Select b.rat as rating,products.name as productName,products.idproducts,products.img,products.price,users.nombre as sellerName, users.apellido as sellerLastName, category.category from products join usuarios as users on users.idusuarios = products.idSeller inner join ( select products_idproducts,round(sum(valueRating)/count(*),1) as rat from rating group by products_idproducts) as b on b.products_idproducts = products.idproducts inner join category on products.category_idcategory = category.idcategory')
    conn.end()
    return res.json({msg:'success',products:response[0]})
}

export const getProductsByCategory = async (req:Request,res:Response):Promise<Response> =>{
  const conn = await connect()
  const response =  await conn.query('Select b.rat as rating,products.name as productName,products.idproducts,products.img,products.price,users.nombre as sellerName, users.apellido as sellerLastName, category.category from products join usuarios as users on users.idusuarios = products.idSeller inner join ( select products_idproducts,round(sum(valueRating)/count(*),1) as rat from rating group by products_idproducts) as b on b.products_idproducts = products.idproducts inner join category on products.category_idcategory = category.idcategory where category = ?',[req.body.idcategory])
  conn.end()
  return res.json({msg:'success',products:response[0]})
}

export const getOneProduct = async (req:Request,res:Response):Promise<Response> =>{
  if(!req.body){
    return res.status(400).json({ msg: 'Envia toda la informacion' })
  }
  const conn = await connect()
    const response =  await conn.query('Select b.rat as rating,products.name as productName,products.img,products.price,users.nombre as sellerName, users.apellido as sellerLastName, category.category,products.longDescription from products join usuarios as users on users.idusuarios = products.idSeller inner join ( select products_idproducts,round(sum(valueRating)/count(*),1) as rat from rating group by products_idproducts) as b on b.products_idproducts = products.idproducts inner join category on products.category_idcategory = category.idcategory where products.idproducts = ?',[req.body.idproduct])
  conn.end()
  return res.json({msg:'success',product:response[0]})
}

export const insertProduct =async(req:Request,res:Response):Promise<Response>=>{
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
        const product = await conn.query('insert into products (idproducts,name,idSeller,img,price,category_idcategory,longDescription)values(default,?,?,?,?,?,?)',[req.body.name,decoded.id,req.body.image,req.body.price,req.body.category,req.body.longDescription]);
        const idProd = product[0].insertId
        const ratio = await conn.query('insert into rating (idrating,usuarios_idusuarios,products_idproducts,valueRating)values(default,?,?,?)',[decoded.id,idProd,2.0]);
        await conn.commit();
        return res.status(200).json({msg:'success'})
    
      } catch (error) {
        return res.status(400).send(error)
      }
    
}