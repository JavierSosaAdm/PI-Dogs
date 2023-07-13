const axios = require('axios');
const {op} = require('sequelize')
const { Dog, Temperament } = require('../db');
require('dotenv').config();
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
    const cleanAllTemps = new Set(allTemps.map(temp => temp.name));
    const onlyNames = Array.from(cleanAllTemps);
    const result = onlyNames.map(name => ({ name }));

    const temps = await Temperament.bulkCreate(result);
    return temps;

}

module.exports = { getTemp };

// const tempsDB = await Temperament.findAll();
//     if(tempsDB.length) return tempsDB;
    
//     let allTemps = [];
    
//     const allApi = await axios.get(`${URL}?api_key=${API_KEY}`);
//     allApi.data.map(dog=>{
//         if(dog.temperament){
//             let temps = dog.temperament.split(", ");
//             for(let i = 1; i < temps.length; i++){
//                 allTemps.push({name: temps[i]});
//             }
//         }
//     })
    
//     const cleanAllTemps = new Set(allTemps.map(temp => temp.name));
//     const onlyNames = Array.from(cleanAllTemps);
//     const result = onlyNames.map(name => ({ name }));
    
//     const temps = await Temperament.bulkCreate(result);
//     return temps;
         