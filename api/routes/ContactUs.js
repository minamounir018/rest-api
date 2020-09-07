const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const ContactUs = require('../models/ContactUs');

router.get('/',(req, res, next) =>{
    ContactUs.find()
    .select('email question')
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

router.post('/', (req, res, next) =>{
    
    const product = new ContactUs({
        _id: new mongoose.Types.ObjectId(),
        question: req.body.question,
        email: req.body.email
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


router.get('/:contactusId', (req, res, next) =>{
    const id= req.params.contactusId;
    ContactUs.findById(id)
    .select('email question')
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

router.patch('/:contactusId',(req, res, next) =>{
    const id = req.params.contactusId;
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    ContactUs.update({_id: id}, { $set: updateOps })
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


router.delete('/:contactusId',(req, res, next) =>{
    const id = req.params.contactusId;
    ContactUs.remove({_id: id})
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