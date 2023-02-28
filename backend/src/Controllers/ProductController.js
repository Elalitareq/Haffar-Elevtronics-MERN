import productModel from "./../Models/ProductModel.js";
import fs from "fs";

export function getAll(req, res) {
  productModel.find({}).then((response) => {
    if (!response) {
      return res
        .status(404)
        .send({ status: 404, message: "No products available." });
    }
    res.send({
      status: 200,
      products: response,
    });
  });
}

export function getOne(req, res) {
  productModel
    .findById(req.params.id)
    .then((response) => {
      if (!response) {
        return res
          .status(404)
          .send({ status: 404, message: "Product not found." });
      }
      res.send({
        status: 200,
        product: response,
      });
    })
    .catch((error) => {
      res.status(500).send({ status: 500, message: error.message });
    });
}
export function addProduct(req, res, next) {
  let product = req.body;
  let newProduct = new productModel(product);
  newProduct
    .save()
    .then((response) => {
      res.status(201).send({
        status: 201,
        message: "Product added successfully.",
        product: newProduct,
        response,
      });
    })
    .catch((validationError) => {
      res.status(400).send({
        status: 400,
        message: validationError.message,
        error: validationError,
      });
    })
    .catch((error) => {
      res.status(500).send({ status: 500, message: error.message });
    });
}
export function editProduct(req, res) {
  productModel
    .findOneAndUpdate({ _id: req.params.id }, req.body, {})
    .then((data) => {
      if (!data) {
        res.status(404).send({ status: 404, message: "Product not found." });
      } else {
        if (req.body.image_path) {
          fs.unlinkSync(data.image_path);
        }
        res.status(200).send({
          status: 200,
          message: "Product updated successfully.",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({ status: 500, message: error.message });
    });
}
export function deleteProduct(req, res, next) {
  productModel
    .findByIdAndDelete({ _id: req.params.id })
    .then((data) => {
      if (data.deletedCount === 0) {
        res.status(404).send({ status: 404, message: "Product not found" });
      } else {
        fs.unlinkSync(data.image_path);
        res.send({
          status: 204,
          message: "Product deleted successfully",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({ status: 500, message: error.message });
    });
}
const productController = {
  addProduct,
  deleteProduct,
  getAll,
  getOne,
  editProduct,
};
export default productController;
