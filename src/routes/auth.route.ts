  
import {Router} from 'express';

const router = Router();

import { infousuario, signIn } from "../controllers/user.controller";
import { getOneProduct, getProducts, insertProduct } from '../controllers/products.controller';
import { getCategories } from '../controllers/category.controller';
import { getCar, insertCar } from '../controllers/car.controller';

router.post('/signin',signIn);
router.get('/infousuario',infousuario)

//all
router.get('/products',getProducts)
router.post('/insertProduct',insertProduct)
router.get('/getCategories',getCategories)
router.post('/getOneProduct',getOneProduct)
router.post('/insertCar',insertCar)
router.get('/getCar',getCar)



export default router;