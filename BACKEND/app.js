const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

require('dotenv/config');
const api = process.env.API_URL;

const productsRouter = require('./routers/products');

//Middleware
app.use(express.json());
app.use(morgan('tiny'));

//Routers
app.use(`${api}/products`, productsRouter);


mongoose.connect(process.env.CONNECTION_STRING)
.then(()=>{
    console.log('Database Connection is ready');
})
.catch((err)=>{
    console.log(err);
})


app.listen(3000, ()=>{
    console.log("The server is running now on http://localhost:3000");
});


