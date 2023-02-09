import React, { useState, useEffect } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { UserContext } from '../context/userContextProvider'
//Creamos un main donde se pondrá el array de los vinilos con un formato json


const vynilInfo = ({selectedVynil, likedVynils, setLikedVynils}) => {

    //Creamos un array de tipo JSON con los datos de los vinilos
    const vinilos = [
        selectedVynil
    ]

    const { user } = React.useContext(UserContext)

    const handleFavorite = async (event) => {
        event.preventDefault()
        const vynil = selectedVynil
        
        // Para editar es PATCH
        const response = await fetch('http://localhost:4000/users/favorite/' + user._id + '/' + vynil._id, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(vynil),
        })
        const data = await response.json()
        setLikedVynils(data)
      }

    return (
        <main>
        <div className='button-back'>
            <Link to="/vynils"><button>Volver</button></Link>
        </div>
        <div className="vinilo-info-container">
            {(user.admin) ? <Link to="/editVynil"><button>Editar</button></Link> : null}
            <div className="vinilo-info">
                {vinilos.map((vinilo) => (
                    <div className = "vinilo" key={vinilo._id}>
                        <img src = {vinilo.img} alt = {vinilo.name}/>
                        <h1>{vinilo.name}</h1>
                        <h2>{vinilo.artist}</h2>
                        <h3>{vinilo.year}</h3>
                    </div>
                ))}
            </div>
        </div>
        <div className='button-like'>
            <button onClick={handleFavorite}>Me gusta</button>
        </div>
        </main>
    )
}

export default vynilInfo