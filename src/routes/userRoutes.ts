import * as express from "express";
import * as UserController from "../controllers/userController";
import { User } from "../models/User";

export const userRoutes = express.Router();
userRoutes.route("/").get((req, res) => {
  res.status(200).json(UserController.listUsers());
});

userRoutes.route("/:id").get((req, res) => {
  const userId: number = parseFloat(req.params.id);
  res.status(200).json(UserController.findUser(userId));
});

userRoutes.route("/").post((req, res) => {
  const { name } : { name: string } = req.body;
  res.status(200).json(UserController.addUser(name));
});
