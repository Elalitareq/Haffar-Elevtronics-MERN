

import serviceModel from "./../Models/ServiceModel.js";
import fs from "fs";

export function getAll(req, res) {
  serviceModel.find({}).then((response) => {
    if (!response) {
      return res
        .status(404)
        .send({ status: 404, message: "No services available." });
    }
    res.send({
      status: 200,
      services: response,
    });
  });
}

export function getOne(req, res) {
  serviceModel
    .findById(req.params.id)
    .then((response) => {
      if (!response) {
        return res
          .status(404)
          .send({ status: 404, message: "Service not found." });
      }
      res.send({
        status: 200,
        service: response,
      });
    })
    .catch((error) => {
      res.status(500).send({ status: 500, message: error.message });
    });
}
export function addService(req, res, next) {
  let service = req.body;
  let newService = new serviceModel(service);
  newService
    .save()
    .then((response) => {
      res.status(201).send({
        status: 201,
        message: "Service added successfully.",
        service: newService,
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
export function editService(req, res) {
  serviceModel
    .findOneAndUpdate({ _id: req.params.id }, req.body, {})
    .then((data) => {
      if (!data) {
        res.status(404).send({ status: 404, message: "Service not found." });
      } else {
        if (req.body.image_path) {
          fs.unlinkSync(data.image_path);
        }
        res.status(200).send({
          status: 200,
          message: "Service updated successfully.",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({ status: 500, message: error.message });
    });
}
export function deleteService(req, res, next) {
  serviceModel
    .findByIdAndDelete({ _id: req.params.id })
    .then((data) => {
      if (data.deletedCount === 0) {
        res.status(404).send({ status: 404, message: "Service not found" });
      } else {
        fs.unlinkSync(data.image_path);
        res.send({
          status: 204,
          message: "Service deleted successfully",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({ status: 500, message: error.message });
    });
}
const serviceController = {
  addService,
  deleteService,
  getAll,
  getOne,
  editService,
};
export default serviceController;
