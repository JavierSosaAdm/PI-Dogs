const axios = require('axios');
require('dotenv').config();
const {URL, API_KEY} = process.env;

const populateDb = async (Dog, Temperament) => {
try {
    const response = await axios.get(`${URL}?api_key=${API_KEY}`);

    const razaDog = response.data.results.map(raza => {
        return {
            name: raza.name
        };
    })
    

    await Dog.bulkCreate(razaDog);


} catch (error) {
    console.error("Error llenando base de datos con nombres de Razas", error.message)
}

try {
    const response = await axios.get(`${URL}?api_key=${API_KEY}`);
    
    const promesas = [];

    for (const razaDog of response.data.results) {
        const resDog = axios.get(razaDog.url);
        promesas.push(resDog);
    }

    const results = await Promise.all(promesas);
    for (const result of results) {
        const parseDog = 0;
    }

} catch (error) {
    console.error("Error llenando base de datos con datos de Temperamento", error.message)
}
};

module.exports = populateDb;
