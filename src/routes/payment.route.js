import * as paymentController from '../controllers/payment.controller.js'
import { Router } from "express";

const router = Router()

router.use('/', paymentController.validationAndMake)

export default router