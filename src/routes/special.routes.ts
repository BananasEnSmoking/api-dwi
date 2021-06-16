import {Router} from 'express';

const router = Router();

import {  signUp} from "../controllers/user.controller";
import { authJwt } from "../middlewares";


router.post('/signup',signUp);



export default router;