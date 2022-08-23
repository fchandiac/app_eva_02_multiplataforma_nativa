
import './App.css';

import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom"
import Inicio from './components/Inicio';
import Listar from './components/Listar';
import Nuevo from './components/Nuevo';
import Detalle from './components/Detalle';
import Actualizar from './components/Actualizar';


export default function App() {
  return (
    <>
      <Router>
        <nav className="nav">
          <Link to="/" className="nav-link">Inicio</Link>
          <Link to="/pacientes/nuevo" className="nav-link">Nuevo Paciente</Link>
          <Link to="/pacientes/listar" className="nav-link">Listar Pacientes</Link>
        </nav>
        <Routes>
          <Route path="/pacientes/listar" element={<Listar />} />
          <Route path="/pacientes/nuevo" element={<Nuevo />} />
          <Route path="/pacientes/detalle/:id" element={<Detalle />} />
          <Route path="/pacientes/actualizar/:id" element={<Actualizar/>} />
          <Route path="/" element={<Inicio />} />
        </Routes>
      </Router>
    </>
  )
}



