import * as express from "express";
import { Account, GetAccountProperties } from "../models/Account";
import RoundController from "../controllers/roundController";

export const roundRoutes = express.Router();
roundRoutes.route("/").get((req, res) => {
  res.status(200).json(RoundController.listRounds());
});

roundRoutes.route("/:id").get((req, res) => {
  const roundId: number = parseFloat(req.params.id);
  res.status(200).json(RoundController.findRound(roundId));
});

roundRoutes.route("/").post((req, res) => {
  const { matchId }: { matchId: number } = req.body;
  res.status(200).json(RoundController.createRound(matchId));
});

roundRoutes.route("/:id/pokemon").post((req, res) => {
  const roundId: number = parseFloat(req.params.id);
  const { userId }: Account = GetAccountProperties(res);
  const { pokemonId }: { pokemonId: number } = req.body;
  if (!pokemonId || pokemonId.toString().trim() === "") {
    res.status(400).send(`Le paramètre "pokemonId" ne peut être vide !`);
    return;
  }
  res
    .status(200)
    .json(RoundController.addPokemonToRound(roundId, userId, pokemonId));
});
