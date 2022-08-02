import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetail } from "../../actions";
import './Detail.css'


export default function Detail (props){
    const dispatch= useDispatch()
    useEffect(()=>{
        dispatch(getDetail(props.match.params.id))
    },[dispatch])
    
    const pokemon = useSelector((state)=> state.pokemonDetail)
    const error = useSelector((state)=>state.error)
    
    return(
        <div> {error.type ==='detail'?<p>No se encuentra el pokemon</p>:<></>}
            {
                
                pokemon.length>0 ?
                <div className="Conteiner-detail">
                   
                    <h1>{pokemon[0].name}</h1>
                    <div className="CardDetails">
                    <img src={pokemon[0].img} alt="Pokemon" />
                    <div className="VAV">
                    <p>Vida:{pokemon[0].hp}</p>
                    <p>Ataque:{pokemon[0].attack}</p>
                    <p>Velocidad:{pokemon[0].speed}</p>                   
                    <p>Altura:{pokemon[0].height}</p>
                    <p>Peso:{pokemon[0].weight}</p>
                    <p>Tipos:{pokemon[0].types.map(e=>{
                        return(
                            <p key={e} className={e}>{e}</p>
                        )
                    })}</p>
                    </div>
                    </div>
                </div>
                : <><img className='LoadingDetail' src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/029b8bd9-cb5a-41e4-9c7e-ee516face9bb/dayo3ow-7ac86c31-8b2b-4810-89f2-e6134caf1f2d.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzAyOWI4YmQ5LWNiNWEtNDFlNC05YzdlLWVlNTE2ZmFjZTliYlwvZGF5bzNvdy03YWM4NmMzMS04YjJiLTQ4MTAtODlmMi1lNjEzNGNhZjFmMmQuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.ooubhxjHp9PIMhVxvCFHziI6pxDAS8glXPWenUeomWs" alt="loading..." />
                </>
            }
            <Link to='/home' ><button className="goBack">Volver</button></Link>
        </div>
    )
    
    
}