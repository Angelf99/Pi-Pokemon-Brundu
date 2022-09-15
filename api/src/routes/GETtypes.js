const { Router } = require('express');
const axios =require('axios');
const {Type}= require('../db')
const router = Router();

router.get('/',async (req,res)=>{
    const dataTypes = await axios.get('https://pokeapi.co/api/v2/type')
    const pokeTypes = dataTypes.data.results.map(e=>e.name)
    pokeTypes.forEach(e => {
      Type.findOrCreate({
        where:{name:e}
      })
    });
    const pokeAllTypes= await Type.findAll()
    res.send(pokeAllTypes)
  })
  module.exports = router;