import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/common/sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  
  return (
    <aside className="sidebar">
      <h3>Trabajo Practico 1</h3>
      <nav>
        <Link 
          to="/" 
          className={location.pathname === '/' ? 'active' : ''}
        >
          Página Principal
        </Link>
        <Link 
          to="/students" 
          className={location.pathname.includes('/students') ? 'active' : ''}
        >
          Alumnos
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;