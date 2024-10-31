// src/services/studentService.js
import { API_ROUTES } from '../utils/constants';

export const getStudents = async (search = '', currentPage = 1, pageSize = 5) => {
  try {
    const response = await fetch(
      `${API_ROUTES.STUDENTS}?search=${search}&currentPage=${currentPage}&pageSize=${pageSize}`
    );
    
    if (!response.ok) {
      throw new Error('Error fetching students');
    }
    
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createStudent = async (studentData) => {
  try {
    const response = await fetch(API_ROUTES.STUDENTS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(studentData),
    });
    
    if (!response.ok) {
      throw new Error('Error creating student');
    }
    
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteStudent = async (id) => {
  try {
    const response = await fetch(`${API_ROUTES.STUDENTS}/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Error deleting student');
    }
    
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const checkEmailAvailability = async (email) => {
  try {
    const response = await fetch(`${API_ROUTES.CHECK_EMAIL}/${email}`);
    
    if (!response.ok) {
      throw new Error('Error checking email');
    }
    
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const checkDniAvailability = async (dni) => {
  try {
    const response = await fetch(`${API_ROUTES.CHECK_DNI}/${dni}`);
    
    if (!response.ok) {
      throw new Error('Error checking DNI');
    }
    
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};