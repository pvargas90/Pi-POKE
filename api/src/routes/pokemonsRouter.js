const { Router } = require("express");

const pokemonsRouter = Router();

const {
  createPokemon,
  getPokemonById,
  getAllPokemons,
  getPokemonByName
} = require("../controllers/pokemonsController");


pokemonsRouter.get("/", getAllPokemons);

pokemonsRouter.get("/:id", getPokemonById);

pokemonsRouter.post("/", createPokemon);

pokemonsRouter.get("/?:name", getPokemonByName);

module.exports = pokemonsRouter;
