const { Router } = require('express');
const {Pokemon,Type}= require('../db')
const router = Router();


router.post('/',async (req,res)=>{
 
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
      await pokeCreated.addType(pokeType)   
    });
    res.send('Pokemon creado')
  })
  
  module.exports = router;