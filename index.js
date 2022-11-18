import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connect } from './src/configs/db.config.js'


const app = express()

import paymentRoute from './src/routes/payment.route.js'
import defaRoute from './src/routes/default.route.js' 
import balanceRoute from './src/routes/balance.route.js'

import createRoute from './src/routes/create.route.js'
import cardRoute from './src/routes/card.route.js'


//Middlewares
app.use(cors())
app.use(express.json())


app.use('/', defaRoute)
app.post('/makepay', paymentRoute)
app.post('/checkbalance', balanceRoute)

app.use('/createUserBank', createRoute) //
app.use('/createCard', cardRoute)       //


connect();


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('Server on port', PORT)
})