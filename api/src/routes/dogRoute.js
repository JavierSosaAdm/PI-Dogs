
const { Router } = require('express');
// const { getName, getDog } = require('../controllers/getDog');
// const { create } = require('../controllers/createDog');
// const { getDBid, getApiId } = require('../controllers/getID');
const {getDogs,
    getIdApi,
    getIdBD,
    getDogsName,
    postDog,} = require('../controllers/index')

const dogRoute = Router();

dogRoute.get('/', async (req, res) => {
const { name } = req.query;
if (name) {
    try {
        const dogName = await getDogsName(name);
        res.status(200).json(dogName);
    } catch (error) {
        res.status(500).send(error.message)
    }
} else {
    try {
        const allDog = await getDogs();
        res.status(200).json(allDog);
    } catch (error) {
        res.status(500).send(error.message);
    }
}
});

dogRoute.get('/:idRaza', async (req, res) => {
    const { idRaza } = req.params;
    if (isNaN(idRaza)) {
        try {
            const detail = await getIdBD(idRaza);
            res.status(200).json(detail);
        } catch (error) {
            res.status(500).send(error.message);
        }
    } else {
        try {
            const detail = await getIdApi(idRaza);
            res.status(200).json(detail);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
});

dogRoute.post('/', async (req, res) => {
    // console.log(req.body.dog);
    const { name, height, weight, lifespan, temperaments } = req.body;
    try {
        if (!name || !image || !height || !weight || !life || !temperament.length) throw Error('No hay suficiente información');
        else {
            const createDog = await postDog (name, height, weight, lifespan, temperaments);
            res.status(200).json(`Tu perro: ${name} fue creado correctamente`)
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = dogRoute;
