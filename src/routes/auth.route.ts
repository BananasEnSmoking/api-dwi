  
import {Router} from 'express';

const router = Router();

import { infousuario, signIn } from "../controllers/user.controller";

router.post('/signin',signIn);
router.get('/infousuario',infousuario)

export default router;