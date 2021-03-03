import Rating from './Rating'
import { Link } from 'react-router-dom'

const Product = (props) => {
    const { product } = props

    return (
        <div className="card">
            <Link to={`/product/${product._id}`}>
                <img
                    className="medium"
                    src={product.image}
                    alt="product"
                />
            </Link>
            <div className="card-body">
                <Link to={`/product/${product._id}`}>
                    <h1>{product.name}</h1>
                </Link>
                <div className="rating">
                    <Rating rating={product.rating} numReviews={product.numReviews} />
                </div>
                <div className="price">${product.price}</div>
            </div>
        </div>
    )
}

export default Product
