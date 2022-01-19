import * as express from "express";
import AccountController from "../controllers/accountController";

export const accountRoutes = express.Router();

accountRoutes.route("/").get((req, res) => {
  res.status(200).json(AccountController.listAccounts());
});

accountRoutes.route("/login").get((req, res) => {});

accountRoutes.route("/signup").post(async (req,res) => {
    const { username, password, name }: { username: string, password: string, name: string } = req.body;
    const [account, error] = await AccountController.signup(username, password, name);

  if (error) {
    res.status(403).send(error.message);
  } else {
    // req.session.loggedIn = true;
    // req.session.user = account;
    res.status(200).json(account);
  }
});
