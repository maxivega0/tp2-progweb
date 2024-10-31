export const patterns = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    dni: /^[0-9]{1,8}$/
  };
  
  export const validateLength = (value, maxLength) => {
    return value.length <= maxLength;
  };
  
  export const validatePattern = (value, pattern) => {
    return pattern.test(value);
  };
  
  export const validateRequired = (value) => {
    return value.trim().length > 0;
  };
  
  export const validateField = (name, value, maxLength, pattern = null) => {
    const errors = [];
  
    // Validación requerido
    if (!validateRequired(value)) {
      errors.push(VALIDATION_MESSAGES.REQUIRED[name]);
      return errors;
    }
  
    // Validación longitud máxima
    if (maxLength && !validateLength(value, maxLength)) {
      errors.push(VALIDATION_MESSAGES.MAX_LENGTH[name]);
    }
  
    // Validación de patrón si existe
    if (pattern && !validatePattern(value, pattern)) {
      errors.push(VALIDATION_MESSAGES.INVALID_FORMAT[name]);
    }
  
    return errors;
  };