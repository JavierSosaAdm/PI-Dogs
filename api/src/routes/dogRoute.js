const { Router } = require('express');
const { Dog, Temperament } = require('../db')

const router = Router();

router.get('/', async (req, res) => {
try {
    const name = req.query.name;
    let allRazas = await Dog.findAll();

    if (name) {
        let razaName = await allRazas.filter (raza => raza.name.toLowerCase().includes(name.toLowerCase()))
        razaName.length?
        res.status(200).send(razaName):
        res.status(404).send({message: 'Not Found'})
    } else {
        res.status(200).send(allRazas)
    }
} catch (error) {
    console.error("Error llenando base de datos con Dogs", error.message)
}
})