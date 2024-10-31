import React from 'react';
import Sidebar from './Sidebar';
import '../../styles/common/layout.css';

const Layout = ({ children, title, showBackButton, onBack, showAddButton, onAdd }) => {
  return (
    <div className="layout">
      <Sidebar />
      <main className="main-content">
        <header className="header">
          <h2>{title}</h2>
          <div className="header-buttons">
            {showBackButton && (
              <button className="button back-button" onClick={onBack}>
                Volver
              </button>
            )}
            {showAddButton && (
              <button className="button add-button" onClick={onAdd}>
                Agregar
              </button>
            )}
          </div>
        </header>
        {children}
      </main>
    </div>
  );
};

export default Layout;