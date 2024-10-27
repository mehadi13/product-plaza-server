// models/User.js
import { ObjectId } from "mongodb";
import db from "../db/connection.js"; // Ensure you have a MongoDB connection

const Category = {
    findAll: async () => {
        try {
            const collection = db.collection("categories");

            const results = await collection
                .find({}).toArray();

            return {
                results
            };
        } catch (error) {
            console.error("Error retrieving products:", error);
            return { results: [] };
        }
    },

    create: async (data) => {
        const collection = db.collection("categories");
        const category = {
            name: data.name,
            description: data.description,
            createdAt: new Date(),
        };
        const result = await collection.insertOne(category);
        return result;
    },

    update: async (id, data) => {
        const collection = db.collection("categories");

        const updated = {
            name: data.name,
            description: data.description,
            updatedAt: new Date()
        };

        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updated }
        );

        return result;
    },

    // Find by ID
    findById: async ({ id }) => {
        try {
            const collection = db.collection("categories");
            const product = await collection.findOne({ _id: new ObjectId(id) });
            return product;
        } catch (err) {
            console.error("Error finding by ID:", err);
            return null; // Return null or handle the error as needed
        }
    },
    // Delete by ID
    deleteById: async (id) => {
        const collection = db.collection("categories");
        const result = await collection.deleteOne({ _id: new ObjectId(id) });
        return result.deletedCount > 0;
    },
};

export default Category;
