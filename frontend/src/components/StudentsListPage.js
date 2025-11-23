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
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (err) {
      setError('Falha ao carregar estudantes.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este estudante?')) {
      try {
        await deleteStudent(id);
        loadStudents(); // Recarrega a lista
      } catch (err) {
        alert('Erro ao excluir estudante.');
      }
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <h2>Lista de Estudantes</h2>
      <Link to="/students/new" className="btn-primary">Novo Estudante</Link>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>
                <Link to={`/students/${student.id}`} className="btn-secondary">Editar</Link>
                <button onClick={() => handleDelete(student.id)} className="btn-danger">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsListPage;