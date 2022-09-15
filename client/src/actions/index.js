import axios from 'axios';
import { ERROR, FILTER_BY_TYPE, FILTER_CREATED, GET_DETAIL, GET_POKEMON_BY_NAME, GET_TYPES, ORDER_BY_ATTACK, ORDER_BY_NAME } from './types';

export function getAllPokemons(){
    return async function(dispatch){
        try{
            var json = await axios.get('/pokemons',{});
            return dispatch({
                type:'GET_POKEMONS',
                payload: json.data
            });
        }catch(err){return dispatch({
            type:ERROR,
            payload:{
                name:err.name,
                message:err.message
            }
        })
        }
    }   
}
export function getPokemonByName(name){
    return async function (dispatch){
        try{
            var json = await axios.get (`/pokemons?name=${name}`)
            return dispatch({
                type:GET_POKEMON_BY_NAME,
                payload: json.data
            })
        }
        catch(err){return dispatch({
            type:ERROR,
            payload:{
                type:'Unknown',
                name:err.name,
                message:err.message
            }
        })
    }
    }
}
export function getTypes(){
    return async function(dispatch){
        try{
            var json = await axios.get('/types')
            return dispatch({
                type:GET_TYPES,
                payload:json.data
            })
        }
        catch(err){
            return dispatch({
                type:ERROR,
                payload:{
                    type:'types',
                    name:err.name,
                    message:err.message
                }
            })
        }
    }
}
export function postPokemon(payload){
    return async function(dispatch){
        try{
            var json =await axios.post('/pokemons',payload)
            return json
        }
        catch(err){return dispatch({
            type:ERROR,
            payload:{
                type:'post',
                name:err.name,
                message:err.message
            }
        })
    }
    }
}

export function getDetail(id){
    return async function(dispatch){
        try{
            var json = await axios.get(`/${id}`)
            return dispatch({
                type:GET_DETAIL,
                payload:json.data
            })
        }
        catch(err){return dispatch({
            type:ERROR,
            payload:{
                type:'detail',
                name:err.name,
                message:err.message
            }
        })
    }
    }
}

export function fPokemonByType(payload){
    return{
        type:FILTER_BY_TYPE,
        payload
    }
}
export function fPokemonCreated(payload){
    return{
        type:FILTER_CREATED,
        payload
    }
}
export function orderByAttack(payload){
    return{
        type:ORDER_BY_ATTACK,
        payload
    }
}
export function orderByName(payload){
    return{
        type: ORDER_BY_NAME,
        payload
    }
}
