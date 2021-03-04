import express from 'express';
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import userRouter from './routers/userRouter.js'
import productRouter from './routers/productRouter.js'
import orderRouter from './routers/orderRouter.js';

const port = 5000

dotenv.config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/amazonclon', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})

app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/orders', orderRouter)

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message })
})

app.listen(port, () => console.log(`Serve at http://localhost:${port}/`))