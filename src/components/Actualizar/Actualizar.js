import { React, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const patients = require('../../promises/patients')

export default function Actualizar() {
    const { id } = useParams()
    const [patientData, setpatientData] = useState([])
    const navigate = useNavigate()


    const handleOnChange = (e) => {
        setpatientData({
            ...patientData,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        patients.findOneById(id)
            .then(res => {
                console.log(res)
                setpatientData(res)
            })
            .catch(err => { console.log(err) })
    }, [])

    const submit = (e) => {
        e.preventDefault()
        let url = '/pacientes/detalle/' + patientData._id
        patients.update(
            patientData._id,
            patientData.rut,
            patientData.nombre,
            patientData.edad,
            patientData.sexo,
            patientData.enfermedad
        ).then(() => {
            navigate(url)
        })
        .catch(err => {console.log(err)})
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
                        <button className='btn btn-primary' type='submit'>Actualizar</button>
                    </div>
                </form>
            </div>

        </>
    )
}
