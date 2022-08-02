import React from "react";
import { useState } from "react";
import {useEffect}from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getPokemonByName} from '../../actions'
  
 export default function SearchBar (){
    const dispatch=useDispatch()
    const error = useSelector((state)=>state.error)
    const [name,setName]= useState('')
    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
    }
    function handleSubmit(e){
        e.preventDefault()
        dispatch(getPokemonByName(name))
        setName('')
        error.type='' 
    }
  
    
    return(
        <div>
            {error.type==='Unknown'?<p className="culia">No existe dicho pokemon</p>:<></>}
            <input type="text"
            placeholder="Pokename..."
            onChange={(e)=>handleInputChange(e)}
            className='pointer'
            value={name}
            />
            <button type="submit" onClick={(e)=>handleSubmit(e)} className='pointer'>Buscar</button>
            
        </div>
    )
 }