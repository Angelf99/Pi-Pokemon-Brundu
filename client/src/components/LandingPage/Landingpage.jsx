import React from 'react'
import {Link} from 'react-router-dom'
import './LandingPage.css'
import pikachu from '../Utils/pika.gif'

export default function LandingPage (){
    return(
        <div>
            <h1 className='h1-Landing'>Bienvenido Entrenador</h1>
            <Link to='/home'>
                <img className='Pikalanding' src={pikachu} alt="Pikachu say hi" /> 
                <br />               
                <button className='b-Landing'>Ingresar</button>
            </Link>
        </div>
    )
}