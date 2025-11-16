import React, { useState, useEffect } from 'react';

const TeacherForm = ({ onSubmit, initialData = null, buttonText = "Salvar" }) => {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setSubject(initialData.subject || '');
    } else {
      setName('');
      setSubject('');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, subject });
    if (!initialData) {
      setName('');
      setSubject('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name">Nome do Professor</label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="subject">Matéria</label>
          <input
            type="text"
            id="subject"
            className="form-control"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
      </div>
      <button type="submit" className="btn btn-success">
        {buttonText}
      </button>
    </form>
  );
};

export default TeacherForm;