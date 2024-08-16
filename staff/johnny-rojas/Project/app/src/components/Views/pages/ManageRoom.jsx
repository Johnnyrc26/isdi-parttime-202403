import { getUserId } from "../../../logic/getUserInfo"
import TopBar from '../library/TopBar';
import Header from '../core/Header';
import FormWithPanel from '../core/FormWithPanel';
import View from '../core/View';
import SubmitButton from '../core/SubmitButton';
import Field from '../core/Field';
import Title from '../core/Title';
import { useNavigate, useParams } from "react-router-dom";
import logic from "../../../logic/index"
import { useState, useEffect } from "react";

import './ManageRoom.css'

function ManageRoom() {
  const [bookings, setBookings] = useState([])
  const { roomId } = useParams()
  const userId = getUserId()
  const navigate = useNavigate()

  useEffect(() => {
    try {
      logic.getRoomBookings(roomId)
        .then((bookings) => { setBookings(bookings) })
        .catch(error => {
          alert(error.message)
          return
        })
    } catch (error) {
      console.error(error.message)
      alert(error)
    }
  }, [roomId])


  const handlerEditRoom = event => {
    event.preventDefault()

    const target = event.target

    const nameRoom = target.nameRoom.value
    const region = target.region.value
    const city = target.city.value
    const image = target.image.value
    const description = target.description.value
    const price = target.price.value

    const updates = {
      nameRoom,
      region,
      city,
      image,
      description,
      price
    }

    try {
      logic.editRoom(userId, roomId, updates)
        .then(() => {
          navigate(`/users/${userId}/rooms`)
        })
        .catch(error => alert(error.message))

    } catch (error) {
      alert(error.message)
    }
  }
  const handlerDeleteRoom = () => {
    try {
      logic.deleteRoom(userId, roomId)
        .then(() => {
          navigate(`/users/${userId}/rooms`)
        })
        .catch(error => alert(error.message))

    } catch (error) {
      alert(error.message)
    }
  }

  return <div>
    <Header>
      <TopBar />
    </Header>
    <div>
      
    <div className="container">
      <section className="sectionCard">
        <h2 className="sectionTitle">Reservas</h2>
        <div className="bookingListContainer">
          <ul className="gridList">
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <li className="bookingItem" key={booking.id}>
                  <p className="contactInfoTitle">Información de reserva:</p>
                  <p><span className="infoLabel">Nombre:</span> {booking.user.name}</p>
                  <p><span className="infoLabel">Apellido:</span> {booking.user.surname}</p>
                  <p><span className="infoLabel">Email:</span> {booking.user.email}</p>
                  <p><span className="infoLabel">Teléfono:</span> {booking.user.phone}</p>
                  <p><span className="infoLabel">Entrada:</span> {new Date(booking.startDate).toLocaleDateString()}</p>
                  <p><span className="infoLabel">Salida:</span> {new Date(booking.endDate).toLocaleDateString()}</p>
                </li>
              ))
            ) : (
              <p>No hemos encontrado reservas.</p>
            )}
          </ul>
        </div>
      </section>
    </div>


      <View className='RegisterForm' tag='main'>

        <Title className='TitleCreateRoom'>Edita tu habitación</Title>

        <FormWithPanel onSubmit={handlerEditRoom}>

          <Field id='nameRoom' type='text' placeholder='Nombre de la habitación' />

          <Field id='region' type='text' placeholder='Región' />

          <Field id='city' type='text' placeholder='Estado y ciudad' />

          <Field id='image' type='string' placeholder='Imagen principal (link)' />

          <Field id='description' type='string' placeholder='Descripción del alojamiento' />

          <Field id='price' type='string' placeholder='Precio por noche' />
          <SubmitButton>Realizar cambios</SubmitButton>

          <div>
            <button id="DeleteButton" className="DeleteButton" onClick={handlerDeleteRoom}>Eliminar habitacion</button>
          </div>

        </FormWithPanel>
      </View>

    </div>
  </div>
}

export default ManageRoom

