import React, { useState, useEffect } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { UserContext } from '../context/userContextProvider'
//Creamos un main donde se pondrá el array de los vinilos con un formato json
const SectionPage = ({ aggregation, viewVynil }) => {

    const { user } = React.useContext(UserContext)

    const [selectedVynils, setSelectedVynils] = useState([])

    const navigate = useNavigate()

    // pedir la agregacion y pasarla a array
    // ese array se renderiza en esta pagina

    const getAggregation = async () => {
        if(aggregation === "genre"){
            const response = await fetch('http://localhost:4000/vynils/favorites/' + user._id, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
            })
            const data = await response.json()
            setSelectedVynils([])
        }
        if(aggregation === "favorites"){
            const response = await fetch('http://localhost:4000/vynils/favorites/' + user._id, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
            })
            const data = await response.json()
            setSelectedVynils(data)
        }
    }

    const handleChoose = (vynil) => {
        viewVynil([])
        viewVynil(vynil)
        navigate("../viewVynil")
    }

    useEffect(() => {
        console.log("hola")
        getAggregation()
      }, [])

      

    return (
        <main>
        <header>
        <button>
            <Link to="/user">Mi usuario</Link>
        </button>
        <button>
            <Link to="/vynils">Volver</Link>
        </button>
        </header>
        <div className="vinilos-container">
            <div className="vinilos">
            <h1>¡Bienvenido a Data Beats!</h1>
            <div className = "tablero">
                {selectedVynils.map((vinilo) => (
                    <div key = {vinilo._id} className = "vinilo" onClick={() => handleChoose(vinilo)} >
                        <img src = {vinilo.img} alt = {vinilo.name}/>
                        <h1>{vinilo.name}</h1>
                        <h3>{vinilo.artist}</h3>
                        <h4>{vinilo.year}</h4>
                    </div>
                ))}
            </div>
            <p>A continuación se muestra tu lista de vinilos favoritos</p>
            </div>
        </div>
        </main>
    )
}

export default SectionPage