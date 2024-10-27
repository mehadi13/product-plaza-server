// controllers/userController.js
import Product from "../models/Product.js";

const findAll = async (req, res) => {
  let results = await Product.findAll();
  res.send(results).status(200);
};

const findByCategory = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = parseInt(req.query.limit) || 20; // Default to 10 items per page
  const { category } = req.query;
  let results = await Product.findByCategory(category, page, limit);
  res.send(results).status(200);
};

const create = async (req, res) => {
  let saved = await Product.create(req.body);
  res.send(saved).status(201);
};

const update = async (req, res) => {
  const id = req.params.id;
  let saved = await Product.update(id, req.body);
  res.send(saved).status(201);
};

const find = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById({ id });
  res.send(product).status(200);
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;
  const product = await Product.deleteById({ id });
  res.send(product).status(200);
};

export { findAll, findByCategory, find, create, update, deleteProduct };
