const express = require('express')
const productController = require('../controllers/productController')
const authMiddleware = require('../middleware/authMiddleware')
const Router = express.Router()


Router.post('/getProduct', authMiddleware, productController.retreive )
Router.post('/AddProduct', authMiddleware, productController.add )
Router.post('/UpdateProduct', authMiddleware, productController.update )
Router.post('/DeleteProduct', authMiddleware, productController.delete )

module.exports = Router