import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/common/Layout';
import Card from '../components/common/Card';
import '../styles/pages/home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Layout title="Página Principal">
      <div className="card-container">
        <Card 
          title="Módulo Alumnos" 
          onClick={() => navigate('/students')}
        />
      </div>
    </Layout>
  );
};

export default Home;