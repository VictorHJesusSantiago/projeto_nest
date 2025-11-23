import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { createStudent, getStudentById, updateStudent } from '../services/api';

const StudentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isEditMode = !!id;

  useEffect(() => {
    if (isEditMode) {
      const fetchStudent = async () => {
        try {
          const data = await getStudentById(id);
          setFormData({ name: data.name, email: data.email });
        } catch (err) {
          setError('Erro ao carregar dados.');
        }
      };
      fetchStudent();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isEditMode) {
        await updateStudent(id, formData);
      } else {
        await createStudent(formData);
      }
      navigate('/students');
    } catch (err) {
      setError('Erro ao salvar. Verifique os dados.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2>{isEditMode ? 'Editar Estudante' : 'Novo Estudante'}</h2>
          <p>Preencha os dados abaixo para {isEditMode ? 'atualizar' : 'cadastrar'} o aluno.</p>
        </div>

        {error && <div className="error" style={{ padding: '1rem', background: '#fee2e2', color: '#dc2626', borderRadius: '0.5rem', marginBottom: '1.5rem', border: '1px solid #fecaca' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome Completo</label>
            <input
              type="text"
              name="name"
              placeholder="Ex: João da Silva"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="aluno@escola.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <Link to="/students" className="btn btn-secondary" style={{ flex: 1 }}>
              Cancelar
            </Link>
            <button type="submit" className="btn btn-primary" style={{ flex: 1 }} disabled={loading}>
              {loading && <div className="spinner"></div>}
              {loading ? 'Salvando...' : 'Salvar Dados'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;