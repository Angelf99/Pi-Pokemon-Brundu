import React from 'react';
import './Pagenav.css'
export default function Pagenav({cardsXPage,allPokemons,paginado}){
    const pageNumbers = []

    for (let i = 0; i < Math.ceil(allPokemons/cardsXPage); i++) {
        pageNumbers.push(i+1)
        
    }
    return(

        <nav>
            
                {
                    pageNumbers && pageNumbers.map(e =>(
                        
                            <a onClick={() => paginado(e)} className='Number'>{e}</a>
                        
                    ))
                }
            
        </nav>
    )
}
