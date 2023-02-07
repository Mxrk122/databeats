import React, { useState, useEffect } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { UserContext } from '../context/userContextProvider'
//Creamos un main donde se pondrá el array de los vinilos con un formato json


const vynilInfo = ({selectedVynil}) => {
    //Creamos un array de tipo JSON con los datos de los vinilos
    const vinilos = [
        selectedVynil
    ]

    const { user } = React.useContext(UserContext)

    return (
        <main>
        <div className="vinilo-info-container">
            {(user.admin) ? <h1>¡Bienvenido a Data Beats!</h1> : <h1>eres un usuario normal</h1>}
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
        </main>
    )
}

export default vynilInfo