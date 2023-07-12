const axios = require('axios');
const { Dog, Temperament } = require('../db');
require('dotenv').config();
const { URL, API_KEY } = process.env;

const getApiId = async (idRaza) => {
    const allApiDogs = await axios.get(`${URL}?api_key=${API_KEY}`);
    let dogApi = allApiDogs.data.find(dog => dog.id === Number(idRaza));

    if(dogApi) {
        return {
            id: idRaza,
            image: dogApi.image.url,
            name: dogApi.name,
            height: dogApi.height.metric,
            weight: dogApi.weigth.metric,
            temperament: dogApi.temperament,
            life: dogApi.life,
        };  
        } else {
            throw Error ('No se encuentra Perro con ese ID');
        }
    }

    const getDBid = async (idRaza) => {
        const dogDB = await Dog.findOne({
            where: {uuid: idRaza},
            include: Temperament,
        });

        if(dogDB) {
            console.log(dogDB);
            return {
                id: idRaza,
                image: dogDB.image.url,
                name: dogDB.name,
                height: dogDB.height.metric,
                weight: dogDB.weight.metric,
                temperament: dogDB.temperaments.map(temp => {
                    return temp.name
                }).toString(),
                life: dogDB.life,
            };
        } else {
            throw Error ('No se encuentra Perro con ese ID');
        };
    };

    module.exports = { getApiId, getDBid };
