### Endpoints de Estudiantes

#### 1. Obtener Todos los Estudiantes
- **URL**: `/api/students`
- **Método**: `GET`
- **Parámetros de Consulta**:
  - `search` (opcional): Término de búsqueda para nombre o apellido
  - `currentPage` (opcional): Número de página (predeterminado: 1)
  - `pageSize` (opcional): Elementos por página (predeterminado: 5)
- **Respuesta Exitosa**:
  ```json
  {
    "totalRecords": 100,
    "currentPage": 1,
    "pageSize": 5,
    "students": [
      {
        "id": 1,
        "sid": 1000,
        "firstname": "Juan",
        "lastname": "Pérez",
        "dni": "12345678",
        "email": "juan@ejemplo.com",
        "deleted": false,
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    ]
  }
  ```

#### 2. Obtener Estudiante por ID
- **URL**: `/api/students/:id`
- **Método**: `GET`
- **Parámetros URL**: `id` - ID del Estudiante
- **Respuesta Exitosa**:
  ```json
  {
    "id": 1,
    "sid": 1000,
    "firstname": "Juan",
    "lastname": "Pérez",
    "dni": "12345678",
    "email": "juan@ejemplo.com",
    "deleted": false,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
  ```

#### 3. Crear Estudiante
- **URL**: `/api/students`
- **Método**: `POST`
- **Cuerpo**:
  ```json
  {
    "firstname": "Juan",
    "lastname": "Pérez",
    "dni": "12345678",
    "email": "juan@ejemplo.com"
  }
  ```
- **Reglas de Validación**:
  - Todos los campos son obligatorios
  - Longitud máxima: 100 caracteres para nombre, apellido, email
  - DNI: solo números, máximo 8 dígitos
  - Email: debe tener formato válido
  - DNI y email deben ser únicos

#### 4. Eliminar Estudiante
- **URL**: `/api/students/:id`
- **Método**: `DELETE`
- **Parámetros URL**: `id` - ID del Estudiante
- **Respuesta Exitosa**:
  ```json
  {
    "message": "Estudiante eliminado exitosamente"
  }
  ```

#### 5. Verificar Disponibilidad de Email
- **URL**: `/api/students/check/email/:email`
- **Método**: `GET`
- **Parámetros URL**: `email` - Email a verificar
- **Respuesta Exitosa**:
  ```json
  {
    "available": true
  }
  ```

#### 6. Verificar Disponibilidad de DNI
- **URL**: `/api/students/check/dni/:dni`
- **Método**: `GET`
- **Parámetros URL**: `dni` - DNI a verificar
- **Respuesta Exitosa**:
  ```json
  {
    "available": true
  }
  ```

#### 7. Obtener Último ID de Estudiante
- **URL**: `/api/students/sid/last`
- **Método**: `GET`
- **Respuesta Exitosa**:
  ```json
  {
    "lastSid": 1000
  }
  ```

## Manejo de Errores

La API utiliza códigos de estado HTTP estándar y devuelve mensajes de error en el siguiente formato:

```json
{
  "message": "Descripción del error",
  "error": "Mensaje de error detallado"
}
```

Códigos de Estado Comunes:
- 200: Éxito
- 201: Creado
- 400: Solicitud Incorrecta
- 404: No Encontrado
- 500: Error Interno del Servidor
