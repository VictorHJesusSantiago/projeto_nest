import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createTeacher } from '../services/api';

const TeacherForm = ({ onSubmit, initialData = null, buttonText = "Salvar" }) => {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setSubject(initialData.subject || '');
    } else {
      setName('');
      setSubject('');
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (onSubmit) {
        // Modo Edição
        await onSubmit({ name, subject });
      } else {
        // Modo Criação
        await createTeacher({ name, subject });
        navigate('/teachers');
      }

      if (!initialData && !onSubmit) {
        setName('');
        setSubject('');
      }
    } catch (err) {
      console.error(err);
      alert('Erro ao salvar professor.');
    } finally {
      setLoading(false);
    }
  };

  const formContent = (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Nome do Professor</label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="subject">Matéria</label>
        <input
          type="text"
          id="subject"
          name="subject"
          className="form-control"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
      </div>

      <div className="mt-3">
        <button type="submit" className="btn btn-success me-2" disabled={loading}>
          {loading ? 'Salvando...' : buttonText}
        </button>
        <Link to="/teachers" className="btn btn-secondary">
          Cancelar
        </Link>
      </div>
    </form>
  );

  // Se for a página de criação (/teachers/new), adiciona o container padrão
  if (!onSubmit) {
    return (
      <div className="form-container">
        <h2>Novo Professor</h2>
        {formContent}
      </div>
    );
  }

  // Se for edição (dentro da página de detalhes), retorna apenas o form
  return formContent;
};

export default TeacherForm;