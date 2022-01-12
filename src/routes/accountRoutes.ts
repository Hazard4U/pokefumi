import * as express from "express";
import * as AccountController from "../controllers/accountController";
import { Account } from "../models/Accout";

export const accountRoutes = express.Router();
accountRoutes.route("/auth").post((req,res) => {
    const { username, password } = req.body;
    const [conn, error] = AccountController.connection(username, password);

    if (error) {
        res.status(403).send(error.message);
    } else {
        req.session.loggedIn = true;
        req.session.user = conn;
        res.status(200).json(conn);
    }
})