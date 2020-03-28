import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import swal from 'sweetalert';
import api from "../../services/api";
import "./styles.css";
import logoImg from "../../assets/logo.svg";

export default function NewIncident() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");

  const ongId = localStorage.getItem("ongId");

  const history = useHistory();

  async function handleNewIncident(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      value
    };

    try {
      await api.post("/incidents", data, {
        headers: { Authorization: ongId }
      });
      swal({
        title: `Caso cadastrado com Sucesso`,
        icon: "success",
        button: true,
        dangerMode: true,
      });

      history.push("/profile");
    } catch (err) {
      swal({
        title: "Falha no Login!",
        text: "Tente novamente.",
        icon: "error",
        button: true,
        dangerMode: true,
      })
    }
  }
  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1>Cadastrar novo caso</h1>
          <p>
            Descreva o caso detalhadamente para encontrar um herói para resolver
            isso.
          </p>

          <Link to="/" className="back-link">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para home
          </Link>
        </section>

        <form onSubmit={handleNewIncident}>
          <input
            required
            type="text"
            placeholder="Título do caso"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            required
            type="text"
            placeholder="Descrição"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input
            required
            type="text"
            placeholder="Valor em reais"
            value={value}
            onChange={e => setValue(e.target.value)}
          />

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}