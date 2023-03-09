const { Router } = require("express");

const pokemonsRouter = Router();

const {
  getPokemonsHandler,
  getPokemonByIdHandler,
  createPokemonHandler,
} = require("../handlers/pokemonsHandlers");

pokemonsRouter.get("/", getPokemonsHandler);

pokemonsRouter.get("/:id", getPokemonByIdHandler);

pokemonsRouter.post("/", createPokemonHandler);

module.exports = pokemonsRouter;
