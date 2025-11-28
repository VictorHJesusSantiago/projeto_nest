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
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Nome do Convidado</label>
        <input
          type="text"
          className="form-control"
          name="name" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="mb-3 form-check">
        <label className="form-check-label">
          <input
            type="checkbox"
            className="form-check-input"
            name="rsvp"
            checked={rsvp}
            onChange={(e) => setRsvp(e.target.checked)}
            style={{ marginRight: '8px' }}
          />
          Confirmado (RSVP)
        </label>
      </div>

      <button type="submit" className="btn btn-success">
        {buttonText}
      </button>
    </form>
  );
};

export default GuestForm;