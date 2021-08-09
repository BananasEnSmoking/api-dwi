import {Request,Response} from 'express';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import config from "../config";
import { connect } from "../database";


export const getCategories = async (req:Request,res:Response):Promise<Response> =>{
    const conn = await connect()
    const response =  await conn.query('Select * from category')
    conn.end()
    return res.json(response[0])
}