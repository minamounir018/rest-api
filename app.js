const express = require('express');
const app =express();

const morgan = require('morgan');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const productRoutes =require('./api/routes/products');
const OrdersRoutes =require('./api/routes/Orders');
const NewProduct =require('./api/routes/NewProducts');
const ContactUs =require('./api/routes/ContactUs');

mongoose.connect(
    'mongodb+srv://Mina-Mounir:minamoneR018@mina-rest-api.qyyly.mongodb.net/Mina-rest-api?retryWrites=true&w=majority',
{ 
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        ); 
        if(req.method === 'OPTIONS')
        {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE,GET');
            return res.status(200).json({});
        }
        next();

});

app.use('/orders', OrdersRoutes);
app.use('/products', productRoutes);
app.use('/newproducts', NewProduct);
app.use('/contactus', ContactUs);

app.use(NewProduct);

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});

module.exports = app;