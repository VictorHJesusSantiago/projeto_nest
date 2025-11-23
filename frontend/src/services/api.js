import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

// Interceptor para adicionar o token em todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- AUTH (Autenticação) ---
export const login = async (credentials) => {
  try {
    // Baseado nos logs do seu backend: POST /auth/login
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (userData) => {
  try {
    // Baseado nos logs do seu backend: POST /auth/register
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// --- TEACHERS (Professores) ---
export const getTeachers = async () => {
  try {
    const response = await api.get('/teachers');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTeacherById = async (id) => {
  try {
    const response = await api.get(`/teachers/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createTeacher = async (teacherData) => {
  try {
    const response = await api.post('/teachers', teacherData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateTeacher = async (id, teacherData) => {
  try {
    const response = await api.patch(`/teachers/${id}`, teacherData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteTeacher = async (id) => {
  try {
    const response = await api.delete(`/teachers/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// --- STUDENTS (Estudantes) ---
export const getStudents = async (params) => {
  try {
    const response = await api.get('/students', { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getStudentById = async (id) => {
  try {
    const response = await api.get(`/students/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createStudent = async (studentData) => {
  try {
    const response = await api.post('/students', studentData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateStudent = async (id, studentData) => {
  try {
    const response = await api.patch(`/students/${id}`, studentData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteStudent = async (id) => {
  try {
    const response = await api.delete(`/students/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// --- COURSES (Cursos) ---
export const getCourses = async (params) => {
  try {
    const response = await api.get('/courses', { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCourseById = async (id) => {
  try {
    const response = await api.get(`/courses/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createCourse = async (courseData) => {
  try {
    const response = await api.post('/courses', courseData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCourse = async (id, courseData) => {
  try {
    const response = await api.patch(`/courses/${id}`, courseData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCourse = async (id) => {
  try {
    const response = await api.delete(`/courses/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// --- GUESTS (Convidados) ---
export const getGuests = async () => {
  try {
    const response = await api.get('/guests');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createGuest = async (guestData) => {
  try {
    const response = await api.post('/guests', guestData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateGuest = async (id, guestData) => {
  try {
    const response = await api.patch(`/guests/${id}`, guestData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteGuest = async (id) => {
  try {
    const response = await api.delete(`/guests/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;