import * as express from "express";
import MatchController from "../controllers/matchController";

export const matchRoutes = express.Router();
matchRoutes.route("/").get((req, res) => {
  res.status(200).json(MatchController.listMatchs());
});

matchRoutes.route("/:id").get((req, res) => {
  const matchId: number = parseFloat(req.params.id);
  res.status(200).json(MatchController.findMatch(matchId));
});

matchRoutes.route("/").post((req, res) => {
  const {userId2}: {userId2: number | null } = req.body;
  const {user_id: userId}: {user_id: number} = res.locals.user;
  res.status(200).json(MatchController.createMatch(userId, userId2));
});

matchRoutes.route("/:id/invite").post((req, res) => {
  const matchId: number = parseFloat(req.params.id);
  const {userId2}: {userId2: number} = req.body;
  res.status(200).json(MatchController.setUser2(matchId, userId2));
});


matchRoutes.route("/:id/pokemon").post((req, res) => {
  const matchId: number = parseFloat(req.params.id);
  const {user_id: userId}: {user_id: number} = res.locals.user;
  let { pokemonId }: { pokemonId: number } = req.body;
  if (!pokemonId || pokemonId.toString().trim() === "") {
    res.status(400).send(`Le paramètre "pokemonId" ne peut être vide !`);
    return;
  }
  res
    .status(200)
    .json(MatchController.addPokemonToMatch(matchId, userId, pokemonId));
});
