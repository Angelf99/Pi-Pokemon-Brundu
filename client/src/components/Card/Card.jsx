import React from 'react'
import { Link } from 'react-router-dom'
import './Card.css'
import './Types.css'


export default function Card({name, img, types, id}){
    console.log(types)
    return(
        
        <div className='Card'> 
            
            <div className="Datacard">
            
            <img src={img} alt="pokemounstro" className='img'/>
            
             <div className='Types'>   
            <Link to={`/home/${id}`} className='poke-name'>{name}</Link>
            {types?.map(e=>{
                    {return (<p className={e}>{e}</p>)}
            })}
            </div>
            </div>
        </div>
    )

}

