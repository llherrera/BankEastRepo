import * as balanceController from '../controllers/balance.controller.js'
import { Router } from "express";
const router = Router()

router.get('/', balanceController.checkingBalance)

export default router