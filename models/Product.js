// models/User.js
import { ObjectId } from "mongodb";
import db from "../db/connection.js"; // Ensure you have a MongoDB connection

const Product = {
  findAll: async (page = 1, limit = 10) => {
    try {
      const collection = db.collection("products");

      // Convert page and limit to numbers
      const pageNum = parseInt(page, 10);
      const limitNum = parseInt(limit, 10);

      // Calculate the number of documents to skip
      const skip = (pageNum - 1) * limitNum;

      // Fetch the products with pagination
      const results = await collection
        .find({})
        .skip(skip) // Skip the number of documents
        .limit(limitNum) // Limit the number of documents returned
        .toArray();

      // Count total documents for pagination info
      const totalCount = await collection.countDocuments();

      return {
        totalCount, // Total number of documents
        page: pageNum, // Current page
        limit: limitNum, // Limit per page
        results, // Fetched results
      };
    } catch (error) {
      console.error("Error retrieving products:", error);
      return { results: [], totalCount: 0 }; // Return empty results on error
    }
  },

  create: async (data) => {
    const collection = db.collection("products");
    const product = {
      name: data.name,
      description: data.description,
      price: data.price,
      category: data.category,
      rating: data.rating,
      stock: data.stock,
      image: data.image || "default-product.png",
      createdAt: new Date(),
    };
    const result = await collection.insertOne(product);
    return result;
  },

  // Find by category
  findByCategory: async (category, page = 1, limit = 10) => {
    try {
      const collection = db.collection("products");

      // Convert page and limit to numbers
      const pageNum = parseInt(page, 10);
      const limitNum = parseInt(limit, 10);

      // Calculate the number of documents to skip
      const skip = (pageNum - 1) * limitNum;

      // Fetch the products by category with pagination
      const results = await collection
        .find({ category })
        .skip(skip) // Skip the number of documents
        .limit(limitNum) // Limit the number of documents returned
        .toArray();

      // Count total documents for pagination info
      const totalCount = await collection.countDocuments({ category });

      return {
        totalCount, // Total number of documents in the category
        page: pageNum, // Current page
        limit: limitNum, // Limit per page
        results, // Fetched results
      };
    } catch (error) {
      console.error("Error retrieving products by category:", error);
      return { results: [], totalCount: 0 }; // Return empty results on error
    }
  },

  // Find by ID
  findById: async ({ id }) => {
    try {
      const collection = db.collection("products");
      const product = await collection.findOne({ _id: new ObjectId(id) });
      return product;
    } catch (err) {
      console.error("Error finding by ID:", err);
      return null; // Return null or handle the error as needed
    }
  },

  // Update user by ID
  updateById: async (id, updates) => {
    const collection = db.collection("products");
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
    );
    return result.modifiedCount > 0;
  },

  // Delete by ID
  deleteById: async (id) => {
    const collection = db.collection("products");
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  },
};

export default Product;
