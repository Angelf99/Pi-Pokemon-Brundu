import axios from 'axios';

export function getAllPokemons(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/pokemons',{});
        return dispatch({
            type:'GET_POKEMONS',
            payload: json.data
        });
    }
}
export function getPokemonByName(name){
    return async function (dispatch){
        try{
            var json = await axios.get(`http://localhost:3001/pokemons?name=${name}`)
            return dispatch({
                type:'GET_POKEMON_BY_NAME',
                payload: json.data
            })
        }
        catch(err){
            console.log(err)
        }
    }
}
export function getTypes(){
    return async function(dispatch){
        try{
            var json = await axios.get('http://localhost:3001/types')
            return dispatch({
                type:'GET_TYPES',
                payload:json.data
            })
        }
        catch(err){console.log(err)}
    }
}
export function postPokemon(payload){
    return async function(dispatch){
        try{
            var json =await axios.post('http://localhost:3001/pokemons',payload)
            // return dispatch({
            //     type: 'POST_POKEMON',
            //     payload:json.data
            // })
            return json
        }
        catch(err){console.log(err)}
    }
}
export function fPokemonByType(payload){
    return{
        type:'FILTER_BY_TYPE',
        payload
    }
}
export function fPokemonCreated(payload){
    return{
        type:'FILTER_CREATED',
        payload
    }
}
export function orderByAttack(payload){
    return{
        type:'ORDER_BY_ATTACK',
        payload
    }
}
export function orderByName(payload){
    return{
        type: 'ORDER_BY_NAME',
        payload
    }
}
export function getDetail(id){
    return async function(dispatch){
        try{
            var json = await axios.get(`http://localhost:3001/pokemons/${id}`)
            return dispatch({
                type:'GET_DETAIL',
                payload:json.data
            })
        }
        catch(err){console.log(err)}
    }
}