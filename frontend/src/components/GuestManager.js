import React, { useState, useEffect } from 'react';
import api from '../services/api';
import GuestForm from './GuestForm';

const GuestManager = ({ teacherId, initialGuests = [] }) => {
  const [guests, setGuests] = useState(initialGuests);
  const [editingGuestId, setEditingGuestId] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setGuests(initialGuests);
  }, [initialGuests]);

  const refreshGuests = async () => {
    try {
      const { data } = await api.get(`/teachers/${teacherId}`);
      setGuests(data.guests || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateGuest = async (guestData) => {
    try {
      setError('');
      await api.post('/guests', { ...guestData, teacherId });
      setIsCreating(false);
      refreshGuests();
    } catch (err) {
      console.error(err);
      setError('Erro ao adicionar convidado.');
    }
  };

  const handleUpdateGuest = async (guestId, guestData) => {
    try {
      setError('');
      await api.patch(`/guests/${guestId}`, guestData);
      await refreshGuests();
      setEditingGuestId(null);
    } catch (err) {
      console.error(err);
      setError('Erro ao atualizar convidado.');
    }
  };

  const handleDeleteGuest = async (guestId) => {
    if (window.confirm('Tem certeza que deseja excluir?')) {
      try {
        setError('');
        await api.delete(`/guests/${guestId}`);
        refreshGuests();
      } catch (err) {
        console.error(err);
        setError('Erro ao excluir convidado.');
      }
    }
  };

  return (
    <div className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Lista de Convidados</h3>
        {!isCreating && (
          <button className="btn btn-primary btn-sm" onClick={() => setIsCreating(true)}>
            + Novo Convidado
          </button>
        )}
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {isCreating && (
        <div className="card card-body mb-3 guest-create-section">
          <h5>Novo Convidado</h5>
          <GuestForm 
            onSubmit={handleCreateGuest} 
            buttonText="Adicionar"
          />
          <button 
            className="btn btn-secondary btn-sm mt-2" 
            onClick={() => setIsCreating(false)}
          >
            Cancelar
          </button>
        </div>
      )}

      {guests.length === 0 ? (
        <p className="text-muted">Nenhum convidado cadastrado.</p>
      ) : (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Status RSVP</th>
              <th style={{ width: '200px' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {guests.map((guest) => (
              <tr key={guest.id}>
                {editingGuestId === guest.id ? (
                  <td colSpan="3">
                    <div className="card card-body">
                      <GuestForm
                        initialData={guest}
                        buttonText="Salvar"
                        onSubmit={(data) => handleUpdateGuest(guest.id, data)}
                      />
                      <button 
                        className="btn btn-secondary btn-sm mt-2"
                        onClick={() => setEditingGuestId(null)}
                      >
                        Cancelar
                      </button>
                    </div>
                  </td>
                ) : (
                  <>
                    <td>{guest.name}</td>
                    <td>
                      {guest.rsvp ? (
                        <span className="badge bg-success">Confirmado</span>
                      ) : (
                        <span className="badge bg-warning text-dark">Pendente</span>
                      )}
                    </td>
                    <td>
                      <button 
                        className="btn btn-sm btn-secondary me-2"
                        onClick={() => setEditingGuestId(guest.id)}
                      >
                        Editar
                      </button>
                      <button 
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteGuest(guest.id)}
                      >
                        Excluir
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GuestManager;