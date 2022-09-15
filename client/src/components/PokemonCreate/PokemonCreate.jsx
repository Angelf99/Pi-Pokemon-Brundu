import React,{useState,useEffect} from "react";
import {Link,useHistory} from 'react-router-dom';
import { useDispatch , useSelector } from "react-redux";
import {getTypes,postPokemon} from '../../actions'
import './PokemonCreate.css'



export default function PokemonCreate(){
    const dispatch = useDispatch()
    const types = useSelector((state)=> state.types)
    const error = useSelector((state)=>state.error)
    // console.log(error)
    const [err,setErr] = useState({})
    const initialForm= {
        name:'',
        hp:0,
        attack:0,
        defence:0,
        speed:0,
        height:0,
        weight:0,
        img:'',
        types:[]
    }
    const [input,setInput]= useState(initialForm)
    const history = useHistory()
    
    function validate(input){
        let errors={}
        const onlyLyS = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
        const validateUrl = /^(ftp|http|https):\/\/[^ "]+$/;
        if(!input.name.trim()){
            errors.name='El nombre es requerido'
        }else if(!onlyLyS.test(input.name.trim())){
                errors.name='Solo puede poseer letras y espacios'
            }

        if(input.hp ==='' ){
            errors.hp='Solo acepta numeros enteros'
        }else if(input.hp > 999 || input.hp < 0){
            errors.hp='Numeros del 0 al 999'
        }

        if(input.attack ==='' ){
            errors.attack='Solo acepta numeros enteros'
        }else if(input.attack > 999 || input.attack < 0){
            errors.attack='Numeros del 0 al 999'
        }

        if(input.defence ==='' ){
            errors.defence='Solo acepta numeros enteros'
        }else if(input.defence > 999 || input.defence < 0){
            errors.defence='Numeros del 0 al 999'
        }    

        if(input.speed ==='' ){
            errors.speed='Solo acepta numeros enteros'
        }else if(input.speed > 999 || input.speed < 0){
            errors.speed='Numeros del 0 al 999'
        }  

        if(input.height ==='' ){
            errors.height='Solo acepta numeros enteros'
        }else if(input.height > 999 || input.height < 0){
            errors.height='Numeros del 0 al 999'
        }  

        if(input.weight ==='' ){
            errors.weight='Solo acepta numeros enteros'
        }else if(input.weight > 999 || input.weight < 0){
            errors.weight='Numeros del 0 al 999'
        }if(input.img!==''&&!validateUrl.test(input.img.trim())){
            errors.img='Debe ser una URL'
        }if(input.types.length > 2){
            errors.types='Solo puede tener 2 tipos'
        }
        return errors
    }
// console.log(input.hp.value)
    function handleSubmit(e){
        e.preventDefault()
        if(!input.name){
            alert('Debe poseer nombre')
            return
        }
        if(Object.keys(err).length>0){
            alert('Datos invalidos')
            return
        }
        dispatch(postPokemon(input))
        alert('Pokemon creado con exito')
        setInput(initialForm)
        history.push('/home')
    }

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
        // console.log(input)
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

        function handleBlur(e){
            handleChange(e)
            setErr(validate(input))
        }

    useEffect(()=>{
        dispatch(getTypes())
    },[])

    return(
        <div className="creado">
            <h1 className="h1Create">Crea tu Pokemon</h1>
            <form onSubmit={e=>handleSubmit(e)}>
            <div className="dataCreate">    
            <div className="InputsCreate">
                
                    <label>Nombre:
                    <input type="text"
                    value={input.name.toLowerCase()}
                    name='name' onChange={handleChange} onBlur={handleBlur}
                    /></label>
                    {err.name && <p>{err.name}</p>}
                    
               
                    <label >HP:
                        <input type="number"
                        value={input.hp}
                        name='hp' 
                        onChange={handleChange}
                        onBlur={handleBlur}/></label>
                        {err.hp && <p>{err.hp}</p>}
                        
                
                    <label >Attack:
                        <input type="number"
                        value={input.attack}
                        name='attack' 
                        onChange={handleChange}
                        onBlur={handleBlur}/></label>
                        {err.attack && <p>{err.attack}</p>}
                
                    <label >Defence:
                    <input type="number"
                    value={input.defence}
                    name='defence' 
                    onChange={handleChange}
                    onBlur={handleBlur}/></label>
                    {err.defence && <p>{err.defence}</p>}
                    
                
                    <label>Speed:
                    <input type="number"
                    value={input.speed}
                    name='speed' 
                    onChange={handleChange}
                    onBlur={handleBlur}/></label>
                    {err.speed && <p>{err.speed}</p>}
                    
                
                    <label>Height:
                    <input type="number"
                    value={input.height}
                    name='height'
                    onChange={handleChange}
                    onBlur={handleBlur} /></label>
                    {err.height && <p>{err.height}</p>}
               
                    <label>Weight:
                    <input type="number"
                    value={input.weight}
                    name='weight'
                    onChange={handleChange} 
                    onBlur={handleBlur}/></label>
                    {err.weight && <p>{err.weight}</p>}
                    
              
                    <label>Img:
                    <input type="text"
                    value={input.img}
                    name='img' 
                    onChange={handleChange}
                    onBlur={handleBlur}/></label>
                    {err.img && <p>{err.img}</p>}
                    
                </div>
               
                <div className='typesCreate'>
                    <label>Types:</label>
                        <div className="typ">
                        {   error.type!=='types'?
                            types.map((e)=>{return(
                            <div><label><input type="checkbox" value={e.name} name={e.name} onChange={e=>{handleCheck(e)}} onBlur={handleBlur}/>{e.name.slice(0, 1).toUpperCase() + e.name.slice(1, e.name.length)}</label>
                            </div>
                        )}):<div><p className="Error">{error.message}</p><br /><p className="Error">{error.name}</p></div>}
                        </div>
                        {err.types && <p>{err.types}</p>}
                </div>
                </div>
                <button type="submit">Crear Pokemon</button>
                
                {error.type==='post'?<div>Ocurrio un error al posetear verificar url</div>:<></>}
            </form>
            <Link to='/home' className="goBack create">Volver al home</Link>
        </div>
    )
    // <option value="steel">Steel</option>
    // <option value="psychic">Psychic</option>
    // <option value="dark">Dark</option>
    // <option value="rock"
    
}



