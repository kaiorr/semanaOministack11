import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import swal from 'sweetalert';
import {FiPower, FiTrash2} from 'react-icons/fi'
import './styles.css';
import api from '../../services/api';


export default function Profile() {
  const history = useHistory();

  const [incidents, setIncidents] = useState([]);

  const ongName = localStorage.getItem('ongName');
  const ongId = localStorage.getItem('ongId');

  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ongId,
      }
    }).then(res => {
      setIncidents(res.data);
    })
  }, [ongId]);

  async function handleDeleteIncident(id){
    try {
      await api.delete(`incidents/${id}`, {
        headers:{
          Authorization: ongId,
        }
      });
      swal({
        title: `O caso foi deletado`,
        icon: "warning",
        button: true,
        dangerMode: true,
      });

      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch (err) {
      swal({
        title: "Falha no Login!",
        text: "Tente novamente.",
        icon: "error",
        button: true,
        dangerMode: true,
      });
    }
  }

  function handleLogout() {
    localStorage.clear();

    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero"/>
        <span>
          Bem Vinda, {ongName}
        </span>
        <Link className="button" to="/incidents/new">Cadastrar Novo Caso</Link>
        <button onClick={handleLogout}>
          <FiPower size={18} color="#e02041" />
        </button>
      </header>

      <h1>Casos Cadastrados</h1>
      <ul>

        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>Caso: </strong>
          <p>{incident.title}</p>
        
            <strong>Descrição</strong>
            <p>{incident.title}</p>
        
            <strong>Valor: </strong>
            <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>
        
            <button  onClick={() => handleDeleteIncident(incident.id)} type="button">
              <FiTrash2 size={20} color="#a8a8b3" />

            </button>
          </li> 
        ))}
       
      </ul>
    </div>
  );
}


