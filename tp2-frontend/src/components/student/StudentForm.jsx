import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createStudent, checkEmailAvailability, checkDniAvailability } from '../../services/studentService';
import { VALIDATION_MESSAGES, MAX_LENGTHS } from '../../utils/constants';
import { patterns, validateField } from '../../utils/validators';
import '../../styles/student/student-form.css';

const StudentForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      firstname: '',
      lastname: '',
      dni: '',
      email: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
  
    const validateForm = async () => {
      const newErrors = {};
  
      // Validar nombre
      const firstnameErrors = validateField('firstname', formData.firstname, MAX_LENGTHS.firstname);
      if (firstnameErrors.length) newErrors.firstname = firstnameErrors[0];
  
      // Validar apellido
      const lastnameErrors = validateField('lastname', formData.lastname, MAX_LENGTHS.lastname);
      if (lastnameErrors.length) newErrors.lastname = lastnameErrors[0];
  
      // Validar DNI
      const dniErrors = validateField('dni', formData.dni, MAX_LENGTHS.dni, patterns.dni);
      if (dniErrors.length) {
        newErrors.dni = dniErrors[0];
      } else {
        try {
          const response = await checkDniAvailability(formData.dni);
          if (!response.available) {
            newErrors.dni = VALIDATION_MESSAGES.ALREADY_EXISTS.dni;
          }
        } catch (error) {
          newErrors.dni = VALIDATION_MESSAGES.CHECK_ERROR.dni;
        }
      }
  
      // Validar email
      const emailErrors = validateField('email', formData.email, MAX_LENGTHS.email, patterns.email);
      if (emailErrors.length) {
        newErrors.email = emailErrors[0];
      } else {
        try {
          const response = await checkEmailAvailability(formData.email);
          if (!response.available) {
            newErrors.email = VALIDATION_MESSAGES.ALREADY_EXISTS.email;
          }
        } catch (error) {
          newErrors.email = VALIDATION_MESSAGES.CHECK_ERROR.email;
        }
      }
  
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;

    };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error del campo cuando el usuario comienza a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const isValid = await validateForm();
      if (!isValid) {
        setLoading(false);
        return;
      }

      await createStudent(formData);
      alert('Alumno creado exitosamente');
      navigate('/students');
    } catch (error) {
      alert('Error al crear el alumno: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstname">Nombre:</label>
          <div className="input-container">
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              disabled={loading}
            />
            {errors.firstname && <span className="error-message">{errors.firstname}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="lastname">Apellido:</label>
          <div className="input-container">
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              disabled={loading}
            />
            {errors.lastname && <span className="error-message">{errors.lastname}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="dni">DNI:</label>
          <div className="input-container">
            <input
              type="text"
              id="dni"
              name="dni"
              value={formData.dni}
              onChange={handleChange}
              disabled={loading}
            />
            {errors.dni && <span className="error-message">{errors.dni}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <div className="input-container">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
        </div>

        <div className="button-container">
          <button 
            type="submit" 
            className="button add-button"
            disabled={loading}
          >
            {loading ? 'Guardando...' : 'Agregar'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;