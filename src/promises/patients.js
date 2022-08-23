
const config = require('../config.json')
const server_url = config.server_url


function findAll() {
    const patients = new Promise((resolve, reject) => {
        fetch(server_url + 'patients', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            res.json().then(res => {
                if (res.code === 0) {
                    reject(res.data)
                } else {
                    resolve(res.data)
                }
            })
        }).catch(err => { reject(err) })
    })
    return patients
}

function create(rut, nombre, edad, sexo, fotoPersonal, enfermedad){
    let data = {'rut':rut, 'nombre':nombre, 'edad':edad, 'sexo':sexo, 'fotoPersonal':fotoPersonal, 'enfermedad':enfermedad}
    const patient = new Promise((resolve, reject) => {
        fetch(server_url + 'patients', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            res.json().then(res => {
                if (res.code === 0) {
                    reject(res.data)
                } else {
                    resolve(res.data)
                }
            })
        }).catch(err => { reject(err) })
    })
    return patient
}

function update(id, rut, nombre, edad, sexo, enfermedad){
    let data = {'id':id, 'rut':rut, 'nombre':nombre, 'edad':edad, 'sexo':sexo, 'enfermedad':enfermedad}
    const patient = new Promise((resolve, reject) => {
        fetch(server_url + 'patients/update', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            res.json().then(res => {
                if (res.code === 0) {
                    reject(res.data)
                } else {
                    resolve(res.data)
                }
            })
        }).catch(err => { reject(err) })
    })
    return patient
}


function destroy(id){
    let data = {'id':id}
    const patient = new Promise((resolve, reject) => {
        fetch(server_url + 'patients', {
            method: 'DELETE',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            res.json().then(res => {
                if (res.code === 0) {
                    reject(res.data)
                } else {
                    resolve(res.data)
                }
            })
        }).catch(err => { reject(err) })
    })
    return patient
}

function uploadImage(formData) {
    const image = new Promise((resolve, reject) => {
        fetch(server_url + 'patients/uploadImage', {
            method: 'POST',
            body: formData,
        }).then(res => {
            //console.log(res)
            
           res.json().then(data => {
            //console.log(data.filename)
            resolve(data.filename)
        })
        })
        .catch(err => { reject(err) })
    })

    return image
}

function findOneById(id){
    let data = {id}
    const patient = new Promise((resolve, reject) => {
        fetch(server_url + 'patients/findOneById', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            res.json().then(res => {
                if (res.code === 0) {
                    reject(res.data)
                } else {
                    resolve(res.data)
                }
            })
        }).catch(err => { reject(err) })
    })
    return patient
}

export { findAll, uploadImage, create, findOneById, update, destroy}