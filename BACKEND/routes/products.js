const { Product } = require('../models/product');
const express = require('express');
const { Category } = require('../models/category');
const router = express.Router();


router.get(`/`, async (req, res) => {
  const productList = await Product.find().select('name image  -_id');

  if (!productList) {
    res.status(500).json({ success: false });
  }
  res.send(productList);
});

router.get(`/:id`, async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(500).json({ success: false });
  }
  res.send(product);
});

router.post(`/`, async (req, res) => {
  const catagory = await Category.findById(req.body.catagory);
  if(!catagory) return res.status(400).send('Invalid Category')

  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    image: req.body.image,
    brand: req.body.brand,
    price: req.body.price,
    catagory: req.body.catagory,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeature: req.body.isFeature,
  });

  product = await product.save();

  if (!product) {
    return res.status(500).send('The product can not be created!')
  }

  res.send(product);

});

module.exports = router;

