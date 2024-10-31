import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentSearch from './StudentSearch';
import Table from '../common/Table';
import Pagination from '../common/Pagination';
import { getStudents } from '../../services/studentService';
import '../../styles/student/student-list.css';

const StudentList = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const columns = [
    { header: 'Legajo', accessor: 'sid' },
    { header: 'Nombre', accessor: 'firstname' },
    { header: 'Apellido', accessor: 'lastname' },
    {
      header: 'Acciones',
      accessor: 'actions',
      Cell: ({ row }) => (
        <button 
          className="button delete-button"
          onClick={() => handleDelete(row.id)}
        >
          Eliminar
        </button>
      )
    }
  ];

  useEffect(() => {
    fetchStudents();
  }, [currentPage, pageSize, searchTerm]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await getStudents(searchTerm, currentPage, pageSize);
      setStudents(response.students);
      setTotalRecords(response.totalRecords);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm('¿Está seguro de que desea eliminar este alumno?');
      
      if (confirmed) {
        setLoading(true);
        await deleteStudent(id);
        
        // Recargar la lista de estudiantes
        // Si estamos en la última página y eliminamos el único registro, 
        // retrocedemos una página
        if (students.length === 1 && currentPage > 1) {
          setCurrentPage(prev => prev - 1);
        } else {
          fetchStudents();
        }
        
        // Mostrar mensaje de éxito
        alert('Alumno eliminado exitosamente');
      }
    } catch (error) {
      console.error('Error al eliminar el alumno:', error);
      alert('Error al eliminar el alumno. Por favor, intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="student-list">
      <StudentSearch 
        value={searchTerm}
        onChange={setSearchTerm}
      />
      <Table 
        columns={columns}
        data={students}
        loading={loading}
      />
      <Pagination
        currentPage={currentPage}
        pageSize={pageSize}
        totalRecords={totalRecords}
        onPageChange={setCurrentPage}
        onPageSizeChange={setPageSize}
      />
    </div>
  );
};

export default StudentList;