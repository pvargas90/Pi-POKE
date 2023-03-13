import axios from 'axios';

const GET_POKEMONS = 'GET_POKEMONS';

const getPokemons = () => {
    return async function() {
        const apiData = await axios.get('http://localhost:3001/pokemons');
        const pokemons = apiData.data;
        dispatchEvent({ type: GET_POKEMONS, payload: pokemons })
    }