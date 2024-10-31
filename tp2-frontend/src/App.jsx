import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import StudentPage from './pages/StudentPage';
import AddStudentPage from './pages/AddStudentPage';
import './styles/index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/students" element={<StudentPage />} />
        <Route path="/students/new" element={<AddStudentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
