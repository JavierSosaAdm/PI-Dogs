const axios = require('axios');
require('dotenv').config();
const {URL, API_KEY} = process.env;

const populateDb = async (Dog, Temperament) => {
try {
    const response = await axios.get(`${URL}/`)
} catch (error) {
    
}
};

module.exports = populateDb;