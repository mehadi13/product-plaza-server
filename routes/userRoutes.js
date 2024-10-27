// routes/userRoutes.js
import express from "express";
import {
  findAll,
  create,
  update,
  find,
  findByFirebase,
  deleteUser,
  loginUser,
} from "../controllers/userController.js";
import User from "../models/User.js";

const router = express.Router();

router.get("/", findAll);
router.post("/", create);
router.put("/:id", update);
router.get("/:id", find);
router.get("/firebase/:id", async (req, res) => {
  const userId = req.params.id;
  const existingUser = await User.findByFirebaseId({ firebaseId: userId });
  res.send(existingUser).status(200);
});
router.delete("/:id", deleteUser);
router.post("/login", loginUser);

export default router;
