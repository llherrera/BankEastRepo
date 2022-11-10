import * as defaController from '../controllers/defa.Controller.js'
import { Router } from "express";
const router = Router()

router.get('/', defaController.sending)

export default router