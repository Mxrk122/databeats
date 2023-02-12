import React, { useState, useEffect } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { UserContext } from '../context/userContextProvider'
//Creamos un main donde se pondrá el array de los vinilos con un formato json


const vynilInfo = ({selectedVynil, isLiked, setLikedVynils, likedVynils}) => {

    //Verificar si el vinilo esta en favoritos
    const { user } = React.useContext(UserContext)

    //Creamos un array de tipo JSON con los datos de los vinilos
    const vinilos = [
        selectedVynil
    ]

    // variables para ver y añadir comentarios
    const [rates, setRates] = useState([])
    const [actualRate, setActualRate] = useState([])
    const [actualComment, setActualComment] = useState([])

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

    const handleComment = (event) => {
        event.preventDefault()

        // Postear comentario
        console.log(actualRate)
        console.log(actualComment)
    }

    return (
        <main>
        <div className='button-back'>
            <Link to="/vynils"><button>Volver</button></Link>
        </div>
        <div className="vinilo-info-container">
            {(user.admin) ? <Link to="/editVynil"><button>Editar</button></Link> : null}
            {(user.admin) ? <button>Borrar</button> : null}
            <div className="vinilo-info">
                {vinilos.map((vinilo) => (
                    <div className = "vinilo" key={vinilo._id}>
                        <img src = {vinilo.img} alt = {vinilo.name}/>
                        <h1>{vinilo.name}</h1>
                        <h2>{vinilo.artist}</h2>
                        <h3>{vinilo.year}</h3>
                        <h4>{vinilo.genre}</h4>
                    </div>
                ))}
            </div>
        </div>
        <div className='button-like'>
            <button onClick={handleFavorite}>{isLiked ? "NO ME GUSTA" : "ME GUSTA"}</button>
        </div>
        <div className="comment-section">
          <input
            type="number"
            id="rate"
            placeholder="Calificacion sobre 100"
            onChange={(event) => setActualRate(event.target.value)}
          />
          <input
            type="text"
            id="Comment"
            placeholder="Comentario"
            onChange={(event) => setActualComment(event.target.value)}
          />
          <button onClick={handleComment}>{"Añadir comentario"}</button>
        </div>
        </main>
    )
}

export default vynilInfo