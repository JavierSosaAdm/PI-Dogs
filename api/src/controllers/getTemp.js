const axios = require('axios');
const {op} = require('sequelize')
const { Dog, Temperament } = require('../db');
const { URL, API_KEY } = process.env;

const getTemp = async () => {
    const tempDB = await Temperament.findAll();

    if (tempDB.length) return tempDB;

    let allTemps = [];

    const allApi = await axios.get(`${URL}?api_key=${API_KEY}`);

    allApi.data.map(dog => {
        if(dog.temperament) {
            let temps = dog.temperament.split(', ');
            for(let i = 1; i < temps.length; i++) {
                allTemps.push({name: temps[i]});
            }
        }
    })
    
}

module.exports = getTemp;