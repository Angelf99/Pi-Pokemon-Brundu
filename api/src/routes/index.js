const { Router } = require('express');
const axios =require('axios');
const {Pokemon,Type}= require('../db')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApidata = async ()=> {
    const pokeUrl = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=40"');
    const response = await pokeUrl.data.results.map(async (e)=>{
        const pokeInfo = await axios.get(e.url);
        return{
            id: pokeInfo.data.id,
            name:pokeInfo.data.name,
            types:pokeInfo.data.types.map(e=> {return e.type.name}),
            hp: pokeInfo.data.stats[0].base_stat,
            attack: pokeInfo.data.stats[1].base_stat,
            defense: pokeInfo.data.stats[2].base_stat,
            speed: pokeInfo.data.stats[5].base_stat,
            height: pokeInfo.data.height,
            weight: pokeInfo.data.weight,
            img:pokeInfo.data.sprites.other.dream_world.front_default

        };
    });
    const promesa = await Promise.all(response);
    // console.log(promesa);
    return promesa;
};

const getDbData = async () => {
    let dbPokemon = await Pokemon.findAll({
      include: {
        model: Type,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    return dbPokemon.map((e) => {
      return {
        id: e.id,
        name: e.name,
        hp: e.hp,
        attack: e.attack,
        defense: e.defense,
        speed: e.speed,
        height:e.height,
        weight:e.weight,
        types: e.types.map((e) => e.name),
        img: e.img,
        createAtDB: e.createAtDB,
      };
    });
  };
  
  
  const getAllData = async () => {
    const apiInfo = await getApidata();
    const dbInfo = await getDbData();
    const totalInfo = apiInfo.concat(dbInfo);
    // console.log(totalInfo)
    return totalInfo
  };
  
router.get('/pokemons',async (req,res)=>{
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
router.get('/pokemons/:id',async (req,res)=>{
  const id = req.params.id
  const pokemons= await getAllData()
  if(id){
    let pokemon = pokemons.filter(e=> e.id == id)
    pokemon.length?
    res.status(200).send(pokemon):
    res.status(404).send('No existe pokemon con ese id')
  }
})
// router.post('/body',(req,res)=>{
//   console.log(req.body)
// })
router.post('/pokemons',async (req,res)=>{
 
  let {name,hp,attack,defence,speed,height,weight,img,createAtDB,types} = req.body

  let pokeCreated = await Pokemon.create ({
    name,hp,attack,defence,speed,height,weight,img,createAtDB
  })
  // let pokeType = await Type.findAll({
  //   where:{name: types}
  // })
  types.forEach(async (e) => {
    let pokeType = await Type.findAll({
      where: { name : e }
    });

    // console.log(dietDb);0
    // await recipeCreated.addDiet(dietDb);
    await pokeCreated.addType(pokeType)   
  });
  res.send('Pokemon creado')
})
// {
//   "name":"Otro",
//   "hp":1,
//   "attack":2,
//   "defence":3,
//   "speed":4,
//   "height":5,
//   "weight":6,
//   "img":"Imagen",
//   "type":"grass"
// }

router.get('/types',async (req,res)=>{
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
