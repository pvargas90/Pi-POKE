const { Pokemon } = require("../db.js");
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

getPokemonById = async (id, source) => {
  const pokemon =
    source === "api"
      ? (await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)).data
      : await Pokemon.findByPk(id);

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
        vida: res.data.stats.find(e => e.stat.name === 'hp').base_stat,
        velocidad: res.data.stats.find(e => e.stat.name === 'speed').base_stat,
        ataque: res.data.stats.find(e => e.stat.name === 'attack').base_stat,
        defensa: res.data.stats.find(e => e.stat.name === 'defense').base_stat,
        tipo: res.data.types.map(e=> e.type.name).join(", "),
        peso: res.data.weight,
        altura: res.data.height,
        imagen: res.data.sprites.front_default
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
