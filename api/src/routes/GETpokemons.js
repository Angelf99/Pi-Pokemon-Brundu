const { Router } = require('express');
const {getAllData}= require('../controllers/index.js')
const router = Router();

router.get('/',async (req,res)=>{
    const name = req.query.name
    // console.log(name)
    let pokemons= await getAllData()
    if(name){
        let pokemonName = pokemons.filter((e)=> e.name.toLowerCase()===name.toLowerCase());//RETURN IMPLICITO con === en vez de includes me busca solo lo que se igual bulbasor no me va a dar bulbasor pro por ej
        // console.log(pokemonName)
        pokemonName.length?
        res.status(200).send(pokemonName):
        res.status(404).send('El pokemon no se encuentra disponible');
    }
    else{
    res.status(200).send(pokemons);
    }
});
router.get('/:id',async (req,res)=>{
    const id = req.params.id
    const pokemons= await getAllData()
    console.log(id)
    if(id){
      let pokemon = pokemons.filter(e=> e.id == id)
      pokemon.length?
      res.status(200).send(pokemon):
      res.status(404).send('No existe pokemon con ese id')
    }
  })
// router.get('/:id', (req,res)=>{
//   const id = req.params.id
//   getAllData().then((resp)=>{if(resp.length){
//     let pokemon = resp.filter(e=> e.id == id)
//     pokemon.length?
//     res.status(200).send(pokemon):
//     res.status(404).send('No existe pokemon con ese id')
//   }})
  
// })
  module.exports = router;