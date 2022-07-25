import React from "react";
import { useState } from "react";
import {useEffect}from 'react'
import {useDispatch} from 'react-redux'
import {getPokemonByName} from '../../actions'
  
 export default function SearchBar (){
    const dispatch=useDispatch()
    const [name,setName]= useState('')
    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
    }
    function handleSubmit(e){
        e.preventDefault()
        dispatch(getPokemonByName(name))
        // setName('')
    }

    return(
        <div>
            <input type="text"
            placeholder="Pokename..."
            onChange={(e)=>handleInputChange(e)}
            className='pointer'
            />
            <button type="submit" onClick={(e)=>handleSubmit(e)} className='pointer'>Buscar</button>
        </div>
    )
 }