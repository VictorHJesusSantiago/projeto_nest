import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
// CORREÇÃO: Importar de 'components' ao invés de 'pages'
import TeachersListPage from './components/TeachersListPage'; 
import TeacherDetailPage from './components/TeacherDetailPage';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="teachers" element={<TeachersListPage />} />
        <Route path="teachers/:id" element={<TeacherDetailPage />} />
      </Route>
    </Routes>
  );
}

export default App;