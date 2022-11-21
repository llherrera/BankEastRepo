import * as validCardController from '../controllers/validCard.controller.js'
import { Router } from "express";
const router = Router()

router.post('/', validCardController.checkValidCard)

export default router