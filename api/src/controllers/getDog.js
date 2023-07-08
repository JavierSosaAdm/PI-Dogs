const axios = require('axios');
const {op} = require('sequelize')
const { Dog, Temperament } = require('../db');
const { URL, API_KEY } = process.env;

const getDog = async () => {
    let todosPerros = await axios.get(`${URL}?api_key=${API_KEY}`)
    let infoDog = todosPerros.data.map((dog) => {
      if (dog) {
        return {
          id: dog.id,
          image: dog.image.url,
          name: dog.name,
          teperament: dog.temperament,
          weight: dog.weight.metric
        }
      }
    });

    
}