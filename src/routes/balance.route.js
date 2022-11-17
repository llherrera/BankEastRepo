import * as balanceController from '../controllers/balance.controller.js'
import { Router } from "express";
const router = Router()

router.use('/', balanceController.checkingBalance)
// router.use('/', balanceController.checkCardBalance)

export default router