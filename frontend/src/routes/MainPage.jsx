import React from 'react'
//Creamos un main donde se pondrá el array de los vinilos con un formato json

const MainPage = () => {
    //Creamos un array de tipo JSON con los datos de los vinilos
    const vinilos = [
        {
            "id": 1,
            "nombre": "Abbey Road",
            "artista": "The Beatles",
            "precio": 20,
            "imagen": 'https://revistaastronauta.com/wp-content/uploads/2022/04/1200px-7C396001-AA89-4EF5-8732-342FE9276B38.jpg'
        },
        {
            "id": 2,
            "nombre": "The Dark Side of the Moon",
            "artista": "Pink Floyd",
            "precio": 20,
            "imagen": 'https://www.audiovenue.uk/wp-content/uploads/2021/07/pink-floyd-dark-side.jpg'
        }
    ]

    return (
        <main>
        <div className="vinilos-container">
            <div className="vinilos">
            <h1>¡Bienvenido a Data Beats!</h1>
            <div className = "tablero">
                {
                vinilos.map((vinilo) => (
                    <div className = "vinilo">
                        <img src = {vinilo.imagen} alt = {vinilo.nombre}/>
                        <h2>{vinilo.nombre}</h2>
                        <h3>{vinilo.artista}</h3>
                        <h4>{vinilo.precio}€</h4>
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