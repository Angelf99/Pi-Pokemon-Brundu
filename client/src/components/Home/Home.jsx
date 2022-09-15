import React from 'react'
import {useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { getAllPokemons, fPokemonByType, fPokemonCreated , orderByAttack, orderByName} from '../../actions'
import {Link} from 'react-router-dom'
import Card from '../Card/Card'
import Pagenav from '../Pagenav/Pagenav'
import SearchBar from '../SearchBar/SearchBar'
import './Home.css'

import CreateFilter from '../Filters/createFilter'
import TypeFilter from '../Filters/typeFilter'


export default function Home(){
    const dispatch=useDispatch()
    const allPokemons = useSelector((state)=>state.pokemons)
    const error = useSelector((state)=>state.error)
    const [orden,setOrden]= useState('')
    const [actualPage,setActualPage] = useState(1)
    const [cardsXPage,setCardsPage] = useState(12)
    const iOfLastCard = actualPage * cardsXPage
    const iOfFirstCard = iOfLastCard - cardsXPage 
    const pokemonCards = allPokemons.slice(iOfFirstCard,iOfLastCard)
    console.log(pokemonCards)
    const paginado = (pageNumber)=> {
            setActualPage(pageNumber)
        }
    
    useEffect(()=>{
        dispatch(getAllPokemons())
    },[dispatch])

    function handleClick (e){
        e.preventDefault()
        dispatch(getAllPokemons())
    }
 
    function handleSortByAttack(e){
        e.preventDefault()
        dispatch(orderByAttack(e.target.value))
        setActualPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handleSortByName(e){
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setActualPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }
// console.log(pokemonCards)
    return(
        <div>
            <div className='Navbar'>
                <div className='filters'>
                    <CreateFilter/>
                    <select className='pointer' onChange={e =>handleSortByAttack(e)}>
                        <option disabled selected>Ordenar Por Ataque</option>
                        <option value="Asc">Menos Ataque</option>
                        <option value="Desc">Más Ataque</option>
                    </select>
                    <br />
                    <select className='pointer' onChange={e =>handleSortByName(e)}>
                        <option disabled selected >Ordenar Por Nombre</option>
                        <option value="A-Z">A-Z</option>
                        <option value="Z-A">Z-A</option>
                    </select>
                    <TypeFilter/>
                </div>
                <img src="https://www.pngplay.com/wp-content/uploads/2/Pokeball-PNG-Pic-Background.png" alt="pokemon" onClick={(e)=>{handleClick(e)}} className='pointer'/>
                <div className='searchBar' >
                    <SearchBar/>
                    <Link to='/create' className='create'>Crear tu pokemon</Link>
                </div>

            </div>
            <h1>PokePage</h1>
            <div className='Cards'>
                
                {
                    pokemonCards.length?
                        pokemonCards?.map(e=>{
                            return(
                                <Card name={e.name} types={e.types} img={e.img} key={e.id} id={e.id}/> 
                            )
                    }):<div><img className='Loadingimg' src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/029b8bd9-cb5a-41e4-9c7e-ee516face9bb/dayo3ow-7ac86c31-8b2b-4810-89f2-e6134caf1f2d.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzAyOWI4YmQ5LWNiNWEtNDFlNC05YzdlLWVlNTE2ZmFjZTliYlwvZGF5bzNvdy03YWM4NmMzMS04YjJiLTQ4MTAtODlmMi1lNjEzNGNhZjFmMmQuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.ooubhxjHp9PIMhVxvCFHziI6pxDAS8glXPWenUeomWs" alt="loading..." />{error.length===0?<></>:<div><p>No se encuentran pokemons</p>
                    <p>{error.message}</p>
                    <p>{error.name}</p></div>}</div>
                    
                }
            </div>
            <div className='Pages'>
                    <Pagenav cardsXPage={cardsXPage}
                    allPokemons={allPokemons.length}
                    paginado={paginado} />
            </div>            
        </div>
    )

}