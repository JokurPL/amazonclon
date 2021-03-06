import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import productModel from "../models/productModel.js";
import Product from "../models/productModel.js";

import { isAuth, isAdmin } from "../utils.js";

const productRouter = express.Router();

productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
  })
);

productRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
  })
);

productRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  })
);

productRouter.post(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = new Product({
      name: "sample name",
      image: "/images/temp.jpg",
      price: 0,
      category: "sample category",
      brand: "sample brand",
      countInStock: 1,
      rating: 1,
      numReviews: 1,
      description: "sample description",
    });
    const createdProduct = await product.save();
    res.send({ message: "Product created", product: createdProduct });
  })
);

export default productRouter;
