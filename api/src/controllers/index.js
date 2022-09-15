const axios = require("axios");
const {Pokemon,Type} = require("../db");

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

  module.exports={getApidata,getDbData,getAllData}