import React from 'react';
import '../../styles/student/student-search.css';

const StudentSearch = ({ value, onChange }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Buscar por apellido..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default StudentSearch;