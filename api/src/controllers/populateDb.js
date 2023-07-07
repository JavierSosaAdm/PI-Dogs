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
    
    const tempDog = response.data.results.map(temp => {
        return {
            name: temp.temperament
        };
    })
    await Temperament.bulkCreate(tempDog);

} catch (error) {
    console.error("Error llenando base de datos con datos de Temperamento", error.message)
}
};

module.exports = populateDb;
