import React, { useState, useEffect } from 'react'
import { Link, useNavigate} from 'react-router-dom'
//Creamos un main donde se pondrá el array de los vinilos con un formato json
const SectionPage = ({viewVinil}) => {
    const vynils = [{
        _id: 1,
        name: "The Dark Side of the Moon",
        artist: "Pink Floyd",
        year: 1973,
        genre: "Rock",
        img: "https://images-na.ssl-images-amazon.com/images/I/81Z9%2BZ1ZQlL._SL1500_.jpg"
    },
    {
        _id: 2,
        name: "Abbey Road",
        artist: "The Beatles",
        year: 1969,
        genre: "Rock",
        img: "https://images-na.ssl-images-amazon.com/images/I/81Z9%2BZ1ZQlL._SL1500_.jpg"
    },]
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
                {vynils.map((vinilo) => (
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