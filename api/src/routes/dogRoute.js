
const { Router } = require('express');
const { getName } = require('../controllers/getDog');

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
}
})

module.exports = dogRoute;
// router.get()