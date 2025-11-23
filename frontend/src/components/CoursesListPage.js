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

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <h2>Lista de Cursos</h2>
      <Link to="/courses/new" className="btn-primary">Novo Curso</Link>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.id}</td>
              <td>{course.name}</td>
              <td>{course.description || '-'}</td>
              <td>
                <Link to={`/courses/${course.id}`} className="btn-secondary">Editar</Link>
                <button onClick={() => handleDelete(course.id)} className="btn-danger">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoursesListPage;