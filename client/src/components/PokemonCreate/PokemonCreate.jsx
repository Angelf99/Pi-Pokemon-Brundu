import React,{useState,useEffect} from "react";
import {Link,useHistory} from 'react-router-dom';
import { useDispatch , useSelector } from "react-redux";
import {getTypes,postPokemon} from '../../actions'
import './PokemonCreate.css'



export default function PokemonCreate(){
    const dispatch = useDispatch()
    const types = useSelector((state)=> state.types)
    const [input,setInput]= useState({
        name:'',
        hp:'',
        attack:'',
        defence:'',
        speed:'',
        height:'',
        weight:'',
        img:'',
        types:[]
    })
    const history = useHistory()

    function handleSubmit(e){
        e.preventDefault()
        dispatch(postPokemon(input))
        alert('Pokemon creado con exito')
        setInput({
            name:'',
            hp:'',
            attack:'',
            defence:'',
            speed:'',
            height:'',
            weight:'',
            img:'',
            types:[]
        })
        history.push('/home')
    }

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
        console.log(input)
    }
        function handleCheck(e){
           if(e.target.checked){
               setInput({
               ...input,
               types:[...input.types,e.target.value]
              })
            }
            console.log(input.types)
            if(!e.target.checked){
                setInput({
                    ...input,
                    types: input.types.filter( t => t !== e.target.value)
                   })
            }
        }
    useEffect(()=>{
        dispatch(getTypes())
    },[])
    
    return(
        <div>
            <h1 className="h1Create">Crea tu Pokemon</h1>
            <form onSubmit={e=>handleSubmit(e)}>
                <div>
                    <label>Nombre:</label>
                    <input type="text"
                    value={input.name}
                    name='name' onChange={handleChange}
                    />
                    
                </div>
                <div>
                    <label >HP:</label>
                        <input type="number"
                        value={input.hp}
                        name='hp' 
                        onChange={handleChange}/>
                        
                </div>
                <div>
                    <label >Attack:</label>
                        <input type="number"
                        value={input.attack}
                        name='attack' 
                        onChange={handleChange}/>
                        
                </div>
                <div>  
                    <label >Defence:</label>
                    <input type="number"
                    value={input.defence}
                    name='defence' 
                    onChange={handleChange}/>
                    
                </div>
                <div>
                    <label>Speed:</label>
                    <input type="number"
                    value={input.speed}
                    name='speed' 
                    onChange={handleChange}/>
                    
                </div>
                <div>
                    <label>Height:</label>
                    <input type="number"
                    value={input.height}
                    name='height'
                    onChange={handleChange} />
                    
                </div>
                <div>
                    <label>Weight:</label>
                    <input type="number"
                    value={input.weight}
                    name='weight'
                    onChange={handleChange} />
                    
                </div>
                <div>
                    <label>Img:</label>
                    <input type="text"
                    value={input.img}
                    name='img' 
                    onChange={handleChange}/>
                    
                </div>
                <div>
                    <label>Types:</label>
                        {types.map((e)=>{return(
                            <div><label><input type="checkbox" value={e.name} name={e.name} onChange={e=>{handleCheck(e)}}/>{e.name.slice(0, 1).toUpperCase() + e.name.slice(1, e.name.length)}</label>
                            </div>
                        )})}

                </div>
                <button type="submit">Crear Pokemon</button>
            </form>
            <Link to='/home' className="goBack">Volver al home</Link>
        </div>
    )
    // <option value="steel">Steel</option>
    // <option value="psychic">Psychic</option>
    // <option value="dark">Dark</option>
    // <option value="rock"
    
}



