import React, { useState, useEffect } from 'react';

const GuestForm = ({ onSubmit, initialData = null, buttonText = "Salvar" }) => {
  const [name, setName] = useState('');
  const [rsvp, setRsvp] = useState(false);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setRsvp(initialData.rsvp || false);
    } else {
      setName('');
      setRsvp(false);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, rsvp });
    if (!initialData) {
      setName('');
      setRsvp(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="guest-form">
      <div className="form-group">
        <label htmlFor="guest-name">Nome do Convidado</label>
        <input
          type="text"
          id="guest-name"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <div className="form-check">
          <input
            type="checkbox"
            id="guest-rsvp"
            className="form-control checkbox"
            checked={rsvp}
            onChange={(e) => setRsvp(e.target.checked)}
          />
          <label htmlFor="guest-rsvp">Confirmou presença (RSVP)</label>
        </div>
      </div>
      <button type="submit" className="btn btn-success">
        {buttonText}
      </button>
    </form>
  );
};

export default GuestForm;