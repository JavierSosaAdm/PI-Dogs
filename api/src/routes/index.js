const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogRoute = require('./dogRoute');
const tempRoute = require('./tempRoute');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogRoute', dogRoute);
router.use('/tempRoute', tempRoute);

module.exports = router;
