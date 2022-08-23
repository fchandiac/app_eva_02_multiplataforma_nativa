import { React, useState } from 'react'

const config = require('../../config.json')
const server_url = config.server_url
const patients = require('../../promises/patients')

export default function Nuevo() {
  const [patientData, setpatientData] = useState(patientDataDefault())
  const [selectedFile, setSelectedFile] = useState(null)
  const [selectedFileName, setSelectedFileName] = useState('')


  const handleOnChange = (e) => {
    setpatientData({
      ...patientData,
      [e.target.name]: e.target.value
    })
  }

  const handleFileSelected = (e) => {
    e.preventDefault()
    setSelectedFile(e.target.files[0])
    // console.log(e.target.files[0])
  }

  const submit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('file', selectedFile)

    patients.uploadImage(formData)
      .then(img => {
        let url = config.images_path + img
        console.log(patientData, url)
        patients.create(
          patientData.rut,
          patientData.nombre,
          patientData.edad,
          patientData.sexo,
          url,
          patientData.enfermedad
        )
        .then(() => {
          setpatientData(patientDataDefault())
        })
        .catch(err => {console.log(err)})

      })
      .catch(err => { console.log(err) })
  }
  return (
    <>
      <div className='container'>
        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input type="text" className="form-control" name='nombre' value={patientData.nombre} onChange={handleOnChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Rut</label>
            <input type="text" className="form-control" name='rut' value={patientData.rut} onChange={handleOnChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Edad</label>
            <input type="number" className="form-control" name='edad' value={patientData.edad} onChange={handleOnChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Sexo</label>
            <select className="form-select" name='sexo' value={patientData.sexo} onChange={handleOnChange}>
              <option value=""></option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
            </select>

          </div>


          <div className="mb-3">
            <label className="form-label">enfermadad</label>
            <input type="text" className="form-control" name='enfermedad' value={patientData.enfermedad} onChange={handleOnChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Fotogrfía</label>
            <br></br>
            <input
              accept="image/*"
              // style={{ display: 'none' }}
              id="raised-button-file"
              onChange={handleFileSelected}
              type="file"
            />
          </div>
          <div className="mb-3">
            <button className='btn btn-primary' type='submit'>Enviar</button>
          </div>
        </form>
      </div>

    </>
  )
}



function patientDataDefault() {
  return ({
    nombre: '',
    rut: '',
    edad: 0,
    sexo: '',
    enfermedad: ''
  })
}