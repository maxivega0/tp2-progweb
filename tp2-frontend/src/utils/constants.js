export const API_ROUTES = {
    STUDENTS: '/api/students',
    CHECK_EMAIL: '/api/students/check/email',
    CHECK_DNI: '/api/students/check/dni'
  };
  
  export const PAGE_SIZES = [3, 5, 10];
  
  export const VALIDATION_MESSAGES = {
    REQUIRED: {
      firstname: 'El nombre es requerido',
      lastname: 'El apellido es requerido',
      dni: 'El DNI es requerido',
      email: 'El email es requerido'
    },
    MAX_LENGTH: {
      firstname: 'El nombre no puede superar los 100 caracteres',
      lastname: 'El apellido no puede superar los 100 caracteres',
      email: 'El email no puede superar los 100 caracteres'
    },
    INVALID_FORMAT: {
      dni: 'El DNI debe contener solo números y no más de 10 dígitos',
      email: 'El formato del email no es válido'
    },
    ALREADY_EXISTS: {
      dni: 'Este DNI ya está registrado',
      email: 'Este email ya está registrado'
    },
    CHECK_ERROR: {
      dni: 'Error al verificar el DNI',
      email: 'Error al verificar el email'
    }
  };
  
  export const MAX_LENGTHS = {
    firstname: 100,
    lastname: 100,
    dni: 8,
    email: 100
  };