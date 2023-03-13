import axios from 'axios';

const GET_POKEMONS = 'GET_POKEMONS';
const GET_POKEMON = 'GET_POKEMON';

const getPokemons = () => {
    return async function(dispatch) {
        const apiData = await axios.get('http://localhost:3001/pokemons');
        const pokemons = apiData.data;
        dispatch({ type: GET_POKEMONS, payload: pokemons })
    };
};

/* export const getPokemon = (id) => {
    return async function(dispatch) {
        const apiData = await axios.get(`http://localhost:3001/pokemons/${id}`);
        const pokemon = apiData.data;
        dispatch({ type: GET_POKEMON, payload: pokemon })
    };
}; */

export { GET_POKEMONS, GET_POKEMON, getPokemons };
