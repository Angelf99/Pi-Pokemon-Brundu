import React from 'react'
import '../Home/Home.css'
import {useDispatch} from 'react-redux'
import {fPokemonCreated} from '../../actions'


export default function CreateFilter (){
    const dispatch=useDispatch()
    function handleFilterCreated(e){
        dispatch(fPokemonCreated(e.target.value))
    }
    return(
        <>
           <select className='pointer' onChange={e =>handleFilterCreated(e)}>
                        <option value="All">Todos</option>
                        <option value="created">Creados</option>
                        <option value="api">De la Api</option>
            </select>
        </>
    )
}