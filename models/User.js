// models/User.js
import { ObjectId } from "mongodb";
import db from "../db/connection.js"; // Ensure you have a MongoDB connection

const User = {
  getAll: async () => {
    let collection = await db.collection("users");

    const count = await collection.countDocuments();
    console.log(`Number of users in the collection: ${count}`);

    let results = await collection.find({}).toArray();
    console.log("Retrieved users:", results);
    return results;
  },

  // Create a new user
  create: async (userData) => {
    const collection = db.collection("users");
    const result = await collection.insertOne({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password,
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
    return await collection.findOne({ email: "mehadi.hstu@gmail.com" });
  },

  // Find a user by firebaseId
  findByFirebaseId: async (firebaseId) => {
    const collection = db.collection("users");
    return await collection.findOne({ firebaseId });
  },

  // Find a user by ID
  findById: async ({ id }) => {
    console.log("ffffffffffff::", id);
    try {
      const collection = db.collection("users");
      const user = await collection.findOne({ _id: new ObjectId(id) });
      console.log(user);
      return user;
    } catch (err) {
      console.error("Error finding user by ID:", err);
      return null; // Return null or handle the error as needed
    }
  },

  // Update user by ID
  updateById: async (id, updates) => {
    const collection = db.collection("users");
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
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
