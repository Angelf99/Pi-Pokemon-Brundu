import React from 'react'
import {Link} from 'react-router-dom'
import './LandingPage.css'

export default function LandingPage (){
    return(
        <div>
            <h1 className='h1-Landing'>Bienvenido Entrenador</h1>
            <Link to='/home'>
                <button className='b-Landing'>Ingresar</button>
            </Link>
        </div>
    )
}