import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import TeacherForm from './TeacherForm';

const TeachersListPage = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      setError('');
      const { data } = await api.get('/teachers');
      setTeachers(data);
    } catch (err) {
      setError('Falha ao buscar professores.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleCreateTeacher = async (teacherData) => {
    try {
      setError('');
      await api.post('/teachers', teacherData);
      fetchTeachers();
    } catch (err) {
      setError('Falha ao criar professor.');
      console.error(err);
    }
  };

  const handleDeleteTeacher = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este professor?')) {
      try {
        setError('');
        await api.delete(`/teachers/${id}`);
        fetchTeachers();
      } catch (err) {
        setError('Falha ao excluir professor.');
        console.error(err);
      }
    }
  };

  if (loading) {
    return <div className="loading">Carregando professores...</div>;
  }

  return (
    <div>
      <div className="card">
        <h2>Adicionar Novo Professor</h2>
        {error && <div className="error-message">{error}</div>}
        <TeacherForm onSubmit={handleCreateTeacher} buttonText="Adicionar Professor" />
      </div>

      <div className="card">
        <h2>Lista de Professores</h2>
        {teachers.length === 0 ? (
          <p>Nenhum professor cadastrado.</p>
        ) : (
          <div className="list">
            {teachers.map((teacher) => (
              <div key={teacher.id} className="list-item">
                <div className="list-item-content">
                  <strong>{teacher.name}</strong>
                  <span>{teacher.subject}</span>
                </div>
                <div className="list-item-actions">
                  <Link to={`/teachers/${teacher.id}`} className="btn btn-primary">
                    Ver Detalhes
                  </Link>
                  <button
                    onClick={() => handleDeleteTeacher(teacher.id)}
                    className="btn btn-danger"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeachersListPage;