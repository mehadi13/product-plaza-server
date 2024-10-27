// models/User.js
import { ObjectId } from "mongodb";
import db from "../db/connection.js"; // Ensure you have a MongoDB connection

const User = {
  getAll: async () => {
    let collection = await db.collection("users");
    const count = await collection.countDocuments();
    let results = await collection.find({}).toArray();
    return results;
  },

  // Create a new user
  create: async (userData) => {
    const collection = db.collection("users");
    const result = await collection.insertOne({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      mobile: userData.mobile,
      address: userData.address,
      role: userData.role || "USER",
      profilePicture: userData.profilePicture || "default-profile.png",
      firebaseId: userData.firebaseId,
      createdAt: new Date(),
    });
    return result;
  },

  // Find a user by email
  findByEmail: async (email) => {
    const collection = db.collection("users");
    return await collection.findOne({ email });
  },

  // Find a user by firebaseId
  findByFirebaseId: async (data) => {
    const collection = db.collection("users");
    return await collection.findOne({ firebaseId: data.firebaseId});
  },

  // Find a user by ID
  findById: async ({ id }) => {
    try {
      const collection = db.collection("users");
      const user = await collection.findOne({ _id: new ObjectId(id) });
      return user;
    } catch (err) {
      console.error("Error finding user by ID:", err);
      return null; // Return null or handle the error as needed
    }
  },

  // Update user by ID
  updateById: async (id, data) => {
    const collection = db.collection("users");

    const user = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      mobile: data.mobile,
      address: data.address,
      role: data.role,
      profilePicture: data.profilePicture || "default-product.png", // Use provided image or default
      firebaseId: data.firebaseId,
      updatedAt: new Date(), // Track the update time
  };

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: user }
    );
    return result.modifiedCount > 0;
  },

  // Delete a user by ID
  deleteById: async (id) => {
    const collection = db.collection("users");
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  },
};

export default User;
