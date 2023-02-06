import React, { useState, useEffect } from 'react'
//Creamos un main donde se pondrá el array de los vinilos con un formato json


const MainPage = () => {
    const navigate = useNavigate()
    //Creamos un array de tipo JSON con los datos de los vinilos
    const [vynils, setVynils] = useState([])

    useEffect(() => {
        const getVynils = async () => {
          const response = await fetch('http://localhost:4000/vynils')
          const data = await response.json()
          setVynils(data)
        }
        getVynils()
    }, [])

    console.log(vynils)

    return (
        <main>
        <div className="vinilos-container">
            <div className="vinilos">
            <h1>¡Bienvenido a Data Beats!</h1>
            <div className = "tablero">
                {
                vynils.map((vinilo) => (
                    <div key = { vinilo._id} className = "vinilo">
                        <img src = {vinilo.img} alt = {vinilo.name}/>
                        <h2>{vinilo.name}</h2>
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