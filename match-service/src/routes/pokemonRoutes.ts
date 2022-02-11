import * as express from "express";
import PokemonController from "../controllers/pokemonController";

export const pokemonRoutes = express.Router();
pokemonRoutes.route("/").get(async (req, res) => {
  res.status(200).json(await PokemonController.getAllPokemons());
});

pokemonRoutes.route("/:id").get(async (req, res) => {
  const pokemonId: number = parseFloat(req.params.id);
  res.status(200).json(await PokemonController.getPokemonById(pokemonId));
});
