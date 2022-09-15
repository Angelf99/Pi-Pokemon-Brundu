import React from 'react'
import {fPokemonByType} from '../../actions'
import {useDispatch} from 'react-redux'
import '../Home/Home.css'

export default function TypeFilter (){
    const dispatch=useDispatch()
    function handleFilterType(e){
        dispatch(fPokemonByType(e.target.value))
    }
    return(
        <>
           <select className='pointer' onChange={e =>handleFilterType(e)}>
                        <option value="All">Ordenar por tipo</option>
                        <option value="fighting">Fighting</option>
                        <option value="water">Water</option>
                        <option value="ice">Ice</option>
                        <option value="normal">Normal</option>
                        <option value="poison">Poison</option>
                        <option value="bug">Bug</option>
                        <option value="fire">Fire</option>
                        <option value="grass">Grass</option>
                        <option value="dragon">Dragon</option>
                        <option value="flying">Flying</option>
                        <option value="ghost">Ghost</option>
                        <option value="electric">Electric</option>
                        <option value="ground">Ground</option>
                        <option value="steel">Steel</option>
                        <option value="psychic">Psychic</option>
                        <option value="dark">Dark</option>
                        <option value="rock">Rock</option>
                    </select>
        </>
    )
}