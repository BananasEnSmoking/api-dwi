  
import {Router} from 'express';

const router = Router();

import { infousuario, signIn } from "../controllers/user.controller";
import { getProducts } from '../controllers/products.controller';

router.post('/signin',signIn);
router.get('/infousuario',infousuario)

//all
router.get('/products',getProducts)

export default router;