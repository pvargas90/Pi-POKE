const axios= require('axios');
const { Pokemon, Type }=require("../db")

const getPokemons = async () => {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20');
      const pokemons = response.data.results;
      const pokemonData = await Promise.all(pokemons.map(async (pokemon) => {
        const res = await axios.get(pokemon.url);
        return {
          id:res.data.id,
          nombre: res.data.name,
          vida: res.data.stats[0].base_stat,
          velocidad: res.data.stats[5].base_stat,
          ataque: res.data.stats[1].base_stat,
          defensa: res.data.stats[2].base_stat,
          tipo: res.data.types.map(e=> e.type.name).join(", "),
          peso: res.data.weight,
          altura: res.data.height,
          imagen: res.data.sprites.front_default
        };
      }));
      return pokemonData;
    } catch (error) {
      console.log(error);
    }
  }



  const getPokemonByID = async (id) => {
    try {
      const pokemonFromDB = await Pokemons.findByPk(id);
      if (pokemonFromDB) {
        // Si se encontró el Pokémon en la base de datos, devolverlo
        return pokemonFromDB.toJSON();
      } else {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const type= res.data.types.map((e)=>e.type.name)
        const pokemon = {
          id:res.data.id,
          nombre: res.data.name,
          vida: res.data.stats[0].base_stat,
          velocidad: res.data.stats[5].base_stat,
          ataque: res.data.stats[1].base_stat,
          defensa: res.data.stats[2].base_stat,
          peso: res.data.weight,
          altura: res.data.height,
          imagen: res.data.sprites.front_default,
          tipo: type
        };
        return pokemon;
      }
    } catch (error) {
      console.log(error);
    }
  
  };
  
const getDbInfo = async () => {
    return await Pokemon.findAll({
        include: {
            model: Type,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    });
};
  
 const getAllInfo = async () => {
    const apiData = await getPokemons();
    const dbInfo = await getDbInfo();
    const allInfo = apiData.concat(dbInfo);
    return allInfo;
};



module.exports = {
    getPokemons,
    getDbInfo,
    getAllInfo,
    getPokemonByID
}