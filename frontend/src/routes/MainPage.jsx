import React, { useState, useEffect } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { UserContext } from '../context/userContextProvider' 
//Creamos un main donde se pondrá el array de los vinilos con un formato json
const MainPage = ({viewVinil}) => {
    const navigate = useNavigate()
    //Creamos un array de tipo JSON con los datos de los vinilos
    const [vynils, setVynils] = useState([])

    const { user } = React.useContext(UserContext)

    useEffect(() => {
        const getVynils = async () => {
          const response = await fetch('http://localhost:4000/vynils')
          const data = await response.json()
          setVynils(data)
        }
        getVynils()
    }, [])

    const handleChoose = (vynil) => {
        viewVinil(vynil)
        navigate("../viewVynil")
    }

    //Lógica de cómo sería obtener los filtros de la base de datos

    const handleOnCheckbox = (e) => {
        
        setVynils({
            ...vynils,
            [e.target.value]: e.target.checked
        })

        console.log(vinilos)

        if (e.target.checked){
            const resultFilter = vynils.filter(item => item.name === e.target.checked)
            setVynils([
                ...vynils,
                resultFilter
            ])
        }
        else{
            const resultFilter = vynils.filter(item => item.name !== e.target.checked)
            setVynils([
                ...vynils,
                resultFilter
            ])
        }
            

    }

    console.log(vinilos)

    return (
        <main>
        <header>
        {(user.admin) ? <Link to="/create"><h1>Añadir un vinilo</h1></Link> : null}
        <button>
            <Link to="/user">Mi usuario</Link>
        </button>
        
        <div className="search-container">
            <input type="text" placeholder="Buscar vinilo..."/>
            <button>Buscar</button>
        </div>

        <div className="checkbox-container">
            <h3>Filtrar vinilos por: </h3>
            <div className="input-checkbox">
                <input onChange={handleOnCheckbox} type="checkbox" id="nombre_vinilos" name="vinilos" value="nombre"/>
                <label htmlFor="name">Nombre</label>
            </div>
            <div className="input-checkbox">
                <input onChange={handleOnCheckbox} type="checkbox" id="artista_vinilos" name="vinilos" value="artista"/>
                <label htmlFor="artist">Artista</label>
            </div>
            <div className="input-checkbox">
                <input onChange={handleOnCheckbox} type="checkbox" id="año_vinilos" name="vinilos" value="año"/>
                <label htmlFor="year">Año</label>
            </div>
        </div>
        </header>
        <div className="vinilos-container">
            <div className="vinilos">
            <h1>¡Bienvenido a Data Beats!</h1>
            <div className = "tablero">
                {vynils.map((vinilo) => (
                    <div key = {vinilo._id} className = "vinilo" onClick={() => handleChoose(vinilo)} >
                        <img src = {vinilo.img} alt = {vinilo.name}/>
                        <h1>{vinilo.name}</h1>
                        <h3>{vinilo.artist}</h3>
                        <h4>{vinilo.year}</h4>
                    </div>
                ))}
            </div>
            <p>Estos son los vinilos que tenemos en nuestra tienda</p>
            </div>
        </div>
        </main>
    )
}

export default MainPage