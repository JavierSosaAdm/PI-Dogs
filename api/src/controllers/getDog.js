const axios = require('axios');
const {op} = require('sequelize')
const { Dog, Temperament } = require('../db');
const { URL, API_KEY } = process.env;

const getDog = async () => {
    let todosPerros = await axios.get(`${URL}?api_key=${API_KEY}`)
    let infoAPI = todosPerros.data.map((dog) => {
      if (dog) {
        return {
          id: dog.id,
          image: dog.image.url,
          name: dog.name,
          teperament: dog.temperament,
          weight: dog.weight.metric,
          life: dog.life.metric,
          height: dog.height.metric,
        }
      }
    });

    const info = await Dog.findAll({ include: Temperament });
    const infoDB = info.map(dog => {
      return {
        id: dog.uuid,
        image: dog.image,
        name: dog.name,
        temperament: dog.temperament.map(temp => {
          return temp.name
        }).toString(),
        weight: dog.weight,
        life: dog.life,
        height: dog.height,
      }
    }); 

    const result = [ ...infoAPI, ...infoDB ];
    // console.log(infoDB);
    return result;
}



module.exports = { getDog }