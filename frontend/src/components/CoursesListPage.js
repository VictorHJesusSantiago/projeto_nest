import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCourses, deleteCourse } from '../services/api';

const CoursesListPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    setLoading(true);
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (err) {
      setError('Falha ao carregar cursos.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este curso?')) {
      try {
        await deleteCourse(id);
        loadCourses();
      } catch (err) {
        alert('Erro ao excluir curso.');
      }
    }
  };

  return (
    <div className="container">
      <div className="page-header">
        <div>
          <h2>Cursos</h2>
          <p>Gerencie a grade curricular e disciplinas ofertadas.</p>
        </div>
        <Link to="/courses/new" className="btn btn-primary">
          <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
          Novo Curso
        </Link>
      </div>

      {loading ? (
        <div className="empty-state">
          <div className="spinner" style={{ borderColor: 'var(--primary) transparent var(--primary) transparent', margin: '0 auto 1rem' }}></div>
          <p>Carregando dados...</p>
        </div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : courses.length === 0 ? (
        <div className="empty-state">
          <p>Nenhum curso encontrado.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome do Curso</th>
                <th>Descrição</th>
                <th style={{ textAlign: 'right' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id}>
                  <td>#{course.id}</td>
                  <td style={{ fontWeight: '600', color: 'var(--primary-dark)' }}>{course.name}</td>
                  <td style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {course.description || <span style={{ color: '#9ca3af', fontStyle: 'italic' }}>Sem descrição</span>}
                  </td>
                  <td style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    <Link to={`/courses/${course.id}`} className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
                      Editar
                    </Link>
                    <button onClick={() => handleDelete(course.id)} className="btn btn-danger" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
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

export default CoursesListPage;