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
      setError('');
      const { data } = await api.get(`/teachers/${id}`);
      setTeacher(data);
    } catch (err) {
      setError('Falha ao buscar detalhes do professor.');
      console.error(err);
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
      setError('');
      await api.patch(`/teachers/${id}`, teacherData);
      fetchTeacher();
      alert('Professor atualizado com sucesso!');
    } catch (err) {
      setError('Falha ao atualizar professor.');
      console.error(err);
    }
  };

  if (loading) {
    return <div className="loading">Carregando detalhes...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!teacher) {
    return null;
  }

  return (
    <div>
      <div className="card">
        <h2>Detalhes do Professor</h2>
        <TeacherForm
          onSubmit={handleUpdateTeacher}
          initialData={teacher}
          buttonText="Atualizar Professor"
        />
      </div>

      <GuestManager teacherId={teacher.id} initialGuests={teacher.guests} />
    </div>
  );
};

export default TeacherDetailPage;