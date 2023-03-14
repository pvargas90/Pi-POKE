const { Router } = require('express');
const axios =require ('axios')
const router = Router();
const { Pokemon }=require("../db")
const { getAllInfo, getPokemonByID} = require('../controllers/pokemonsController');

//All Pokemons
router.get('/', async (req, res) => {
  try {
    const name = req.query.name;
    const created = req.query.created;

    let pokeTotal = await getAllInfo();
    if (created === 'true') {
      pokeTotal = await Pokemon.findAll();
    } else if (created === 'false') {
      pokeTotal = pokeTotal.filter(pokemon => pokemon.pokemonId);
    }

    if (name) {
      let pokeNames = await pokeTotal.filter((e) =>
        e.name.toLowerCase().includes(name.toLowerCase())
      );
      pokeNames.length
        ? res.status(200).send(pokeNames)
        : res.status(404).send('No se encuentra');
    } else {
      res.status(200).send(pokeTotal);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
})

  //Buscar Pokemons por id
  router.get('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const pokemon = await getPokemonByID(id);
      if(!pokemon){
        return res.status(404).send('Pokemon not found');
      }
      res.status(200).send(pokemon)
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ocurrió un error al buscar el Pokémon' });
    }
  });

  //buscar Pokemons por nombre
  router.get('/:name=', async (req, res) => {
    try {
      const name = req.params.name;
      const pokeName = await getAllInfo();
      //Uso /^[a-zA-Z]+$/ para verificar si la cadena de texto tiene solo caracteres alfabeticos 
      if (!/^[a-zA-Z]+$/.test(name)) {
        return res.status(400).send('El nombre del pokemon solo puede contener letras');
      }
      //si "name" no es nulo, filtra la lista de pokemons por el objeto "name"
      if (name) {
        let pokeNames = await pokeName.filter((e) =>
          e.name.toLowerCase().includes(name.toLowerCase())
        );
        
        // Si no se encontraron pokemons, devuelve un error
        if (pokeNames.length === 0) {
          return res.status(404).send('Pokemon not found');
        }
        
        res.status(200).send(pokeNames);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    }
  });


  //crear pokemon
  router.post('/', async (req,res)=>{
    const { id, nombre, vida, fuerza, defensa, velocidad, altura, peso, tipo } = req.body;
  try {
    const existingPokemon = await Pokemon.findOne({ where: { nombre } });
    if (existingPokemon) {
      return res.status(409).send('El Pokemon ya existe');
    }
    const pokemon= await Pokemon.create({
      id, nombre, vida, fuerza, defensa, velocidad, altura, peso, tipo
    })
    res.status(200).send(pokemon)
  } catch (error) {
    console.error(error.message)
    return res.status(404).send("Error en alguno de los datos enviados")
  }
  })
  


  

  module.exports = router;