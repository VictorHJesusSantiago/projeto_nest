import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTeachers, deleteTeacher } from '../services/api';

const TeachersListPage = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = async () => {
    setLoading(true);
    try {
      const data = await getTeachers();
      setTeachers(data);
    } catch (err) {
      setError('Falha ao carregar professores.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Deseja realmente excluir este professor?')) {
      try {
        await deleteTeacher(id);
        loadTeachers();
      } catch (err) {
        alert('Erro ao excluir.');
      }
    }
  };

  return (
    <div className="container">
      <div className="page-header">
        <div>
          <h2>Professores</h2>
          <p>Gerencie o corpo docente da instituição.</p>
        </div>
        <Link to="/teachers/new" className="btn btn-primary">
          <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
          Novo Professor
        </Link>
      </div>

      {loading ? (
        <div className="empty-state">
          <div className="spinner" style={{ borderColor: 'var(--primary) transparent var(--primary) transparent', margin: '0 auto 1rem' }}></div>
          <p>Carregando dados...</p>
        </div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : teachers.length === 0 ? (
        <div className="empty-state">
          <p>Nenhum professor cadastrado.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Disciplina</th>
                <th style={{ textAlign: 'right' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <tr key={teacher.id}>
                  <td>#{teacher.id}</td>
                  <td style={{ fontWeight: '600' }}>{teacher.name}</td>
                  <td>
                    <span style={{ background: '#e0e7ff', color: '#4338ca', padding: '0.2rem 0.6rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: '600' }}>
                      {teacher.subject}
                    </span>
                  </td>
                  <td style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    <Link to={`/teachers/${teacher.id}`} className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
                      Detalhes
                    </Link>
                    <button onClick={() => handleDelete(teacher.id)} className="btn btn-danger" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TeachersListPage;