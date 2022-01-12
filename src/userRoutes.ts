import * as express from "express";
import * as UserController from "./userController";
import { User } from "./model";

export const userRoutes = express.Router();
userRoutes.route("/").get((req, res) => {
  res.status(200).json(UserController.listUsers());
});

userRoutes.route("/:id").get((req, res) => {
  const userId: number = parseFloat(req.params.id);
  res.status(200).json(UserController.findUser(userId));
});

userRoutes.route("/:id").post((req, res) => {
  const newUser: User = req.body;
  res.status(200).json(UserController.addUser(newUser));
});
