import bcrypt from 'bcryptjs'

const data = {
    users: [
        {
            name: 'przegryw',
            email: 'admin@example.com',
            password: bcrypt.hashSync('admin', 8),
            isAdmin: true,
        },
        {
            name: 'John',
            email: 'john@example.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: false,
        }
    ],
    products: [
        {
            name: 'XBOX USB Adapter',
            category: 'Electronics',
            image: '/images/temp.jpg',
            price: 120,
            brand: 'Microsoft',
            rating: 4.5,
            numReviews: 10,
            description: 'High quality product',
            countInStock: 10

        },
        {
            name: 'APPLE USB Adapter',
            category: 'Electronics',
            image: '/images/temp.jpg',
            price: 1200,
            brand: 'Apple',
            rating: 2,
            numReviews: 100,
            description: 'Low quality product',
            countInStock: 0

        },
        {
            name: 'XIAOMI POCO X3 NFC',
            category: 'Electronics',
            image: '/images/temp.jpg',
            price: 999,
            brand: 'Xiaomi',
            rating: 5,
            numReviews: 1032,
            description: 'Ultra high quality product',
            countInStock: 0

        },
        {
            name: 'XBOX ONE X',
            category: 'Electronics',
            image: '/images/temp.jpg',
            price: 120,
            brand: 'Microsoft',
            rating: 4.5,
            numReviews: 10,
            description: 'High quality product',
            countInStock: 2

        },
        {
            name: 'Chromebook',
            category: 'Electronics',
            image: '/images/temp.jpg',
            price: 1000,
            brand: 'Google INC.',
            rating: 3.5,
            numReviews: 32110,
            description: 'High quality notebook',
            countInStock: 3
        }
    ]
}

export default data