import { useState, useEffect } from 'react'
import axios from 'axios'

import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import Product from "../components/Product";

const HomeScreen = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {

        const fetchData = async () => {
            try {
                setLoading(true)
                const { data } = await axios.get('/api/products')
                setLoading(false)    
                setProducts(data)
            } catch (error) {
                setError(error.message)
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    return (
        <>
            {loading ? <LoadingBox /> : error ? <MessageBox variant="error">{error}</MessageBox> : <div className="row center">
                {products.map((product) => (
                    <Product key={product._id} product={product} />
                ))}
            </div>}
        </>
    )
}

export default HomeScreen
