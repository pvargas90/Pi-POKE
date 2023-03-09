const {
  createPokemon,
  getPokemonById,
  getAllPokemons,
  getPokemonByName
} = require("../controllers/pokemonsController.js");

const getPokemonsHandler = async (req, res) => {
  const { name } = req.query;

const results = name ? getPokemonByName(name) : await getAllPokemons();

  res.status(200).json(results)
};

// tengo que poder darme cuenta de que tipo de id estoy hablando
//puede que llegue aca un id que no existe
const getPokemonByIdHandler = async (req, res) => {
  const { id } = req.params;

  const source = isNaN(id) ? "bdd" : "api"; // si es un numero es de la api, si no es de la bdd

  try {
    const pokemon = await getPokemonById(id, source);
    res.status(200).json(pokemon);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createPokemonHandler = async (req, res) => {
  try {
    const {
      id,
      nombre,
      imagen,
      vida,
      ataque,
      defensa,
      velocidad,
      altura,
      peso,
    } = req.body;
    const newPokemon = await createPokemon(
      id,
      nombre,
      imagen,
      vida,
      ataque,
      defensa,
      velocidad,
      altura,
      peso
    );
    res.status(201).json(newPokemon);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getPokemonsHandler,
  getPokemonByIdHandler,
  createPokemonHandler,
};
