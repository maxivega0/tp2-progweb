import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/common/Layout';
import StudentList from '../components/student/StudentList';

const StudentPage = () => {
  const navigate = useNavigate();

  return (
    <Layout 
      title="Módulo Alumno"
      showAddButton
      onAdd={() => navigate('/students/new')}
    >
      <StudentList />
    </Layout>
  );
};

export default StudentPage;