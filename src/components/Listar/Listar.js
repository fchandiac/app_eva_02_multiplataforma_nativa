import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const patients = require('../../promises/patients')

export default function Listar() {
  const [patientsList, setPatientsList] = useState([])

  useEffect(() => {
    patients.findAll()
      .then(res => {
        setPatientsList(res)
      })
      .catch(err => { console.log(err) })

  }, [])

  return (
    <>
      <div className='container'>
        <ul>
          {
            patientsList.map(item => (
              <div className="card mb-3" key={item._id}>
                <div className="card-body">
                  <h5 className="card-title">Nombre: {item.nombre}</h5>
                  <p className="card-text">rut: {item.rut}</p>
                  <p className="card-text"> edad: {item.edad}</p>
                  <p className="card-text">
                    <Link to={'/pacientes/detalle/' + item._id} className="btn btn-primary">Ver detalle</Link>
                  </p>
                </div>
              </div>
            ))
          }
        </ul>
      </div>


    </>
  )
}
