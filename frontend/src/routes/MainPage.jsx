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

    return (
        <main>
        <header>
        {(user.admin) ? <Link to="/create"><h1>Añadir un vinilo</h1></Link> : null}
        <button>
            <Link to="/user">Mi usuario</Link>
        </button>
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