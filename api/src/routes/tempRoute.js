const { Router } = require('express');
// const { Dog, Temperament } = require('../db')
const { getTemp } = require('../controllers/getTemp')

const tempRoute = Router();

tempRoute.get('/temperament', async (req, res) => {
    try {
        const temps = await getTemp();
        res.status(200).json(temps)
    } catch (error) {
        res.status(500).json(error.message)
    }
});

module.exports = tempRoute;