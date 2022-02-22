import { SqliteError } from "better-sqlite3";
import * as express from "express";
import UserController from "../controllers/userController";
import { Account, GetAccountProperties } from "../models/Account";
export const userRoutes = express.Router();

userRoutes.route("/").get((req, res) => {
  res.status(200).json(UserController.listUsers());
});

userRoutes.route("/:id").get((req, res) => {
  const userId: number = parseFloat(req.params.id);
  res.status(200).json(UserController.findUser(userId));
});

userRoutes.route("/").post((req, res) => {
  const { name }: { name: string } = req.body;
  try {
    res.status(200).json(UserController.addUser(name));
  } catch (error) {
    if (error instanceof SqliteError) {
      res.status(403).json(error);
    } else {
      res.status(500).json(error);
    }
  }
});

userRoutes.route("/:id").delete((req, res) => {
  const userId: number = parseFloat(req.params.id);
  const { userId: currentUserId }: Account = GetAccountProperties(res);
  if (userId === currentUserId) {
    res.status(200).json(UserController.deleteUser(userId));
  } else {
    res
      .status(403)
      .json(
        new Error("Impossible de supprimer un autre utilisateur que soit!")
      );
  }
});
