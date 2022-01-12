import * as express from "express";
import * as MatchController from "./matchController";
import { Match } from "./model";

export const matchRoutes = express.Router();
matchRoutes.route("/").get((req, res) => {
  res.status(200).json(MatchController.listMatchs());
});

matchRoutes.route("/:id").get((req, res) => {
  const matchId: number = parseFloat(req.params.id);
  res.status(200).json(MatchController.findMatch(matchId));
});

matchRoutes.route("/").post((req, res) => {
  const newMatch: Match = req.body;
  res.status(200).json(MatchController.addMatch(newMatch));
});
