import * as paymentController from '../controllers/payment.controller.js'
import { Router } from "express";

const router = Router()

router.get('/', paymentController.ungetaleatorio)
router.post('/', paymentController.validationAndMake)

export default router