import React, { useState, useEffect } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { UserContext } from '../context/userContextProvider'
//Creamos un main donde se pondrá el array de los vinilos con un formato json
const EditVynil = ({selectedVynil, setSelectedVynil}) => {
    const [name, SetNewName] = useState('')
    const [artist, setNewArtist] = useState('')
    const [year, setNewYear] = useState('')
    const [img, setNewImg] = useState('')
    //Creamos un array de tipo JSON con los datos de los vinilos
    const vinilos = [
        selectedVynil
    ]

    const { user } = React.useContext(UserContext)

    const vynil_id = selectedVynil._id

    const handleUpdate = async (event) => {
        event.preventDefault()
        const vynil = {
          name,
          artist,
          year,
          img,
        }
        
        // Para editar es PATCH
        const response = await fetch('http://localhost:4000/vynils/' + vynil_id, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(vynil),
        })
        const data = await response.json()
        setSelectedVynil(data)
      }

    return (
        <main>
        <div className='button-back'>
            <Link to="/viewVynil"><button>Volver</button></Link>
        </div>
        <div className="vinilo-edit-container">
            <div className="vinilo-edit">
                {vinilos.map((vinilo) => (
                    <div className = "vinilo_edit" key={vinilo._id}>
                        <img src = {vinilo.img} alt = {vinilo.name}/>
                        <h1>{vinilo.name}</h1>
                        <input type="text" id="New_name_vinil_id" placeholder={vinilo.name} onChange={(event) => SetNewName(event.target.value)}/>
                        <h1>{vinilo.artist}</h1>
                        <input type="text" id="New_artist_vinil_id" placeholder={vinilo.artist} onChange={(event) => setNewArtist(event.target.value)}/>
                        <h1>{vinilo.year}</h1>
                        <input type="Number" id="New_year_vinil_id" placeholder={vinilo.year} onChange={(event) => setNewYear(event.target.value)}/>
                        <h1>imagen</h1>
                        <input type="text" id="New_img" onChange={(event) => setNewImg(event.target.value)}/>
                    </div>
                ))}
            </div>
            <button onClick={handleUpdate}>enviar</button>
        </div>
        </main>
    )
}

export default EditVynil