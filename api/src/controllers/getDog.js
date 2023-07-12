const axios = require('axios');
const {Op} = require('sequelize')
const { Dog, Temperament } = require('../db');
require('dotenv').config();
const { URL, API_KEY } = process.env;

const getDog = async () => {
    const todosPerros = await axios.get(`${URL}?api_key=${API_KEY}`)
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

const getName = async (name) => {
  const getApiName = await axios.get(`${URL}?api_key=${API_KEY}&name=${name}`);
  let dogName = getApiName.data.map (dog => {
    return {
      id: dog.id,
      name: dog.name,
    }
  });

  const nombresDB = await Dog.findAll({
    where: {
      name: {
        [Op.iLike]: `%${neme}%`
      }
    },
    include: Temperament
  });

  const namesDB = nombresDB.map (dog => {
    return {
      id: dog.id,
      name: dog.name,
    }
  });

  const allNames = [...namesDB, ...dogName]

  if (!allNames.length) {
    throw Error ('Nombre de raza no encontrado')
  } else {
    return allNames;
  }
};


module.exports = { getDog, getName };