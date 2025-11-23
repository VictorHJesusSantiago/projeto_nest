import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getStudents, deleteStudent } from '../services/api';

const StudentsListPage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    setLoading(true);
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (err) {
      setError('Falha ao carregar dados.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja remover este registro?')) {
      try {
        await deleteStudent(id);
        loadStudents();
      } catch (err) {
        alert('Erro ao excluir.');
      }
    }
  };

  return (
    <div className="container">
      <div className="page-header">
        <div>
          <h2>Estudantes</h2>
          <p>Gerencie os alunos matriculados no sistema.</p>
        </div>
        <Link to="/students/new" className="btn btn-primary">
          <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
          Novo Estudante
        </Link>
      </div>

      {loading ? (
        <div className="empty-state">
          <div className="spinner" style={{ borderColor: 'var(--primary) transparent var(--primary) transparent', margin: '0 auto 1rem' }}></div>
          <p>Carregando dados...</p>
        </div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : students.length === 0 ? (
        <div className="empty-state">
          <p>Nenhum estudante encontrado.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome Completo</th>
                <th>Email</th>
                <th style={{ textAlign: 'right' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>#{student.id}</td>
                  <td style={{ fontWeight: '600' }}>{student.name}</td>
                  <td>{student.email}</td>
                  <td style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    <Link to={`/students/${student.id}`} className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
                      Editar
                    </Link>
                    <button onClick={() => handleDelete(student.id)} className="btn btn-danger" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
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

export default StudentsListPage;