import express from 'express';
import data from './data.js';

const app = express()
const port = 5000

app.get('/api/product/:id', (req, res) => {
    const product = data.products.find(x => x._id == req.params.id)

    if (product) {
        res.send(product)
    } else {
        res.status(404).send({message: 'Product not found'})
    }
})

app.get('/api/products', (req, res) => {
    res.send(data.products)
})

app.listen(port, () => console.log(`Serve at http://localhost:${port}/`))