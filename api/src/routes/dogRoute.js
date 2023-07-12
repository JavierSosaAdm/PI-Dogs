
const { Router } = require('express');
const { getName, getDog } = require('../controllers/getDog');
const { create } = require('../controllers/createDog');
const { getDBid, getApiId } = require('../controllers/getID');

const dogRoute = Router();

dogRoute.get('/', async (req, res) => {
const { name } = req.query;
if (name) {
    try {
        const dogName = await getName(name);
        res.status(200).json(dogName);
    } catch (error) {
        res.status(500).send(error.message)
    }
} else {
    try {
        const allDog = await getDog();
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
            const detail = await getDBid(idRaza);
            res.status(200).json(detail);
        } catch (error) {
            res.status(500).send(error.message);
        }
    } else {
        try {
            const detail = await getApiId(idRaza);
            res.status(200).json(detail);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
});

dogRoute.post('/', async (req, res) => {
    const { name, image, height, weight, life, temperament } = req.body;
    try {
        if (!name || !image || !height || !weight || !life || !temperament.length) throw Error('No hay suficiente información');
        else {
            const createDog = await create (name, image, height, weight, life, temperament);
            res.status(200).json(`Tu perro: ${name} fue creado correctamente`)
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = dogRoute;
