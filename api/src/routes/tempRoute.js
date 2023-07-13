const { Router } = require('express');
// const { Dog, Temperament } = require('../db')
const { getTemps } = require('../controllers/index')

const tempRoute = Router();

tempRoute.get('/temperament', async (req, res) => {
    try {
        const temps = await getTemps();
        res.status(200).json(temps)
    } catch (error) {
        res.status(500).json(error.message)
    }
});

module.exports = tempRoute;