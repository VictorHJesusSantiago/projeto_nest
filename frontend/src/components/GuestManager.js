import React, { useState } from 'react';
import api from '../services/api';
import GuestForm from './GuestForm';

const GuestManager = ({ teacherId, initialGuests = [] }) => {
  const [guests, setGuests] = useState(initialGuests);
  const [editingGuestId, setEditingGuestId] = useState(null);
  const [error, setError] = useState('');

  const refreshGuests = async () => {
    try {
      const { data } = await api.get(`/teachers/${teacherId}`);
      setGuests(data.guests || []);
    } catch (err) {
      setError('Falha ao atualizar lista de convidados.');
    }
  };

  const handleCreateGuest = async (guestData) => {
    try {
      setError('');
      await api.post('/guests', { ...guestData, teacherId });
      refreshGuests();
    } catch (err) {
      setError('Falha ao adicionar convidado.');
    }
  };

  const handleUpdateGuest = async (guestId, guestData) => {
    try {
      setError('');
      await api.patch(`/guests/${guestId}`, guestData);
      setEditingGuestId(null);
      refreshGuests();
    } catch (err) {
      setError('Falha ao atualizar convidado.');
    }
  };

  const handleDeleteGuest = async (guestId) => {
    if (window.confirm('Tem certeza que deseja excluir este convidado?')) {
      try {
        setError('');
        await api.delete(`/guests/${guestId}`);
        refreshGuests();
      } catch (err) {
        setError('Falha ao excluir convidado.');
      }
    }
  };

  return (
    <div className="card">
      <h3>Gerenciar Convidados</h3>
      {error && <div className="error-message">{error}</div>}

      <h4>Adicionar Novo Convidado</h4>
      <GuestForm onSubmit={handleCreateGuest} buttonText="Adicionar Convidado" />

      <h4 style={{ marginTop: '30px' }}>Convidados Atuais</h4>
      {guests.length === 0 ? (
        <p>Nenhum convidado para este professor.</p>
      ) : (
        <div className="list">
          {guests.map((guest) => (
            <div key={guest.id} className="list-item">
              {editingGuestId === guest.id ? (
                <div style={{ width: '100%' }}>
                  <GuestForm
                    initialData={guest}
                    buttonText="Atualizar"
                    onSubmit={(data) => handleUpdateGuest(guest.id, data)}
                  />
                  <button
                    onClick={() => setEditingGuestId(null)}
                    className="btn btn-secondary"
                    style={{ marginTop: '10px' }}
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <>
                  <div className="list-item-content">
                    <strong>{guest.name}</strong>
                    <span>
                      RSVP: {guest.rsvp ? 'Sim' : 'Não'}
                    </span>
                  </div>
                  <div className="list-item-actions">
                    <button
                      onClick={() => setEditingGuestId(guest.id)}
                      className="btn btn-warning"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteGuest(guest.id)}
                      className="btn btn-danger"
                    >
                      Excluir
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GuestManager;