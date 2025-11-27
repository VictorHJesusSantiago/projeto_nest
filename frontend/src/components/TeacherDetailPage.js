import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import TeacherForm from './TeacherForm';
import GuestManager from './GuestManager';

const TeacherDetailPage = () => {
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchTeacher = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/teachers/${id}`);
      setTeacher(data);
    } catch (err) {
      setError('Erro ao carregar professor.');
      if (err.response && err.response.status === 404) {
        navigate('/teachers');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeacher();
  }, [id]);

  const handleUpdateTeacher = async (teacherData) => {
    try {
      await api.patch(`/teachers/${id}`, teacherData);
      alert('Professor atualizado com sucesso!');
      fetchTeacher();
    } catch (err) {
      alert('Erro ao atualizar professor.');
    }
  };

  if (loading) return <div className="container mt-3">Carregando...</div>;
  if (error) return <div className="container mt-3 alert alert-danger">{error}</div>;
  if (!teacher) return null;

  return (
    <div className="container mt-4">
      <h2>Editar Professor</h2>
      
      {/* Container do Formulário Principal */}
      <div className="mb-5">
        <TeacherForm
          onSubmit={handleUpdateTeacher}
          initialData={teacher}
          buttonText="Salvar Alterações"
        />
      </div>

      <hr />

      {/* Gerenciamento de Convidados */}
      <GuestManager teacherId={teacher.id} initialGuests={teacher.guests} />
    </div>
  );
};

export default TeacherDetailPage;