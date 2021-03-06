  
import {Router} from 'express';

const router = Router();

import { infousuario, signIn } from "../controllers/user.controller";
import { getOneProduct, getProducts, getProductsByCategory, insertProduct } from '../controllers/products.controller';
import { getCategories } from '../controllers/category.controller';
import { deleteAllCar, deleteItemCar, getCar, getPedidos, insertCar, insertPedido, updateCar } from '../controllers/car.controller';

router.post('/signin',signIn);
router.get('/infousuario',infousuario)

//all
router.get('/products',getProducts)
router.post('/insertProduct',insertProduct)
router.get('/getCategories',getCategories)
router.post('/getOneProduct',getOneProduct)
router.post('/insertCar',insertCar)
router.get('/getCar',getCar)
router.get('/clearCar',deleteAllCar)
router.post('/deleteItemCar',deleteItemCar)
router.post('/insertPedido',insertPedido)
router.get('/getPedidos',getPedidos)
router.post('/updateCar',updateCar)
router.post('/getProductsByCategory',getProductsByCategory)






export default router;