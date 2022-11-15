import * as createController from '../controllers/create.controller.js'
import { Router } from "express";
const router = Router()

router.post('/', createController.createUserBank)

export default router