let { Type } = require('../db');
const axios = require('axios');

const getTypes = async () => {
	try {
		const response = await axios.get('https://pokeapi.co/api/v2/type');
		const types = response.data.results.map(type => type.name);
		return types;
	  } catch (error) {
		throw new Error('Error al obtener tipos de Pokemon desde la API.');
	  }

}

module.exports = { getTypes };