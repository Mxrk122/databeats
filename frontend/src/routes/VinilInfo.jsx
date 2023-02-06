import { Link, useNavigate} from 'react-router-dom'
//Creamos un main donde se pondrá el array de los vinilos con un formato json


const VinilInfo = () => {
    //Creamos un array de tipo JSON con los datos de los vinilos
    const vinilos = [
        {
            "id": 1,
            "nombre": "Abbey Road",
            "artista": "The Beatles",
            "precio": 20,
            "imagen": 'https://revistaastronauta.com/wp-content/uploads/2022/04/1200px-7C396001-AA89-4EF5-8732-342FE9276B38.jpg'
        },
    ]
    return (
        <main>
        <div className="vinilo-info-container">
            <div className="vinilo-info">
            {
                vinilos.map((vinilo) => (
                    <div className = "vinilo">
                        <img src = {vinilo.imagen} alt = {vinilo.nombre}/>
                        <h1>{vinilo.nombre}</h1>
                        <h2>{vinilo.artista}</h2>
                        <h3>{vinilo.precio}€</h3>
                    </div>
                ))}
            </div>
        </div>
        </main>
    )
}

export default VinilInfo