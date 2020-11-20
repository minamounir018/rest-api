const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const multer = require('multer');

const storage =multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req, file , cb){
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) =>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
        cb(null, true);
    }
    else{
        cb(null, false);
    }
};

const upload = multer({storage: storage,
    limits: {
    fileSize: 1024 * 1024 * 5
    },
     fileFilter:fileFilter
});

const GiftProduct = require('../models/GiftProduct');

router.get('/',(req, res, next) =>{
    GiftProduct.find()
    .select('name desc price filter _id productImage')
    .exec()
    .then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });
});

router.post('/', upload.array('productImage', 5), (req, res, next) =>{
    
    const product = new GiftProduct({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        desc: req.body.desc,
        filter: req.body.filter,
        price: req.body.price,
        productImage: req.files
    });
    product.save().then(result =>{
        console.log(result);
        res.status(201).json({
            createdProduct: result
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });
});


router.get('/:giftproductId', (req, res, next) =>{
    const id= req.params.giftproductId;
    GiftProduct.findById(id)
    .select('name price desc filter _id productImage')
    .exec()
    .then(doc => {
        console.log("From database", doc);
        if(doc){
            res.status(200).json(doc);     
        }else{
            res.status(404).json({message:"no data"});
        }
       
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });
});

router.patch('/:giftproductId',(req, res, next) =>{
    const id = req.params.giftproductId;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    GiftProduct.update({_id: id}, { $set: updateOps })
    .exec()
    .then( result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });
});


router.delete('/:giftproductId',(req, res, next) =>{
    const id = req.params.giftproductId;
    GiftProduct.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });
});

module.exports = router;