import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { PORT } from './src/configs/index.js'
const app = express()

import paymentRoute from './src/routes/payment.route.js'
import defaControl from './src/routes/default.route.js' 

//Middlewares
app.use(cors())
app.use(express.json())


app.use('/', defaControl)

app.use('/makepay', paymentRoute)


app.listen(PORT, () => {
    console.log('Server on port', PORT)
})