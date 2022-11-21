import * as cardExistsController from '../controllers/cardExists.controller.js'
import { Router } from "express";
const router = Router()

router.post('/', cardExistsController.checkCardExists)

export default router