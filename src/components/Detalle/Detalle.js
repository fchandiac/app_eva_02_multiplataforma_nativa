import { React, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const patients = require('../../promises/patients')

export default function Detalle() {
  const { id } = useParams()
  const [patient, setPatient] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    patients.findOneById(id)
      .then(res => {
        setPatient(res)
      })
      .catch(err => { console.log(err) })
  }, [])

  const destroy = () => {
    patients.destroy(patient._id)
      .then(() => {
        navigate('/pacientes/listar')
      })
      .catch(err => { console.log(err) })
  }

  return (
    <>
      <br />
      <div className='container'>
        <div className="card mb-3">
          <img className="card-img-top" src={patient.fotoPersonal} />
          <div className="card-body">
            <h5 className="card-title">Nombre: {patient.nombre}</h5>
            <p className="card-text">rut: {patient.rut}</p>
            <p className="card-text"> edad: {patient.edad}</p>
            <p className="card-text"> sexo: {patient.sexo}</p>
            <p className="card-text">enfermadad: {patient.enfermedad}</p>
            <div>
              <Link to={'/pacientes/actualizar/' + patient._id} className="btn btn-primary">Actualizar</Link> 
              <a> </a>
              <button className="btn btn-primary" onClick={destroy} >Eliminar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
