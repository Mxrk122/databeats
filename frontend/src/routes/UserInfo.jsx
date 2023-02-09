import React, { useState, useEffect } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { UserContext } from '../context/userContextProvider'
//Creamos un main donde se pondrá el array de los vinilos con un formato json


const UserInfo = () => {
    //Creamos un array de tipo JSON con los datos de los usuarios
    const [getUsers] = useState()

    // Contexto para adquirir el usuario
    const {user} = React.useContext(UserContext)

    const navigate = useNavigate()

    useEffect(() => {
        const getUsers = async () => {
        const response = await fetch('http://localhost:4000/users')
        const data = await response.json()
        getUsers(data)
        }
        getUsers()
    }, [])


    return (
        <main>
        <navigator>
            <Link to="/vynils"><button>Volver</button></Link>
        </navigator>
        <div className="user-info-container">
            {(user.admin) ? <Link to="/editVynil"><button>Editar</button></Link> : null}
            <div className="user-info">
                <div>
                    <h1>Nombre de usuario: {user.username}</h1>
                    <h2>Nombre: {user.firstname}</h2>
                    <h2>Apellidos: {user.lastname}</h2>
                </div>
            </div>
        </div>
        <div className='button-close-session'>
            <button>Cerrar sesión</button>
        </div>
        </main>
    )
}

export default UserInfo