import express from "express";
import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Product from "../models/productModel.js";

import { isAuth, isAdmin, isSellerOrAdmin } from "../utils.js";

const productRouter = express.Router();

productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const seller = req.query.seller || "";
    const sellerFilter = seller ? { seller } : {};
    const products = await Product.find({ ...sellerFilter });
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
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = new Product({
      name: "sample name",
      seller: req.user._id,
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

productRouter.put(
  "/:id",
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (product) {
      product.name = req.body.name;
      product.price = req.body.price;
      product.image = req.body.image;
      product.category = req.body.category;
      product.brand = req.body.brand;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;

      if (product.price < 0) {
        res
          .status(400)
          .send({ message: "Price must be greater or equal than 0" });
        return;
      }

      if (product.countInStock < 0) {
        res
          .status(400)
          .send({ message: "Count in stock must be greater or equal than 0" });
        return;
      }

      const updatedProduct = await product.save();

      res.send({ message: "Product updated", product: updatedProduct });
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  })
);

productRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      const { data } = await product.delete();
      res.send({ message: "Product deleted" });
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  })
);

export default productRouter;
