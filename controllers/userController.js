// controllers/userController.js
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const findAll = async (req, res) => {
    let results = await User.getAll();
    res.send(results).status(200);
}

const create = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      mobile,
      address,
      role,
      profilePicture,
      firebaseId,
    } = req.body;
    // Check if user already exists
    const existingUser = await User.findByEmail({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = {
      firstName,
      lastName,
      email,
      mobile,
      address,
      role,
      profilePicture,
      firebaseId
    };

    let saved = await User.create(newUser);
    res.send(saved).status(201);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const update = async (req, res) => {
  const id = req.params.id;
  let saved = await User.updateById(id, req.body);
  res.send(saved).status(201);
};

const find = async (req, res) => {
  const userId = req.params.id;
  const existingUser = await User.findById({ id: userId });
  res.send(existingUser).status(200);
}

const findByFirebase = async (req, res) => {
  const userId = req.params.id;
  const existingUser = await User.findByFirebaseId({ userId });
  res.send(existingUser).status(200);
}

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  const existingUser = await User.deleteById({ id: userId });
  res.send(existingUser).status(200);
}


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export { findAll, find, findByFirebase, create, update, deleteUser, loginUser };
