import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '4rem', paddingTop: '2rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', background: 'linear-gradient(135deg, #4f46e5 0%, #9333ea 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Painel Administrativo
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto' }}>
          Gerencie toda a sua instituição de ensino em um único lugar. Rápido, seguro e intuitivo.
        </p>
      </div>

      <div className="dashboard-grid">
        <Link to="/teachers" className="dashboard-card">
          <div style={{ color: '#4f46e5', marginBottom: '1rem' }}>
            <svg width="40" height="40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <h3>Professores</h3>
          <p style={{ margin: '0.5rem 0 1.5rem' }}>Gerencie o corpo docente, especializações e atribuições.</p>
          <span style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.9rem' }}>Acessar &rarr;</span>
        </Link>

        <Link to="/students" className="dashboard-card">
          <div style={{ color: '#10b981', marginBottom: '1rem' }}>
            <svg width="40" height="40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h3>Estudantes</h3>
          <p style={{ margin: '0.5rem 0 1.5rem' }}>Controle de matrículas, dados pessoais e desempenho.</p>
          <span style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.9rem' }}>Acessar &rarr;</span>
        </Link>

        <Link to="/courses" className="dashboard-card">
          <div style={{ color: '#f59e0b', marginBottom: '1rem' }}>
            <svg width="40" height="40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3>Cursos</h3>
          <p style={{ margin: '0.5rem 0 1.5rem' }}>Grade curricular, disciplinas e organização de turmas.</p>
          <span style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.9rem' }}>Acessar &rarr;</span>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;