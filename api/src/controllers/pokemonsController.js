const { Pokemon } = require("../db");
const axios = require("axios");

const createPokemon = async (
  id,
  nombre,
  imagen,
  vida,
  ataque,
  defensa,
  velocidad,
  altura,
  peso
) =>
  await Pokemon.create({
    id,
    nombre,
    imagen,
    vida,
    ataque,
    defensa,
    velocidad,
    altura,
    peso,
  });

getPokemonById = async (id) => {
  const pokemonDB = await Pokemon.findByPk(id);
  if (pokemonDB) {
    return pokemonDB;
  } else {
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const pokemon = { }

  return pokemon;
};



const getAllPokemons  = async () => {
  try {
    const dataBasePokemons = await Pokemon.findAll();
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=60");
    const pokemons = response.data.results;
    const pokemonApi = await Promise.all(pokemons.map(async (pokemon) => {
      const res = await axios.get(pokemon.url);
      return {
        id:res.data.id,
        nombre: res.data.name,
        vida: res.data.stats[0].base_stat,
        velocidad: res.data.stats[5].base_stat,
        ataque: res.data.stats[1].base_stat,
        defensa: res.data.stats[2].base_stat,
        peso: res.data.weight,
        altura: res.data.height,
        imagen: res.data.sprites.front_default,
        tipo: res.data.types.map(e=> e.type.name).join(", ")
      };
    }));
    return [...pokemonApi,...dataBasePokemons];
  } catch (error) {
    console.log(error);
  }
}

const getPokemonByName = async (source, name) => {
  const pokemon =
  source === "api"
    ? (await axios.get(`https://pokeapi.co/api/v2/pokemon/?search=${name}`)).data
    : await Pokemon.findOne({
        where: {  
          nombre: name,
          atributes: ['id', 'nombre', 'imagen', 'vida', 'ataque', 'defensa', 'velocidad', 'altura', 'peso']
        },
      })
      return pokemon;
};

  


module.exports = {
  createPokemon,
  getPokemonById,
  getAllPokemons,
  getPokemonByName,
};
