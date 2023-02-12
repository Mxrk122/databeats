import React, { useState, useEffect } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { UserContext } from '../context/userContextProvider'
//Creamos un main donde se pondrá el array de los vinilos con un formato json


const vynilInfo = ({selectedVynil, isLiked, setLikedVynils, rates}) => {

    const { user } = React.useContext(UserContext)

    //Creamos un array de tipo JSON con los datos de los vinilos
    const vinilos = [
        selectedVynil
    ]

    // variables para ver y añadir comentarios
    const [vynilRates, setVynilRates] = useState([])
    const [actualRate, setActualRate] = useState([])
    const [actualComment, setActualComment] = useState([])

    // actualizar comentarios
    const getVynilRates = async () => {
        const response = await fetch('http://localhost:4000/rates/' + selectedVynil._id)
        const data = await response.json()
        setVynilRates(data)
    }

    useEffect(() => {
        getVynilRates()
    }, [])

    useEffect(() => {
        console.log(vynilRates)
    }, [vynilRates])

    //Verificar si el vinilo esta en favoritos
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

    // crear comentaario
    const handleCreateComment = async (event) => {
        event.preventDefault()

        if(actualRate === "" || actualComment === ""){
            return
        }

        // crear comentario

        const actualUser = user._id
        const vynil = selectedVynil._id
        const score = actualRate
        const comment = actualComment

        const rate = {
            actualUser,
            vynil,
            score,
            comment
        }

        console.log(JSON.stringify(rate))
        
        // Para editar es PATCH
        const response = await fetch('http://localhost:4000/rates/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(rate),
        })
        const data = await response.json()
        getVynilRates()
        console.log(data)
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
          <button onClick={handleCreateComment}>{"Añadir comentario"}</button>
          {vynilRates.map((rate) => (
            <div key={rate._id} className="comment">
                <h3>{rate.user}</h3>
                <h4>{rate.score}</h4>
                <h4>{rate.comment}</h4>
            </div>
          ))}
        </div>
        </main>
    )
}

export default vynilInfo