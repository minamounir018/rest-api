const express = require('express');
const app = express();

const morgan = require('morgan');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const NewProduct =require('./api/routes/NewProducts');
const DiningProduct =require('./api/routes/DiningProduct');
const KitchenProduct =require('./api/routes/KitchenProducts');
const BestSellers =require('./api/routes/BestSellers');
const Offers =require('./api/routes/Offers');
const OfficeProduct =require('./api/routes/OfficeProducts');
const BathProduct =require('./api/routes/BathProducts');
const GiftProduct =require('./api/routes/GiftProducts');
const VanityProduct =require('./api/routes/VanityProducts');
const RareProduct =require('./api/routes/RareProducts');
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


app.use('/newproducts', NewProduct);
app.use('/diningproducts', DiningProduct);
app.use('/kitchenproducts', KitchenProduct);
app.use('/officeproducts', OfficeProduct);
app.use('/bathproducts', BathProduct);
app.use('/rareProducts', RareProduct);
app.use('/vanityproducts', VanityProduct);
app.use('/giftproducts', GiftProduct);
app.use('/bestsellersproducts', BestSellers);
app.use('/offerproducts', Offers);

app.use('/contactus', ContactUs);

app.use((req, res, next) => {
    const error= new Error('Error not found');
    error.status=404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
})
module.exports = app; 