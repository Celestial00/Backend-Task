const express = require('express')
const app = express()
const authRouter = require('./routes/Auth')
const productRouter = require('./routes/Product')
require('dotenv').config()




//middleware 


app.use(express.json())
app.use('/api/auth', authRouter )
app.use('/api/products', productRouter)

app.listen(process.env.PORT || 3001, () =>{

    console.log("running on: " + process.env.PORT);


})