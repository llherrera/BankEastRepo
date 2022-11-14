import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connect } from './src/configs/db.config.js'



const app = express()

import paymentRoute from './src/routes/payment.route.js'
import defaControl from './src/routes/default.route.js' 



//Middlewares
app.use(cors())
app.use(express.json())


app.use('/', defaControl)
app.use('/makepay', paymentRoute)


connect();




const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('Server on port', PORT)
})