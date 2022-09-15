const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const post = require('./POST')
const getTypes= require('./GETtypes')
const getPokemons = require('./GETpokemons')
const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/pokemons", getPokemons);
router.use("/pokemons", post);
router.use("/types", getTypes);


module.exports = router;
