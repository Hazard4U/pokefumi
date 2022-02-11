import * as express from "express";
import AccountController from "../controllers/accountController";

export const accountRoutes = express.Router();

accountRoutes.route("/").get((req, res) => {
  res.status(200).json(AccountController.listAccounts());
});

accountRoutes.route("/login").post(async (req, res) => {
    const {username, password}: {username: string, password: string} = req.body;
    const [token, error] = await AccountController.login(username, password);

    if (error) {
        res.status(403).send(error.message);
    } else {
        res.status(200).json(token);
    }
})

accountRoutes.route("/signup").post(async (req,res) => {
    const { username, password }: { username: string, password: string } = req.body;
    const [token, error] = await AccountController.signup(username, password);

    if (error) {
        res.status(403).send(error.message);
    } else {
        res.status(200).json(token);
    }
})
