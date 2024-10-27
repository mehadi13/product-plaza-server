// controllers/userController.js
import Category from "../models/Category.js";

const findAll = async (req, res) => {
    let results = await Category.findAll();
    res.send(results).status(200);
};

const create = async (req, res) => {
    let saved = await Category.create(req.body);
    res.send(saved).status(201);
};

const update = async (req, res) => {
    const id = req.params.id;
    let saved = await Category.update(id, req.body);
    res.send(saved).status(201);
};

const find = async (req, res) => {
    const id = req.params.id;
    const category = await Category.findById({ id });
    res.send(category).status(200);
};

const deleteCategory = async (req, res) => {
    const id = req.params.id;
    const category = await Category.deleteById({ id });
    res.send(category).status(200);
};

export { findAll, create, update, find, deleteCategory };
