import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TeachersListPage from './components/TeachersListPage';
import TeacherDetailPage from './components/TeacherDetailPage';
import TeacherForm from './components/TeacherForm';
import StudentsListPage from './components/StudentsListPage';
import StudentForm from './components/StudentForm';
import CoursesListPage from './components/CoursesListPage';
import CourseForm from './components/CourseForm';

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
        <Route path="teachers/new" element={<TeacherForm />} />
        <Route path="teachers/:id" element={<TeacherDetailPage />} />
        
        <Route path="students" element={<StudentsListPage />} />
        <Route path="students/new" element={<StudentForm />} />
        <Route path="students/:id" element={<StudentForm />} />
        
        <Route path="courses" element={<CoursesListPage />} />
        <Route path="courses/new" element={<CourseForm />} />
        <Route path="courses/:id" element={<CourseForm />} />
      </Route>
    </Routes>
  );
}

export default App;