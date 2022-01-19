import * as express from "express";
import * as AccountController from "../controllers/accountController";
import { Account } from "../models/Accout";

export const accountRoutes = express.Router();
accountRoutes.route("/").get((req, res) => {
    res.status(200).json(AccountController.listAccounts());
});

accountRoutes.route("/login").get((req, res) => {

})

accountRoutes.route("/signup").post((req,res) => {
    const { username, password, name }: { username: string, password: string, name: string } = req.body;
    const [account, error] = AccountController.signup(username, password, name);

    if (error) {
        res.status(403).send(error.message);
    } else {
        // req.session.loggedIn = true;
        // req.session.user = account;
        res.status(200).json(account);
    }
})