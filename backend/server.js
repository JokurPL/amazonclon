import express from 'express';
import data from './data.js';

const app = express()
const port = 5000

app.get('/api/products', (req, res) => {
    res.send(data.products)
})

app.listen(port, () => console.log(`Serve at http://localhost:${port}/`))