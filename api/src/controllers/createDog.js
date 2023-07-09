const axios = require('axios');
const {op} = require('sequelize')
const { Dog, Temperament } = require('../db');


const create = async (name, image, weight, height, life) => {
    let nameMin = name.toLowerCase();
    const created = await Dog.create({
        name: nameMin,
        image: image,
        height: height,
        weight: weight,
        life: `${life} years`
    });

    const theTemps = await Temperament.findAll({
        where: {
            name: temperaments
        },
        attributes: ['id'] 
    });

    const result = await created.setTemperaments(theTemps.map((temp) => temp.id));
    console.log(result);
    if (result) return result;
    else throw new Error('Error al crear'); 
};

module.exports = create;