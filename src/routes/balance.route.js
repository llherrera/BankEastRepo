import * as balanceController from '../controllers/balance.controller.js'
import { Router } from "express";
const router = Router()

router.get('/', balanceController.checkingBalance)
router.get('/card', balanceController.checkCardBalance)

export default router